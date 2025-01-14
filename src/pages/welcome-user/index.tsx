import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { Form } from '../../components/form/index.tsx';
import { InfoBox, LogginButton, LoginText, WelcomeTittle } from './style.tsx';

export function WelcomeUser(): JSX.Element {
  return (
    <SafeAreaView>
      <StatusBar />
      <WelcomeTittle> Bem-vindo(a) à Taqtile! </WelcomeTittle>
      <InfoBox>
        <Form name="E-mail" info="" />
        <Form name="Senha" info="" />
      </InfoBox>
      <LogginButton>
        <LoginText>Entrar</LoginText>
      </LogginButton>
    </SafeAreaView>
  );
}
