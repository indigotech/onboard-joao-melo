import React from 'react';
import { Text } from 'react-native';

interface UserListProps {
  message: string;
}

export function UserList(props: UserListProps): JSX.Element {
  return <Text>{props.message}</Text>;
}
