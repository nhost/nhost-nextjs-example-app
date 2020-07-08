import { InMemoryCache } from "apollo-cache-inmemory";
import ApolloClient from "apollo-client";
import { setContext } from "apollo-link-context";
import { WebSocketLink } from "apollo-link-ws";
import { createHttpLink } from "apollo-link-http";
import { from, split } from "apollo-link";
import { getMainDefinition } from "apollo-utilities";
import { auth } from "./nhost";
import { graphql_endpoint } from "./config";

export function createApolloClient(apollo_headers) {
  const uri = graphql_endpoint;

  const wsUri = uri.startsWith("https")
    ? uri.replace(/^https/, "wss")
    : uri.replace(/^http/, "ws");

  const wsLink = process.browser
    ? new WebSocketLink({
        uri: wsUri,
        options: {
          reconnect: true,
          connectionParams: () => {
            const authorization_header = auth.getJWTToken()
              ? {
                  authorization: `Bearer ${auth.getJWTToken()}`,
                }
              : null;

            return {
              headers: {
                ...apollo_headers,
                ...authorization_header,
              },
            };
          },
        },
      })
    : null;

  const httplink = createHttpLink({
    uri,
  });

  const authLink = setContext((a, { headers }) => {
    const authorization_header = auth.getJWTToken()
      ? {
          authorization: `Bearer ${auth.getJWTToken()}`,
        }
      : null;

    return {
      headers: {
        ...headers,
        ...apollo_headers,
        ...authorization_header,
      },
    };
  });

  const link = process.browser
    ? split(
        ({ query }) => {
          const { kind, operation } = getMainDefinition(query);
          return kind === "OperationDefinition" && operation === "subscription";
        },
        wsLink,
        authLink.concat(httplink)
      )
    : httplink;

  const client = new ApolloClient({
    link: from([link]),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: "cache-and-network",
      },
    },
  });

  return client;
}
