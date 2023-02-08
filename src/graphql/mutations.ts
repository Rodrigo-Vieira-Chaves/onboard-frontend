import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation Mutation($data: LoginInput!) {
    login(data: $data) {
      token
    }
  }
`;

export const CREATE_USER_MUTATION = gql`
  mutation Mutation($data: UserInput!) {
    createUser(data: $data) {
      id
      role
      name
      email
      phone
      birthDate
    }
  }
`;
