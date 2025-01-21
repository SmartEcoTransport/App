import React, { useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { useRootNavigationState, router } from 'expo-router';

// 1) Import react-native-paper
import {
  Provider as PaperProvider,
  Text as PaperText,
  MD3LightTheme as DefaultTheme,
} from 'react-native-paper';

// 2) Same theme from your Login screen
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

import Navbar from '@/components/Navbar';
import TripList from '@/components/TripList';
import TripsAggregationList from '@/components/TripsAggregationList';
import ImpactGraph from '@/components/ImpactGraph';

export default function Dashboard() {
  const { logout, isLoggedIn } = useAuth();
  const rootNavigationState = useRootNavigationState();

  useEffect(() => {
    if (!rootNavigationState?.key) return;
    if (!isLoggedIn) {
      router.replace('/(unauth)/login'); // adjust to your actual login route
      return;
    }
  }, [isLoggedIn, rootNavigationState]);

  return (
    /**
     * 3) Wrap your screen in PaperProvider so the theme is applied
     */
    <PaperProvider theme={theme}>
      {/**
       * 4) Use a root View with a background color (like your Login screen).
       *    Here we use #CC8B65 again, or you could use {theme.colors.background}.
       */}
      <View style={[styles.screen, { backgroundColor: '#CC8B65' }]}>
        <Navbar />

        {/**
         * Instead of <Text onPress={logout}>, we can wrap PaperText in a 
         * TouchableOpacity to keep it clickable, or just keep <Text> from RN.
         */}
        <TouchableOpacity onPress={logout}>
          <PaperText
            style={[
              styles.logoutLink,
              { color: theme.colors.primary }, // Use accent color for log-out link
            ]}
          >
            Log Out
          </PaperText>
        </TouchableOpacity>
        <ImpactGraph />
        <TripsAggregationList />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  logoutLink: {
    marginTop: 24,
    fontSize: 16,
  },
});
