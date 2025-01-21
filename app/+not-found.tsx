import React from 'react';
import { StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { Button, Text, Surface } from 'react-native-paper';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <Surface style={styles.container}>
        <Text variant="headlineMedium">This screen doesn't exist.</Text>
        <Button mode="contained" onPress={() => {}} style={styles.button}>
          Go to home screen!
        </Button>
      </Surface>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  button: {
    marginTop: 15,
  },
});
