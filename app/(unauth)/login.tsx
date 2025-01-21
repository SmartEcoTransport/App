import React, { useState, useEffect } from 'react';
import { 
  View, 
  StyleSheet, 
  ActivityIndicator, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView 
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { router } from 'expo-router';
import Navbar from '@/components/Navbar';

import {
  Provider as PaperProvider,
  Text,
  Button,
  TextInput,
  MD3LightTheme as DefaultTheme,
} from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#013328',
    background2: '#fff',
    surface: '#1d1d1d',
    primary: '#CC8B65', // accent color for focused inputs & buttons
    text: '#E3DCD2',
    onSurface: '#000',
    onPrimary: '#013328',
  },
};

export default function LoginScreen() {
  const { login, register, isLoggedIn, authLoading, errorMessage } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const [isRegisterMode, setIsRegisterMode] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      router.replace('/(auth)/dashboard');
    }
  }, [isLoggedIn]);

  if (authLoading) {
    return (
      <PaperProvider theme={theme}>
        <View style={styles.container}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={[styles.text, { color: theme.colors.text }]}>
            Checking Auth...
          </Text>
        </View>
      </PaperProvider>
    );
  }

  const handleLogin = async () => {
    await login(email, password);
  };

  const handleRegister = async () => {
    await register(email, username, password);
  };

  return (
    <PaperProvider theme={theme}>
      <Navbar />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={[styles.scrollContainer, { backgroundColor: '#E3DCD2' }]}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.box}>
            <View style={styles.innerContainer}>
              {isRegisterMode ? (
                <>
                  <Text
                    variant="headlineMedium"
                    style={[styles.title, { color: theme.colors.text }]}
                  >
                    Inscription
                  </Text>

                  <TextInput
                    mode="flat"
                    label="Adresse Email"
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}
                    placeholderTextColor="#000" // Placeholder en noir
                  />
                  <TextInput
                    mode="flat"
                    label="Nom d'utilisateur"
                    value={username}
                    onChangeText={setUsername}
                    style={styles.input}
                    placeholderTextColor="#000" // Placeholder en noir
                  />
                  <TextInput
                    mode="flat"
                    label="Mot de passe"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                    style={styles.input}
                    placeholderTextColor="#000" // Placeholder en noir
                  />

                  {errorMessage ? (
                    <Text style={styles.error}>{errorMessage}</Text>
                  ) : null}

                  <Button
                    mode="contained"
                    onPress={handleRegister}
                    style={styles.button}
                    buttonColor={theme.colors.primary}
                    textColor="#013328"
                  >
                    S'inscrire
                  </Button>

                  <Button
                    onPress={() => setIsRegisterMode(false)}
                    textColor={theme.colors.text}
                  >
                    Retour à la connexion
                  </Button>
                </>
              ) : (
                <>
                  <Text
                    variant="headlineMedium"
                    style={[styles.title, { color: theme.colors.text }]}
                  >
                    Connexion
                  </Text>

                  <TextInput
                    mode="flat"
                    label="Adresse Email"
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}
                    placeholderTextColor="#000" // Placeholder en noir
                    autoCapitalize="none"
                  />
                  <TextInput
                    mode="flat"
                    label="Mot de passe"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                    style={styles.input}
                    placeholderTextColor="#000" // Placeholder en noir
                  />

                  {errorMessage ? (
                    <Text style={styles.error}>{errorMessage}</Text>
                  ) : null}

                  <Button
                    mode="contained"
                    onPress={handleLogin}
                    style={styles.button}
                    buttonColor={theme.colors.primary}
                    textColor="#013328"
                  >
                    Se connecter
                  </Button>

                  <Button
                    onPress={() => setIsRegisterMode(true)}
                    textColor={theme.colors.text}
                  >
                    Créer un compte
                  </Button>
                </>
              )}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  Container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  box: {
    width: '80%',
    maxWidth: 400, // Limite la largeur sur des écrans plus grands
    backgroundColor: '#013328',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  innerContainer: {
    alignItems: 'center',
  },
  title: {
    marginBottom: 16,
  },
  input: {
    width: '100%',
    marginBottom: 12,
    backgroundColor: theme.colors.background2,
  },
  button: {
    width: '100%',
    marginVertical: 8,
  },
  error: {
    color: 'red',
    marginVertical: 8,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
  },
});
