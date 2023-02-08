import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router';
import { Button } from '../components/Button';
import { List } from '../components/Pagination.tsx/List';
import { UsersQueryResult, USERS_QUERY } from '../graphql/queries';

const USERS_QUERY_LIMIT = 10;

export function MainPage() {
  const navigate = useNavigate();

  const [offset, setOffset] = useState(0);

  function onError() {
    navigate('/');
  }

  const variables = { data: { offset, limit: USERS_QUERY_LIMIT } };
  const { data } = useQuery<UsersQueryResult>(USERS_QUERY, { variables, onError });

  if (data) {
    return (
      <>
        <List
          itemsList={data.users.nodes.map((user) => `Name: ${user.name} ---- Email: ${user.email}`)}
          hasNextPage={data.users.pageInfo.hasNextPage}
          hasPreviousPage={data.users.pageInfo.hasPreviousPage}
          onClickNextPage={() => setOffset(offset + USERS_QUERY_LIMIT)}
          onClickPreviousPage={() => setOffset(offset - USERS_QUERY_LIMIT)}
        />
        <div>
          <Button text='Add User' type='button' onClick={() => navigate('/addUser')} />
        </div>
      </>
    );
  }

  return <p>Carregando</p>;
}
