
import { ApolloClient, ApolloLink, DefaultOptions, HttpLink, InMemoryCache } from "@apollo/client";

const httpLink = new HttpLink({ uri: 'http://localhost:8080/query' });

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
}

const authLink = new ApolloLink((operation, forward) => {
  /*
  // Retrieve the authorization token from local storage.
  const token = localStorage.getItem('auth_token');

  // Use the setContext method to set the HTTP headers.
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : ''
    }
  });

  operation.setContext({
    headers: {
      'Access-Control-Allow-Origin': "*"
    }
  });
  */

  // Call the next link in the middleware chain.
  return forward(operation);
});

const GRAPHQL_CLIENT = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  defaultOptions
})

export default GRAPHQL_CLIENT
