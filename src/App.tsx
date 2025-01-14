import React from 'react';
import { WelcomeUser } from './pages/WelcomeUser/index.tsx';
import { SafeAreaView } from 'react-native';

function App(): JSX.Element {
  return (
    <SafeAreaView>
      <WelcomeUser />
    </SafeAreaView>
  );
}

export default App;
