import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router';
import { Page } from '../components/Pagination.tsx/Page';
import { UsersQueryResult, USERS_QUERY } from '../graphql/queries';

const USERS_QUERY_LIMIT = 10;

export function MainPage() {
  const navigate = useNavigate();

  const [offset, setOffset] = useState(0);

  const { data, loading, error } = useQuery<UsersQueryResult>(USERS_QUERY, {
    variables: {
      data: {
        offset,
        limit: USERS_QUERY_LIMIT,
      },
    },
  });

  if (error) {
    navigate('/');
  }

  if (loading) {
    return <p>Carregando</p>;
  }

  if (data) {
    return (
      <Page
        itemsList={data.users.nodes.map((user) => `Name: ${user.name} ---- Email: ${user.email}`)}
        hasNextPage={data.users.pageInfo.hasNextPage}
        hasPreviousPage={data.users.pageInfo.hasPreviousPage}
        onClickNextPage={() => setOffset(offset + USERS_QUERY_LIMIT)}
        onClickPreviousPage={() => setOffset(offset - USERS_QUERY_LIMIT)}
      />
    );
  }

  return <></>;
}
