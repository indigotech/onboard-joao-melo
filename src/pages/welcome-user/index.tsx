import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { Form } from '../../components/form/index';
import { InfoBox, LogginButton, LoginText, WelcomeTittle } from './style';
import { ErrorMessage } from '../../components/error-message/index';

export function WelcomeUser(): JSX.Element {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [valid, setValid] = React.useState(true);
  const [errorMessage, setErrorMessage] = React.useState('');

  function validEmail(): boolean {
    if (email.trim().length === 0) {
      setErrorMessage('O campo de e-mail não pode ser vazio');
      return false;
    }

    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setErrorMessage('E-mail inválido');
      return false;
    }

    return true;
  }

  function validPassword(): boolean {
    const passwordRegex: RegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{7,}$/;

    if (!passwordRegex.test(password)) {
      setErrorMessage('A senha deve ter 7 caracteres, pelo menos uma letra e um número');
      return false;
    }

    return true;
  }

  function validate(): void {
    const isPasswordValid = validPassword();
    const isEmailValid = validEmail();

    if (isEmailValid && isPasswordValid) {
      setValid(true);
      setErrorMessage('');
      return;
    }

    setValid(false);
  }

  return (
    <SafeAreaView>
      <StatusBar />
      <WelcomeTittle> Bem-vindo(a) à Taqtile! </WelcomeTittle>
      <InfoBox>
        <Form name="E-mail" info="" setValue={setEmail} />
        <Form name="Senha" info="" setValue={setPassword} />
      </InfoBox>
      <LogginButton onPress={validate}>
        <LoginText>Entrar</LoginText>
      </LogginButton>

      {!valid && <ErrorMessage message={errorMessage} />}
    </SafeAreaView>
  );
}
