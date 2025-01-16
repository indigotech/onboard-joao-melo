import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
    uri: 'https://template-onboarding-node-sjz6wnaoia-uc.a.run.app/graphql',
    cache: new InMemoryCache(),
  });