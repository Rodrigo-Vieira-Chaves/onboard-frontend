import { Form } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useLocation } from 'react-router';
import { Title } from '../components/Title';
import { Input, InputType } from '../components/Input';
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
      <Form>
        <Title titleText='Detalhes de Usuário' />
        <Input
          id='emailInput'
          labelText='E-mail'
          inputType={InputType.EMAIL}
          errorMessage='Invalid Email'
          value={data.user.email}
          readonly={true}
        />
        <Input
          id='nameInput'
          labelText='Nome'
          inputType={InputType.TEXT}
          errorMessage='Invalid Name'
          value={data.user.name}
          readonly={true}
        />
        <Input
          id='phoneInput'
          labelText='Telefone'
          inputType={InputType.PHONE}
          errorMessage='Invalid Phone Number'
          value={data.user.phone}
          readonly={true}
        />
        <Input
          id='birthDateInput'
          labelText='Data de Nascimento'
          inputType={InputType.BIRTHDATE}
          errorMessage='Invalid BirthDate'
          value={data.user.birthDate}
          readonly={true}
        />
        <Input
          id='roleInput'
          labelText='Role'
          inputType={InputType.TEXT}
          errorMessage='Invalid Role'
          value={data.user.role}
          readonly={true}
        />
      </Form>
    );
  }

  return <p>Carregando</p>;
}
