import { gql } from '@apollo/client';

export const CREATE_USER_MUTATION = gql`
  mutation CreateUser($data: UserInput!) {
    createUser(data: $data) {
      id
      name
      email
      phone
      birthDate
      role
    }
  }
`;
