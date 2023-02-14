import { gql } from '@apollo/client';

interface User {
  id: string;
  name: string;
  email: string;
  birthDate: string;
  phone: string;
  role: string;
}

export interface UsersQueryResult {
  users: {
    count: number;
    nodes: User[];
    pageInfo: {
      limit: number;
      offset: number;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
    };
  };
}

export interface FindUserByIdResult {
  user: User;
}

export const USERS_QUERY = gql`
  query Users($data: PageInput) {
    users(data: $data) {
      nodes {
        id
        name
        email
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        limit
        offset
      }
      count
    }
  }
`;

export const FIND_USER_BY_ID = gql`
  query User($userId: ID) {
    user(id: $userId) {
      id
      email
      birthDate
      name
      phone
      role
    }
  }
`;
