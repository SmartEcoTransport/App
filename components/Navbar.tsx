import React, { useState } from 'react';
import { View, useWindowDimensions } from 'react-native';
import { Appbar, Menu, Button, IconButton } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [menuVisible, setMenuVisible] = useState(false);
  const { width } = useWindowDimensions();
  const isMobile = width < 600; // Breakpoint for "mobile" vs "desktop"
  const router = useRouter();
  const { isLoggedIn, logout } = useAuth(); // Get the login status and logout function from AuthContext

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const handleNavigate = (path: string) => {
    closeMenu();
    router.push(path);
  };

  return (
    <Appbar.Header style={{ backgroundColor: '#013328' }}>
      {/* App Title / Brand */}
      <Appbar.Content title="Smart Eco" titleStyle={{ color: '#FFFFFF' }} />

      {/* Profile Icon or Log In Button */}
      {isLoggedIn ? (
        <IconButton
          icon="account"
          iconColor='#FFFFFF'
          onPress={() => handleNavigate('/profile')}
        />
      ) : (
        <Button
          mode="text"
          onPress={() => handleNavigate('/login')}
          labelStyle={{ color: '#FFFFFF' }}
        >
          Log In
        </Button>
      ) 
      }
      <Button
          mode="text"
          onPress={() => handleNavigate('/dashboard')}
          labelStyle={{ color: '#FFFFFF' }}
        >
          Dashboard
        </Button>
      {/* For Mobile: Hamburger icon that opens a Menu */}
      {isMobile ? (
        <Menu
          visible={menuVisible}
          onDismiss={closeMenu}
          anchor={
            <Appbar.Action icon="menu" color="#FFFFFF" onPress={openMenu} />
          }
          contentStyle={{ backgroundColor: '#013328' }}
        >
          <Menu.Item
            onPress={() => {
              logout();
              closeMenu();
            }}
            title="Logout"
            titleStyle={{ color: '#FFFFFF' }}
          />
        </Menu>
      ) : (
        // For Desktop / Larger screens: Show inline buttons
        <View style={{ flexDirection: 'row' }}>
          <Button
            onPress={() => logout()}
            labelStyle={{ color: '#FFFFFF' }}
          >
            Logout
          </Button>
        </View>
      )}
    </Appbar.Header>
  );
}
