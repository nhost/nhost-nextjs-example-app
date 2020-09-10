import { NhostAuthProvider, NhostApolloProvider } from "react-nhost";
import { auth } from "lib/nhost";
import { graphql_endpoint } from "lib/config";

export default function App({ Component, pageProps }) {
  return (
    <NhostAuthProvider auth={auth}>
      <NhostApolloProvider auth={auth} gqlEndpoint={graphql_endpoint}>
        <Component {...pageProps} />
      </NhostApolloProvider>
    </NhostAuthProvider>
  );
}
