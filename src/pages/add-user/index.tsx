import React, { useState } from 'react';
import { Container, InfoBox, ButtonBox, BoxErrorMessage } from './style';
import { Form } from '../../components/form/index';
import { AddButton, TextButton } from '../list-users/style';
import { ErrorMessage } from '../../components/error-message';
import { View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { validateBirthDate, validateEmail, validateName, validatePhone, validateRole } from '../../utils/validations';
import { useMutation } from '@apollo/client';
import { CREATE_USER_MUTATION } from '../../graphql/mutations/createUser';

enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export function AddUser({ navigation }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(UserRole.USER);
  const [loading, setLoading] = useState(false);
  const [createUser, { error, data }] = useMutation(CREATE_USER_MUTATION);
  const [errorMessage, setErrorMessage] = useState('');

  async function handleAddUser() {
    const isoBirthDate = new Date(birthDate.split('/').reverse().join('-')).toISOString();

    try {
      setLoading(true);

      const response = await createUser({
        variables: {
          data: {
            name: name,
            phone: phone,
            birthDate: isoBirthDate,
            email: email,
            password: password,
            role: role,
          },
        },
      });

      if (response.data?.createUser) {
        navigation.navigate('UserList');
      }
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  function validate() {
    const errorMessageRole = validateRole(role);
    const errorMessageEmail = validateEmail(email);
    const errorMessageBirthDate = validateBirthDate(birthDate);
    const errorMessagePhone = validatePhone(phone);
    const errorMessageName = validateName(name);

    if (errorMessageName) {
      setErrorMessage(errorMessageName);
      return;
    } else if (errorMessagePhone) {
      setErrorMessage(errorMessagePhone);
      return;
    } else if (errorMessageBirthDate) {
      setErrorMessage(errorMessageBirthDate);
      return;
    } else if (errorMessageEmail) {
      setErrorMessage(errorMessageEmail);
      return;
    } else if (errorMessageRole) {
      setErrorMessage(errorMessageRole);
      return;
    }

    setErrorMessage('');

    handleAddUser();

    return;
  }

  return (
    <Container>
      <InfoBox>
        <Form name="Nome" info={name} setValue={setName} />
        <Form name="Telefone" info={phone} setValue={setPhone} />
        <Form name="Data de Nascimento (dd/mm/yyyy)" info={birthDate} setValue={setBirthDate} />
        <Form name="E-mail" info={email} setValue={setEmail} />
        <Form name="Senha" info={password} setValue={setPassword} />
        <View>
          <Text>Escolha o Role</Text>
          <Picker selectedValue={role} onValueChange={itemValue => setRole(itemValue)}>
            <Picker.Item label="Admin" value={UserRole.ADMIN} />
            <Picker.Item label="User" value={UserRole.USER} />
          </Picker>
        </View>
      </InfoBox>
      <BoxErrorMessage>{errorMessage && <ErrorMessage message={errorMessage} />}</BoxErrorMessage>
      <ButtonBox>
        <AddButton onPress={validate}>
          <TextButton> Adicionar </TextButton>
        </AddButton>
      </ButtonBox>
    </Container>
  );
}
