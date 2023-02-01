import React from 'react';
import ReactDOM from 'react-dom/client';
import { Button } from './components/Button';
import { Input } from './components/Input';
import { Title } from './components/Title';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Title titleText='Bem-vindo(a) à Taqtile!' />
    <Input labelText='E-mail' inputType='email' />
    <Input labelText='Senha' inputType='password' />
    <Button buttonText='Entrar' />
  </React.StrictMode>,
);
