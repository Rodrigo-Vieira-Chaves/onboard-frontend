import { useQuery } from '@apollo/client';
import { useLocation } from 'react-router';
import { Title } from '../components/Title';
import { FindUserByIdResult, FIND_USER_BY_ID } from '../graphql/queries';

export function UserDetails() {
  const location = useLocation();

  function onError(error: any) {
    alert(error);
  }

  const variables = { userId: location.state };
  const { data } = useQuery<FindUserByIdResult>(FIND_USER_BY_ID, { variables, onError });

  if (data) {
    return (
      <>
        <Title titleText='Detalhes de Usuário' />
        <p>Email: {data.user.email}</p>
        <p>Nome: {data.user.name}</p>
        <p>Telefone: {data.user.phone}</p>
        <p>Data de Nascimento: {data.user.birthDate}</p>
        <p>Role: {data.user.role}</p>
      </>
    );
  }

  return <p>Carregando</p>;
}
