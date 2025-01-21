import React, { useEffect } from 'react';
import { useRootNavigationState, router } from 'expo-router';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { usePlatform } from '../../hooks/usePlatform';
import Navbar from '@/components/Navbar';

// 1) Import react-native-paper
import {
  Provider as PaperProvider,
  Text as PaperText,
  MD3LightTheme as DefaultTheme,
} from 'react-native-paper';

// 2) Reuse the same theme used in your login & dashboard
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#013328', // Dark green
    surface: '#1d1d1d',
    primary: '#CC8B65',    // Accent
    text: '#E3DCD2',       // Light text
    onSurface: '#E3DCD2',
    onPrimary: '#013328',
  },
};

export default function HomeScreen() {
  const { isMobile } = usePlatform();
  const rootNavigationState = useRootNavigationState();

  // If on mobile, redirect to login
  useEffect(() => {
    if (!rootNavigationState?.key) return;
    if (isMobile) {
      router.replace('/(unauth)/login');
    }
  }, [rootNavigationState, isMobile]);

  return (
    /**
     * 3) Wrap everything in PaperProvider so we can use the theme
     */
    <PaperProvider theme={theme}>
      {/**
       * 4) Use a top-level View with background color #CC8B65 
       *    (or theme.colors.background if you prefer the dark green).
       */}
      <View style={[styles.screen, { backgroundColor: '#CC8B65' }]}>
        <Navbar />
        <View style={styles.container}>
          {/**
           * Use PaperText for consistent typography
           */}
          <PaperText
            variant="headlineMedium"
            style={[styles.title, { color: theme.colors.text }]}
          >
            Welcome to SmartEco 
          </PaperText>

          {/* Replace <Text onPress=...> with a Touchable for the link */}
          <TouchableOpacity onPress={() => router.replace('/(unauth)/login')}>
            <PaperText
              style={[styles.loginLink, { color: theme.colors.primary }]}
            >
              Log In
            </PaperText>
          </TouchableOpacity>

          {/* Additional marketing info, sign-up link, etc. */}
        </View>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 16,
  },
  loginLink: {
    marginTop: 16,
    fontSize: 16,
  },
});
