import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { Form } from '../../components/form/index.tsx';
import { InfoBox, LogginButton, LoginText, WelcomeTittle } from './style.tsx';

export function WelcomeUser(): JSX.Element {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [valid, setValid] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  function validateEmail(): boolean {
    if (email.trim() === '') {
      setErrorMessage('O campo de e-mail não pode ser vazio');
      return false;
    }

    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(email)) {
      setErrorMessage('E-mail inválido');
      return false;
    }

    return true;
  }

  function validatePassword(): boolean {
    if (!password) {
      return false;
    }
    const passwordRegex: RegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{7,}$/;

    if (!passwordRegex.test(password)) {
      setErrorMessage('A senha deve ter 7 caracteres, pelo menos uma letra e um número');
      return false;
    }

    return true;
  }

  function validate(): void {
    setValid(false);
    setErrorMessage('');
    setValid(validateEmail());
    setValid(validatePassword());
  }

  return (
    <SafeAreaView>
      <StatusBar />
      <WelcomeTittle> Bem-vindo(a) à Taqtile! </WelcomeTittle>
      <InfoBox>
        <Form name="E-mail" info="" />
        <Form name="Senha" info="" />
      </InfoBox>
      <LogginButton onPress={validate}>
        <LoginText>Entrar</LoginText>
      </LogginButton>

      {!valid && <Text> {errorMessage} </Text>}
    </SafeAreaView>
  );
}
