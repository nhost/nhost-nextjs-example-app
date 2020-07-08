import { GraphQLClient } from "graphql-request";
import { graphql_endpoint } from "./config";

const graphQLClient = new GraphQLClient(graphql_endpoint, {
  headers: {
    "x-hasura-role": "public",
  },
});

export { graphQLClient };
