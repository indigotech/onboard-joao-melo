import React from 'react';
import { WelcomeUser } from './pages/welcome-user/index';
import { SafeAreaView } from 'react-native';
import { ApolloProvider } from '@apollo/client';
import { client } from './graphql/client';

function App(): JSX.Element {
  return (
    <ApolloProvider client={client}>
      <SafeAreaView>
        <WelcomeUser />
      </SafeAreaView>
    </ApolloProvider>
  );
}

export default App;
