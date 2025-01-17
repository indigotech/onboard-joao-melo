import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { client } from './graphql/client';
import { Routes } from './navigation/routes';

function App(): JSX.Element {
  return (
    <ApolloProvider client={client}>
      <Routes />
    </ApolloProvider>
  );
}

export default App;
