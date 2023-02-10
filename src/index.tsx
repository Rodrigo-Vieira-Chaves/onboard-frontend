import { App } from './App';
import ReactDOM from 'react-dom/client';
import { setContext } from '@apollo/client/link/context';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { BrowserRouter, createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { AddUser } from './pages/add-user';
import { LoginPage } from './pages/login-page';
import { MainPage } from './pages/main-page';
import { UserDetails } from './pages/user-details';

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

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<LoginPage />} />
      <Route path='/main' element={<MainPage />} />
      <Route path='/addUser' element={<AddUser />} />
      <Route path='/userDetails' element={<UserDetails />} />
    </>,
  ),
);

root.render(
  <ApolloProvider client={client}>
    <RouterProvider router={router} />
  </ApolloProvider>,
);
