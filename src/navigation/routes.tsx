import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { WelcomeUser } from '../pages/welcome-user';
import { ListUsers } from '../pages/list-users';

const Stack = createStackNavigator();

export function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="WelcomeUser" component={WelcomeUser} />
        <Stack.Screen name="UserList" component={ListUsers} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
