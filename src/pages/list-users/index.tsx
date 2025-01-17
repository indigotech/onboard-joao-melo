import React, { useState } from 'react';
import { FlatList, SafeAreaView, Text, View } from 'react-native';
import { BoxInfo } from '../../components/box-info/index';
import { FooterList } from '../../components/footer-list';
import { GET_USERS_QUERY } from '../../graphql/query/getUsers';
import { useQuery } from '@apollo/client';
import { UsersResponse, User } from '../../graphql/types/types';

export function ListUsers() {
  const LIMIT = 20;

  const [users, setUsers] = useState<User[]>([]);
  const [offset, setOffset] = useState(0);

  const { data, loading, error, fetchMore } = useQuery<UsersResponse>(GET_USERS_QUERY, {
    variables: { offset, limit: LIMIT },
    fetchPolicy: 'cache-and-network',
    onCompleted: fetchedData => {
      setUsers(prevUsers => [...prevUsers, ...fetchedData.users.nodes]);
    },
  });

  const loadMoreUsers = async () => {
    if (!data?.users.pageInfo.hasNextPage) return;

    const fetchMoreResult = await fetchMore({
      variables: { offset: offset + LIMIT },
    });

    if (!fetchMoreResult) return;

    setOffset(prevOffset => prevOffset + LIMIT);

    return {
      users: {
        ...fetchMoreResult.data.users,
        nodes: [...data.users.nodes, ...fetchMoreResult.data.users.nodes],
      },
    };
  };

  const handleUserPress = (user: User) => {
    console.log('User pressed:', user);
  };

  if (error) {
    return (
      <SafeAreaView>
        <View style={{ padding: 20 }}>
          <Text>Erro ao carregar os usuários: {error.message}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <View style={{ padding: 16 }}>
        <FlatList
          data={users}
          renderItem={({ item }) => (
            <BoxInfo name={item.name} email={item.email} onPress={() => handleUserPress(item)} />
          )}
          keyExtractor={item => String(item.id)}
          onEndReached={loadMoreUsers}
          onEndReachedThreshold={0.1}
          ListFooterComponent={<FooterList load={loading} />}
        />
      </View>
    </SafeAreaView>
  );
}
