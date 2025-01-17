import { gql } from '@apollo/client';

export const GET_USERS_QUERY = gql`
  query GetUsers($offset: Int, $limit: Int) {
    users(data: { offset: $offset, limit: $limit }) {
      nodes {
        id
        name
        phone
        birthDate
        email
        role
      }
      count
      pageInfo {
        offset
        limit
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;
