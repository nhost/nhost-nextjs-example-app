import { ApolloProvider } from "@apollo/react-hooks";
import AuthProvider from "../context/auth";
import { createApolloClient } from "lib/apollo-client";

const defaultClient = createApolloClient();

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ApolloProvider client={defaultClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    </AuthProvider>
  );
}
