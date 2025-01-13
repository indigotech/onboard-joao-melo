import React from 'react';
import { SafeAreaView, StatusBar, Text, View } from 'react-native';
import UserForm from '../../components/UserForm/index.tsx';
import { InfoBox, LogginButton, LoginText, WelcomeTittle } from './style.tsx';

function WelcomeUser(): JSX.Element {
  return (
    <SafeAreaView>
      <StatusBar />
      <WelcomeTittle> Bem-vindo(a) à Taqtile! </WelcomeTittle>
      <InfoBox>
        <UserForm name="E-mail" info="" />
        <UserForm name="Senha" info="" />
      </InfoBox>
      <LogginButton>
        <LoginText>Entrar</LoginText>
      </LogginButton>
    </SafeAreaView>
  );
}

export default WelcomeUser;
