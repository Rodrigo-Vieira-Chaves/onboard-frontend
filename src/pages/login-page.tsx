import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Title } from '../components/Title';
import { useMutation } from '@apollo/client';
import { Button } from '../components/Button';
import { LOGIN_MUTATION } from '../graphql/mutations';
import { Form, States } from '../components/Form';
import { Input, InputType } from '../components/Input';

export function LoginPage() {
  const navigate = useNavigate();
  const [inputStates, setInputStates] = useState<States>({});

  const [loginMutation, { data, loading, error }] = useMutation(LOGIN_MUTATION);

  useEffect(() => {
    if (data) {
      localStorage.setItem('token', data.login.token);
      navigate('/main');
    }
  }, [data]);

  useEffect(() => error && alert(error), [error]);

  function onSubmit() {
    loginMutation({
      variables: { data: { email: inputStates['emailInput'], password: inputStates['passwordInput'] } },
    });
  }

  return (
    <Form
      action='#'
      method='post'
      onSubmit={onSubmit}
      shouldValidateForms={true}
      inputStates={[inputStates, setInputStates]}
    >
      <Title titleText='Bem-vindo(a) à Taqtile!' />
      <Input id='emailInput' labelText='E-mail' inputType={InputType.EMAIL} errorMessage='Invalid Email' />
      <Input id='passwordInput' labelText='Senha' inputType={InputType.PASSWORD} errorMessage='Invalid Password' />
      <Button text={loading ? 'Carregando' : 'Entrar'} type='submit' />
    </Form>
  );
}
