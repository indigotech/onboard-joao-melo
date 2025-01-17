import React from 'react';
import { SafeAreaView } from 'react-native';
import { BoxInfo } from '../../components/box-info/index';

export function ListUsers() {
  return (
    <SafeAreaView>
      <BoxInfo email="email" name="nome" />
    </SafeAreaView>
  );
}
