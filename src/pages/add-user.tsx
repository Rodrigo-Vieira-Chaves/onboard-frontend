import { useEffect, useState } from 'react';
import { Title } from '../components/Title';
import { useMutation } from '@apollo/client';
import { Button } from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { DropMenu } from '../components/DropMenu';
import { Form, States } from '../components/Form';
import { Input, InputType } from '../components/Input';
import { CREATE_USER_MUTATION } from '../graphql/mutations';

export function AddUser() {
  const navigate = useNavigate();
  const [inputStates, setInputStates] = useState<States>({});

  const [createUserMutation, { data, error }] = useMutation(CREATE_USER_MUTATION);

  useEffect(() => {
    if (data) {
      navigate('/main');
    }
  }, [data]);

  useEffect(() => error && alert(error), [error]);

  function onSubmit() {
    createUserMutation({
      variables: {
        data: {
          birthDate: inputStates['birthDateInput'],
          email: inputStates['emailInput'],
          password: inputStates['passwordInput'],
          phone: inputStates['phoneInput'],
          name: inputStates['nameInput'],
          role: inputStates['rolesInput'],
        },
      },
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
        inputStates={[inputStates, setInputStates]}
      ></DropMenu>
      <Button text='Add User' type='submit' />
    </Form>
  );
}
