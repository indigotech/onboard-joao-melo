import React from 'react';
import { ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import { H1 } from '../../global-style/style';
import { GET_USER_BY_ID } from '../../graphql/query/getUser';
import { useQuery } from '@apollo/client';
import { Container, Header, FieldGroup, Label, Value } from './style';
import { ErrorMessage } from '../../components/error-message';
import { PrimaryButton } from '../../components/primary-button';

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
      <SafeAreaView>
        <ErrorMessage message="Erro ao carregar os dados do usuário." />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <Container>
        <H1>Perfil do usuário</H1>
        <FieldGroup>
          <Label>Nome</Label>
          <Value placeholder={user.name} editable={false} />
        </FieldGroup>
        <FieldGroup>
          <Label>Id</Label>
          <Value placeholder={user.id} editable={false} />
        </FieldGroup>
        <FieldGroup>
          <Label>E-mail</Label>
          <Value placeholder={user.email} editable={false} />
        </FieldGroup>
        <FieldGroup>
          <Label>Telefone</Label>
          <Value placeholder={user.phone} editable={false} />
        </FieldGroup>
        <FieldGroup>
          <Label>Data de nascimento</Label>
          <Value placeholder={user.birthDate} editable={false} />
        </FieldGroup>
        <FieldGroup>
          <Label>Permissão</Label>
          <Value placeholder={user.role} editable={false} />
        </FieldGroup>
        <PrimaryButton onClick={goToListUsers} text="Voltar" loading={false} />
      </Container>
    </SafeAreaView>
  );
}
