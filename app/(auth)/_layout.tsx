import { Redirect, Slot } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { ActivityIndicator, View } from 'react-native';

export default function AuthLayout() {
  const { isLoggedIn, authLoading } = useAuth();

  // If you're still checking the auth status (e.g., from AsyncStorage),
  // show a loading indicator so we don't prematurely redirect.
  if (authLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  // If user is not logged in, immediately redirect them to your login screen.
  if (!isLoggedIn) {
    return <Redirect href="/(unauth)/login" />;
  }

  // Otherwise, render the actual screens (the "Slot")
  return <Slot />;
}
