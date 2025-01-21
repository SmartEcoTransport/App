import React, { useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { useRootNavigationState, router } from 'expo-router';

// Import react-native-paper
import {
  Provider as PaperProvider,
  Text as PaperText,
  MD3LightTheme as DefaultTheme,
} from 'react-native-paper';

// Theme setup
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
    <PaperProvider theme={theme}>
      <View style={[styles.screen, { backgroundColor: '#CC8B65' }]}>
      <Navbar />
        <View style={styles.contentWrapper}>

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
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  contentWrapper: {
    flex: 1,
    width: '100%',
    maxWidth: 1200, // Limit the width for larger screens
    alignSelf: 'center', // Center content on larger screens
  },
  logoutLink: {
    marginTop: 24,
    fontSize: 16,
  },
});
