import { useMutation } from '@apollo/client';
import { Button } from './components/Button';
import { Input } from './components/Input';
import { Title } from './components/Title';
import { LOGIN_MUTATION } from './graphql/mutations';

function validateForm(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();

  const emailInputValue: string = (e.currentTarget.elements as any).emailInput.value;
  const passwordInputValue: string = (e.currentTarget.elements as any).passwordInput.value;

  const emailTest = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(emailInputValue);
  const passwordTest = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g.test(passwordInputValue);

  if (!emailTest) {
    alert('email invalid');
  }

  if (!passwordTest) {
    alert('password invalid');
  }

  return emailTest && passwordTest;
}

export function App() {
  const [loginMutation] = useMutation(LOGIN_MUTATION);

  return (
    <form
      action='#'
      method='post'
      onSubmit={async (e) => {
        if (validateForm(e)) {
          const email: string = (e.currentTarget.elements as any).emailInput.value;
          const password: string = (e.currentTarget.elements as any).passwordInput.value;
          let result;

          try {
            result = await loginMutation({ variables: { data: { email, password } } });
            localStorage.setItem('token', result.data.login.token);
          } catch (error) {
            alert(error);
          }
        }
      }}
    >
      <Title titleText='Bem-vindo(a) à Taqtile!' />
      <Input id='emailInput' labelText='E-mail' inputType='email' required={true} />
      <Input id='passwordInput' labelText='Senha' inputType='password' required={true} />
      <Button buttonText='Entrar' />
    </form>
  );
}
