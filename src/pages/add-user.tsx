import { Title } from '../components/Title';
import { useMutation } from '@apollo/client';
import { Button } from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { Form, InputsData } from '../components/Form';
import { Input, InputType } from '../components/Input';
import { CREATE_USER_MUTATION } from '../graphql/mutations';
import { DropMenu } from '../components/DropMenu';

export function AddUser() {
  const navigate = useNavigate();

  function onCompleted() {
    navigate('/main');
  }

  function onError(error: any) {
    alert(error);
  }

  const [createUserMutation] = useMutation(CREATE_USER_MUTATION, { onCompleted, onError });

  function onSubmit(inputsData: InputsData) {
    createUserMutation({
      variables: {
        data: {
          birthDate: inputsData['birthDateInput'],
          email: inputsData['emailInput'],
          password: inputsData['passwordInput'],
          phone: inputsData['phoneInput'],
          name: inputsData['nameInput'],
          role: inputsData['rolesInput'],
        },
      },
    });
  }

  return (
    <Form onSubmit={onSubmit}>
      <Title titleText='Preencha os dados do novo usuário' />
      <Input id='emailInput' labelText='E-mail' inputType={InputType.EMAIL} errorMessage='Invalid Email' />
      <Input id='passwordInput' labelText='Senha' inputType={InputType.PASSWORD} errorMessage='Invalid Password' />
      <Input id='phoneInput' labelText='Telefone' inputType={InputType.PHONE} errorMessage='Invalid Phone Number' />
      <Input
        id='birthDateInput'
        labelText='Data de Nascimento'
        inputType={InputType.BIRTHDATE}
        errorMessage='Invalid BirthDate'
      />
      <Input id='nameInput' labelText='Nome' inputType={InputType.TEXT} errorMessage='Invalid Name' />
      <DropMenu
        id='rolesInput'
        labelText='Roles'
        options={[
          { value: 'user', option: 'user' },
          { value: 'admin', option: 'admin' },
        ]}
        errorMessage='Invalid Role'
      ></DropMenu>
      <Button text='Add User' type='submit' />
    </Form>
  );
}
