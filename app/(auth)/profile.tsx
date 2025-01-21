import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { useRootNavigationState, router } from 'expo-router';
import { API_BASE_URL } from '../../constants/api';

// Import react-native-paper
import {
  Provider as PaperProvider,
  Text as PaperText,
  IconButton,
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
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Profile() {
  const { logout, isLoggedIn } = useAuth();
  const rootNavigationState = useRootNavigationState();
  const [username, setUsername] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!rootNavigationState?.key) return;
    if (!isLoggedIn) {
      router.replace('/(unauth)/login'); // adjust to your actual login route
      return;
    }
    
    // Fetch the user's username
    const fetchUserInfo = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (!token) {
          console.error('Aucun token trouvé, redirection vers la connexion.');
          router.replace('/(unauth)/login');
          return;
        }
        const response = await fetch(`${API_BASE_URL}/user/info`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setUsername(data.user.username); // Adjust based on the API response structure
        } else {
          console.error('Failed to fetch user info:', data.error);
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [isLoggedIn, rootNavigationState]);

  return (
    <PaperProvider theme={theme}>
      <View style={[styles.screen, { backgroundColor: '#CC8B65' }]}>
        <Navbar />
        <View style={styles.contentWrapper}>
          {loading ? (
            <ActivityIndicator size="large" color={theme.colors.primary} />
          ) : (
            <>
              <View style={styles.userInfoWrapper}>
                <IconButton
                  icon="account"
                  iconColor="#FFFFFF"
                  size={40}
                  onPress={() => router.push('/profile')}
                />
                <PaperText style={styles.usernameText}>{username}</PaperText>
              </View>
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
              <TripList />
            </>
          )}
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
    alignItems: 'center',
  },
  userInfoWrapper: {
    alignItems: 'center',
    marginVertical: 20,
  },
  usernameText: {
    fontSize: 24,
    color: theme.colors.text,
    marginTop: 8,
  },
  logoutLink: {
    marginTop: 24,
    fontSize: 16,
  },
});
