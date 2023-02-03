import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { Input } from '../components/Input';
import { Title } from '../components/Title';
import { useMutation } from '@apollo/client';
import { SubmitButton } from '../components/SubmitButton';
import { LOGIN_MUTATION } from '../graphql/mutations';

export function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [loginMutation, { data, loading, error }] = useMutation(LOGIN_MUTATION);

  useEffect(() => {
    if (data) {
      localStorage.setItem('token', data.login.token);
      navigate('/main');
    }
  }, [data]);

  useEffect(() => error && alert(error), [error]);

  function onChangeEmail(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
    setEmailError('');
  }

  function onChangePassword(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
    setPasswordError('');
  }

  function validateForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const emailTest = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email);
    const passwordTest = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g.test(password);

    if (!emailTest) {
      setEmailError('Email invalid');
    }

    if (!passwordTest) {
      setPasswordError('Password invalid');
    }

    return emailTest && passwordTest;
  }

  return (
    <form
      action='#'
      method='post'
      onSubmit={(e) => validateForm(e) && loginMutation({ variables: { data: { email, password } } })}
    >
      <Title titleText='Bem-vindo(a) à Taqtile!' />
      <Input
        id='emailInput'
        labelText='E-mail'
        inputType='email'
        required={true}
        onChange={onChangeEmail}
        error={emailError}
      />
      <Input
        id='passwordInput'
        labelText='Senha'
        inputType='password'
        required={true}
        onChange={onChangePassword}
        error={passwordError}
      />
      <SubmitButton text='Entrar' loading={loading} />
    </form>
  );
}
