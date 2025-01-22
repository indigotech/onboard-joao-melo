import React, { useRef, useState } from 'react';
import { Container, FormBox, ButtonBox, BoxErrorMessage } from './style';
import { Form, FormRef } from '../../components/form/index';
import { AddButton, TextButton } from '../list-users/style';
import { ErrorMessage } from '../../components/error-message';
import { View, Text, ScrollView, SafeAreaView, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import {
  validateBirthDate,
  validateEmail,
  validateName,
  validatePassword,
  validatePhone,
} from '../../utils/validations';
import { useMutation } from '@apollo/client';
import { CREATE_USER_MUTATION } from '../../graphql/mutations/createUser';

import { UserCreation } from '../../graphql/types/types';
import { H1 } from '../../global-style/style';
import { PrimaryButton } from '../../components/primary-button';

enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export function AddUser({ navigation }) {
  const [role, setRole] = useState(UserRole.USER);
  const [loading, setLoading] = useState(false);
  const [createUser] = useMutation(CREATE_USER_MUTATION);
  const [errorMessage, setErrorMessage] = useState('');

  const nameRef = useRef<FormRef>(null);
  const phoneRef = useRef<FormRef>(null);
  const birthDateRef = useRef<FormRef>(null);
  const emailRef = useRef<FormRef>(null);
  const passwordRef = useRef<FormRef>(null);

  async function handleAddUser(params: UserCreation) {
    try {
      setLoading(true);

      const response = await createUser({
        variables: {
          data: params,
        },
      });

      if (!response.data?.createUser) {
        setErrorMessage('Não foi possível adicionar o usuário.');
        return;
      }

      navigation.navigate('UserList');
    } catch (error) {
      setErrorMessage((error as Error).message);
    } finally {
      setLoading(false);
    }
  }

  function validate() {
    const name = nameRef.current?.validateForms() ?? false;
    const phone = phoneRef.current?.validateForms() ?? false;
    const birthDate = birthDateRef.current?.validateForms() ?? false;
    const email = emailRef.current?.validateForms() ?? false;
    const password = passwordRef.current?.validateForms() ?? false;

    if (!name || !phone || !birthDate || !email || !password) {
      return;
    }

    const isoBirthDate = new Date(birthDate.split('/').reverse().join('-')).toISOString();

    const params: UserCreation = {
      name: name,
      phone: phone,
      birthDate: isoBirthDate,
      email: email,
      password: password,
      role: role,
    };

    setErrorMessage('');

    handleAddUser(params);
  }

  return (
    <Container>
      <ScrollView>
        <H1>Adicionar usuario</H1>
        <FormBox>
          <Form name="Nome" validateValue={validateName} ref={nameRef} />
          <Form name="Telefone" validateValue={validatePhone} ref={phoneRef} />
          <Form name="Data de Nascimento (dd/mm/yyyy)" validateValue={validateBirthDate} ref={birthDateRef} />
          <Form name="E-mail" validateValue={validateEmail} ref={emailRef} />
          <Form name="Senha" validateValue={validatePassword} ref={passwordRef} />
          <View>
            <Text>Escolha o Role</Text>
            <Picker selectedValue={role} onValueChange={itemValue => setRole(itemValue)}>
              <Picker.Item label="Admin" value={UserRole.ADMIN} />
              <Picker.Item label="User" value={UserRole.USER} />
            </Picker>
          </View>
          <BoxErrorMessage>{errorMessage && <ErrorMessage message={errorMessage} />}</BoxErrorMessage>
          <ButtonBox>
            <PrimaryButton text="Concluir" loading={loading} validate={validate} />
          </ButtonBox>
        </FormBox>
      </ScrollView>
    </Container>
  );
}
