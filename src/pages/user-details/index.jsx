import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import { ButtonBox, AddButton, TextButton } from '../list-users/style';
import { GET_USER_BY_ID } from '../../graphql/query/getUser';
import { useQuery } from '@apollo/client';

export function UserDetails({ navigation }) {
  const route = useRoute();
  const { id } = route.params;
  const { data, loading, error } = useQuery(GET_USER_BY_ID, {
    variables: { id },
  });

  const goToListUsers = () => {
    navigation.navigate('UserList');
  };

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  const user = data?.user;

  if (error || !user) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'red', fontSize: 16 }}>Erro ao carregar os dados do usuário.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <View>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 16 }}>Detalhes do usuário</Text>
        <Text>ID: {user.id}</Text>
        <Text>Nome: {user.name}</Text>
        <Text>Data de nascimento: {user.birthDate}</Text>
        <Text>Email: {user.email}</Text>
        <Text>Telefone: {user.phone}</Text>
        <ButtonBox>
          <AddButton onPress={goToListUsers}>
            <TextButton> Voltar </TextButton>
          </AddButton>
        </ButtonBox>
      </View>
    </SafeAreaView>
  );
}
