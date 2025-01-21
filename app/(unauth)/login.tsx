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
import { black } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#013328',
    background2: '#fff',
    surface: '#1d1d1d',
    primary: '#CC8B65',  // accent color for focused inputs & buttons
    text: '#ffff',
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
          contentContainerStyle={[
            styles.scrollContainer,
            { backgroundColor: '#E3DCD2' },
          ]}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.box}>
           <View style={styles.container}>
            

            
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
                />
                <TextInput
                  mode="flat"
                  label="Nom d'utilisateur"
                  value={username}
                  onChangeText={setUsername}
                  style={styles.input}
                />
                <TextInput
                  mode="flat"
                  label="Mot de passe"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                  style={styles.input}
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
                  autoCapitalize='none'
                  
                />
                <TextInput
                  mode="flat"
                  label="Mot de passe"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                  style={styles.input}
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
  box: {
    // backgroundColor: '#013328',
    width: '60%', // Largeur du composant
    padding: 16, // Ajoute de l'espace interne
    borderRadius: 8, // Coins arrondis
    alignItems: 'center', // Centre le contenu interne horizontalement
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    width: '80%',
    flex: 1, // Le conteneur occupe tout l'écran
    justifyContent: 'center', // Centre verticalement
    alignItems: 'center', // Centre horizontalement
    backgroundColor: '#013328',
    padding: 16, 
    borderRadius: 8,
  },
  title: {
    marginBottom: 16,
  },
  input: {
    width: '80%',
    margin: 8,
    backgroundColor: theme.colors.background2,
    color: 'black',
  },
  button: {
    width: '80%',
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
