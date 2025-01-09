import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
} from 'react-native';


function App(): React.JSX.Element {

  return (
    <SafeAreaView>
      <StatusBar/>
      <Text> Hello Universe </Text>
    </SafeAreaView>
  );
}

export default App;
