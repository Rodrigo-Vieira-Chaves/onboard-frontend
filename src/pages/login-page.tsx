import { useNavigate } from 'react-router';
import { Title } from '../components/Title';
import { useMutation } from '@apollo/client';
import { Button } from '../components/Button';
import { Form, InputsData } from '../components/Form';
import { Input, InputType } from '../components/Input';
import { LoginMutationResult, LOGIN_MUTATION } from '../graphql/mutations';

export function LoginPage() {
  const navigate = useNavigate();

  function onCompleted(data: LoginMutationResult) {
    localStorage.setItem('token', data.login.token);
    navigate('/main');
  }

  function onError(error: any) {
    alert(error);
  }

  const [loginMutation, { loading }] = useMutation(LOGIN_MUTATION, { onCompleted, onError });

  function onSubmit(inputsData: InputsData) {
    const variables = { data: { email: inputsData['emailInput'], password: inputsData['passwordInput'] } };
    loginMutation({ variables });
  }

  return (
    <Form onSubmit={onSubmit}>
      <Title titleText='Bem-vindo(a) à Taqtile!' />
      <Input id='emailInput' labelText='E-mail' inputType={InputType.EMAIL} errorMessage='Invalid Email' />
      <Input id='passwordInput' labelText='Senha' inputType={InputType.PASSWORD} errorMessage='Invalid Password' />
      <Button text={loading ? 'Carregando' : 'Entrar'} type='submit' />
    </Form>
  );
}
