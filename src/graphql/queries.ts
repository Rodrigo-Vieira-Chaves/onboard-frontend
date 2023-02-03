import { gql } from '@apollo/client';

interface User {
  id: string;
  name: string;
  email: string;
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

export const USERS_QUERY = gql`
  query Users($data: PageInput) {
    users(data: $data) {
      nodes {
        name
        email
        id
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
