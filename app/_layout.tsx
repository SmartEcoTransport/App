import React, { useEffect, useState } from 'react';
import { Slot, useRouter } from 'expo-router';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { usePlatform } from '../hooks/usePlatform';
import { PaperProvider } from 'react-native-paper';

/**
 * Wrap the whole app in AuthProvider at the very top level
 */
export default function RootLayout() {
  return (
    <PaperProvider>
      <AuthProvider>
        <MainLayout />
      </AuthProvider>
    </PaperProvider>
  );
}

function MainLayout() {
  return <Slot />;
}
