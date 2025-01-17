import React, { useEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView, StatusBar } from 'react-native';
import { Form } from '../../components/form/index';
import { ActivityIndicatorButton, InfoBox, LogginButton, LoginText, WelcomeTittle } from './style';
import { ErrorMessage } from '../../components/error-message/index';
import { useMutation } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginData, LoginVars } from '../../graphql/types/types';
import { LOGIN_MUTATION } from '../../graphql/mutations/authenticateUser';

export function WelcomeUser({ navigation }): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [valid, setValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [login, { data }] = useMutation<LoginData, LoginVars>(LOGIN_MUTATION);

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
      handleLogin();
      return;
    }

    setValid(false);
  }

  async function handleLogin(): Promise<void> {
    if (loading) return;

    try {
      setLoading(true);
      const response = await login({ variables: { email: email, password: password } });

      if (!response?.data?.login?.token) {
        setErrorMessage('Usuário ou senha inválidos');
        setValid(false);
        setLoading(false);
        return;
      }
      navigation.navigate('UserList');
      setLoading(false);
      await AsyncStorage.setItem('token', response.data.login.token);
    } catch (error) {
      setErrorMessage(error.message);
      setValid(false);
      setLoading(false);
    }
  }

  return (
    <SafeAreaView>
      <StatusBar />
      <WelcomeTittle> Bem-vindo(a) à Taqtile! </WelcomeTittle>
      <InfoBox>
        <Form name="E-mail" info={email} setValue={setEmail} />
        <Form name="Senha" info={password} setValue={setPassword} />
      </InfoBox>
      <LogginButton onPress={validate} disabled={loading}>
        {loading ? <ActivityIndicatorButton /> : <LoginText>Entrar</LoginText>}
      </LogginButton>

      {!valid && <ErrorMessage message={errorMessage} />}
    </SafeAreaView>
  );
}
