import { App } from './App';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { setContext } from '@apollo/client/link/context';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';

const httpLink = createHttpLink({
  uri: 'https://template-onboarding-node-sjz6wnaoia-uc.a.run.app/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');

  return {
    headers: {
      ...headers,
      authorization: token ?? '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>,
);
