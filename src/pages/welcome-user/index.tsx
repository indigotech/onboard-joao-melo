import React, { useRef, useState } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { Form, FormRef } from '../../components/form/index';
import { InfoBox } from './style';
import { ErrorMessage } from '../../components/error-message/index';
import { useMutation } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginData, LoginVars } from '../../graphql/types/types';
import { LOGIN_MUTATION } from '../../graphql/mutations/authenticateUser';
import { validateEmail, validatePassword } from '../../utils/validations';
import { PrimaryButton } from '../../components/primary-button';
import { H1 } from '../../global-style/style';

export function WelcomeUser({ navigation }): JSX.Element {
  const [valid, setValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [login] = useMutation<LoginData, LoginVars>(LOGIN_MUTATION);

  const emailRef = useRef<FormRef>(null);
  const passwordRef = useRef<FormRef>(null);

  function validate(): void {
    const email = emailRef.current?.validateForms() ?? false;
    const password = passwordRef.current?.validateForms() ?? false;

    if (!email || !password) {
      return;
    }

    handleLogin(email, password);
  }

  async function handleLogin(email: string, password: string): Promise<void> {
    if (loading) {
      return;
    }

    try {
      setLoading(true);
      const response = await login({
        variables: {
          data: {
            email: email,
            password: password,
          },
        },
      });

      if (!response?.data?.login?.token) {
        setErrorMessage('Não foi possível realizar o login');
        setValid(false);
        setLoading(false);
        return;
      }

      navigation.navigate('UserList');
      await AsyncStorage.setItem('token', response.data.login.token);
    } catch (error) {
      setErrorMessage((error as Error).message);
      setValid(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView>
      <StatusBar />
      <H1> Bem-vindo(a) à Taqtile! </H1>
      <InfoBox>
        <Form ref={emailRef} name="E-mail" onValidateValue={validateEmail} />
        <Form ref={passwordRef} name="Senha" onValidateValue={validatePassword} />
      </InfoBox>

      <PrimaryButton text="Entrar" loading={loading} onClick={validate} />

      {!valid && <ErrorMessage message={errorMessage} />}
    </SafeAreaView>
  );
}
