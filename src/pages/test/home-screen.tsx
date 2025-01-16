import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { Navigation } from 'react-native-navigation';

export const HomeScreen = (props: { componentId: string }) => {
  return (
    <View style={styles.root}>
      <Text>Hello React Native Navigation :wave:</Text>
      <Button
        title="Push Settings Screen"
        color="#710CE3"
        onPress={() =>
          Navigation.push(props.componentId, {
            component: {
              name: 'Settings',
              options: {
                topBar: {
                  title: {
                    text: 'Settings',
                  },
                },
              },
            },
          })
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'whitesmoke',
  },
});
