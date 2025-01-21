import React, { createContext, useContext, useState, useEffect } from 'react';
import { API_BASE_URL } from '../constants/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextProps {
  isLoggedIn: boolean;
  authLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, username: string, password: string) => Promise<void>;
  errorMessage: string | null; // optional to store any error state
}

const AuthContext = createContext<AuthContextProps>({
  isLoggedIn: false,
  authLoading: true,
  login: async () => {},
  logout: async () => {},
  register: async () => {},
  errorMessage: null,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    // Check AsyncStorage for a token or logged-in flag
    async function loadAuthState() {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
          // If you want to validate it, you can do so here
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.log('Error reading token from AsyncStorage', error);
      } finally {
        setAuthLoading(false);
      }
    }
    loadAuthState();
  }, []);

  /**
   * Register a new user by email, username, and password
   */
  async function register(email: string, username: string, password: string) {
    setErrorMessage(null);
    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, username, password }),
      });

      if (!response.ok) {
        // Extract any server error message
        const errorData = await response.json();
        throw new Error(errorData.error || 'Unable to register user');
      }

      login(email, password)

    } catch (error: any) {
      console.log('Registration error:', error.message);
      setErrorMessage(error.message);
    }
  }

  /**
   * Login using email and password
   */
  async function login(email: string, password: string) {
    setErrorMessage(null);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        // Extract server error message if needed
        const errorData = await response.json();
        throw new Error(errorData.error || 'Unable to login');
      }

      const data = await response.json();
      const token = data.token;
      if (!token) {
        throw new Error('No token received from the server');
      }

      await AsyncStorage.setItem('userToken', token);
      setIsLoggedIn(true);
    } catch (error: any) {
      console.log('Login error:', error.message);
      setErrorMessage(error.message);
    }
  }

  /**
   * Logout user
   */
  async function logout() {
    try {
      await AsyncStorage.removeItem('userToken');
      setIsLoggedIn(false);
    } catch (error) {
      console.log('Error removing token from AsyncStorage', error);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        authLoading,
        login,
        logout,
        register,
        errorMessage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
