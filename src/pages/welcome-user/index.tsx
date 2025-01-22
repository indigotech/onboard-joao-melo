import React, { useState } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { Form } from '../../components/form/index';
import { ActivityIndicatorButton, InfoBox, LogginButton, LoginText, WelcomeTittle } from './style';
import { ErrorMessage } from '../../components/error-message/index';
import { useMutation } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginData, LoginVars } from '../../graphql/types/types';
import { LOGIN_MUTATION } from '../../graphql/mutations/authenticateUser';
import { validateEmail, validatePassword } from '../../utils/validations';

export function WelcomeUser({ navigation }): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [valid, setValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [login] = useMutation<LoginData, LoginVars>(LOGIN_MUTATION);

  function validate(): void {
    const errorMessagePassword = validatePassword(password);
    const errorMessageEmail = validateEmail(email);

    if (errorMessageEmail) {
      setValid(false);
      setErrorMessage(errorMessageEmail);
      return;
    } else if (errorMessagePassword) {
      setValid(false);
      setErrorMessage(errorMessagePassword);
      return;
    }

    setValid(true);
    setErrorMessage('');
    handleLogin();
    return;
  }

  async function handleLogin(): Promise<void> {
    if (loading) return;

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
