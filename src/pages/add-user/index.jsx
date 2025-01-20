import React, { useState } from 'react';
import { Container, InfoBox, ButtonBox, BoxErrorMessage } from './style';
import { Form } from '../../components/form/index';
import { AddButton, TextButton } from '../list-users/style';
import { ErrorMessage } from '../../components/error-message';
import { View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const UserRole = {
  ADMIN: 'admin',
  USER: 'user'
};

export function AddUser({ navigation }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState(UserRole.USER);

  const [errorMessage, setErrorMessage] = useState('');

  function validateName () {
    if (name.trim().split(' ').length < 2) {
      setErrorMessage('O nome deve ser completo: pelo menos 2 palavras.');
      return false;
    }
    return true;
  };

  const validatePhone = () => {
    const regex = /^\d{10,11}$/;
    if (!regex.test(phone)) {
      setErrorMessage('O telefone deve ter de 10 a 11 dígitos.');
      return false;
    }
    return true;
  };

  const validateBirthDate = () => {
    const today = new Date();

    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

    if (!dateRegex.test(birthDate)) {
      setErrorMessage('Data de nascimento inválida.');
      return false;
    }

    const [dia, mes, ano] = birthDate.split('/').map(Number);
    const date = new Date(ano, mes - 1, dia);
  
    if (isNaN(date.getTime())) {
      setErrorMessage('Data de nascimento inválida.2');
      return false;
    }
    if (date > today) {
      setErrorMessage('A data de nascimento não pode ser no futuro.');
      return false;
    }
    return true;
  };

  const validateEmail = () => {
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setErrorMessage('E-mail inválido');
      return false;
    }

    return true;
  }

  const validateRole = () => {
    if (![UserRole.ADMIN, UserRole.USER].includes(role)) {
      setErrorMessage('Permissão inválida');
      return false;
    }
    return true;
  };

  function validate() {
    const isValidRole = validateRole();
    const isValidEmail = validateEmail();
    const isValidBirthDate = validateBirthDate();
    const isValidPhone = validatePhone();
    const isValidName = validateName();

    if (isValidRole && isValidEmail && isValidBirthDate && isValidPhone && isValidName) {
      
      setErrorMessage('');
      return 
    }

    return 
  }

  return (
    <Container>
      <InfoBox>
        <Form name="Nome" info={name} setValue={setName} />
        <Form name="Telefone" info={phone} setValue={setPhone} />
        <Form name="Data de Nascimento (dd/mm/yyyy)" info={birthDate} setValue={setBirthDate} />
        <Form name="E-mail" info={email} setValue={setEmail} />
        <View>
            <Text>Escolha o Role</Text>
            <Picker
              selectedValue={role}
              onValueChange={(itemValue) => setRole(itemValue)}>
              <Picker.Item label="Admin" value={UserRole.ADMIN} />
              <Picker.Item label="User" value={UserRole.USER} />
            </Picker>
          </View>
      </InfoBox>
      <BoxErrorMessage>
      {errorMessage && <ErrorMessage message={errorMessage} />}
      </BoxErrorMessage>
      <ButtonBox>
        <AddButton onPress={validate}>
          <TextButton> Adicionar </TextButton>
        </AddButton>
      </ButtonBox>
    </Container>
  );
}
