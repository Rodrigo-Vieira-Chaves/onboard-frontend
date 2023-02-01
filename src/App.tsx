import { Button } from './components/Button';
import { Input } from './components/Input';
import { Title } from './components/Title';

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
  return (
    <form action='#' method='post' onSubmit={validateForm}>
      <Title titleText='Bem-vindo(a) à Taqtile!' />
      <Input id='emailInput' labelText='E-mail' inputType='email' required={true} />
      <Input id='passwordInput' labelText='Senha' inputType='password' required={true} />
      <Button buttonText='Entrar' />
    </form>
  );
}
