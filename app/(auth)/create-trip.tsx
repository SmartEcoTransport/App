import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  FlatList,
  View,
  Keyboard,
} from 'react-native';
import {
  TextInput,
  Button,
  Text as PaperText,
  Provider as PaperProvider,
  MD3LightTheme as DefaultTheme,
} from 'react-native-paper';
import { Dropdown } from 'react-native-paper-dropdown';
import { DatePickerInput } from 'react-native-paper-dates';
import { useRouter } from 'expo-router';
import { API_BASE_URL } from '../../constants/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Navbar from '@/components/Navbar';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#013328',
    surface: '#1d1d1d',
    primary: '#CC8B65',
    text: '#E3DCD2',
    onSurface: '#E3DCD2',
    onPrimary: '#013328',
  },
};

const CreateTrip: React.FC = () => {
  const [startAddress, setStartAddress] = useState('');
  const [endAddress, setEndAddress] = useState('');
  const [startSuggestions, setStartSuggestions] = useState<string[]>([]);
  const [endSuggestions, setEndSuggestions] = useState<string[]>([]);
  const [distanceKm, setDistanceKm] = useState('');
  const [modeID, setModeID] = useState<number>(1);
  const [carBrand, setCarBrand] = useState('');
  const [carModel, setCarModel] = useState('');
  const [tripDate, setTripDate] = useState(new Date());
  const [transportModes, setTransportModes] = useState<{ label: string; value: number }[]>([]);
  const [loadingModes, setLoadingModes] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isStartFocused, setIsStartFocused] = useState(false);
  const [isEndFocused, setIsEndFocused] = useState(false);

  const router = useRouter();
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    async function fetchTransportModes() {
      try {
        const token = await AsyncStorage.getItem('userToken');
        const response = await fetch(`${API_BASE_URL}/transportation`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch transportation modes');
        }

        const data = await response.json();
        const formattedModes = Array.isArray(data.modes)
          ? data.modes.map((mode) => ({
              label: mode.mode_name,
              value: mode.mode_id,
            }))
          : [];
        setTransportModes(formattedModes);
      } catch (error) {
        console.error('Error fetching transportation modes:', error);
        Alert.alert('Error', 'Failed to load transportation modes');
      } finally {
        setLoadingModes(false);
      }
    }

    fetchTransportModes();
  }, []);

  const fetchAddressSuggestions = async (
    query: string,
    setSuggestions: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`,
        {
          headers: {
            'User-Agent': 'Expo/1.0 (https://expo.io)',
          },
        }
      );

      if (!response.ok) throw new Error('Failed to fetch address suggestions');
      const data = await response.json();
      setSuggestions(data.map((item: any) => item.display_name));
    } catch (error) {
      console.error('Error fetching address suggestions:', error);
    }
  };

  const handleTyping = (
    query: string,
    setSuggestions: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

    typingTimeoutRef.current = setTimeout(() => {
      fetchAddressSuggestions(query, setSuggestions);
    }, 500); // 500ms delay
  };

  const handleSubmit = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');

      if (!token) {
        Alert.alert('Error', 'User is not authenticated');
        return;
      }

      const requestBody = {
        start_address: startAddress || null,
        end_address: endAddress || null,
        car_brand: modeID === 4 || modeID === 5 ? carBrand : null,
        car_model: modeID === 4 || modeID === 5 ? carModel : null,
        distance_km: distanceKm ? parseFloat(distanceKm) : 0,
        mode_id: modeID,
        trip_date: tripDate.toISOString().split('T')[0],
      };

      const response = await fetch(`${API_BASE_URL}/trips`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create trip');
      }

      Alert.alert('Success', 'Trip created successfully');
      router.push('/(auth)/dashboard');
    } catch (error) {
      console.error('Error creating trip:', error);
      Alert.alert('Error', error.message);
    }
  };

  return (
    <PaperProvider theme={theme}>
      <Navbar />
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <PaperText variant="headlineMedium" style={styles.title}>
          Créer un trajet
        </PaperText>

        <View style={styles.autocompleteContainer}>
          <TextInput
            label="Adresse de départ (optionnelle)"
            value={startAddress}
            onChangeText={(text) => {
              setStartAddress(text);
              handleTyping(text, setStartSuggestions);
            }}
            onFocus={() => setIsStartFocused(true)}
            onBlur={() => setIsStartFocused(false)}
            style={styles.input}
          />
          {isStartFocused && startSuggestions.length > 0 && (
            <FlatList
              data={startSuggestions}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item }) => (
                <PaperText
                  style={styles.suggestionItem}
                  onPress={() => {
                    setStartAddress(item);
                    setIsStartFocused(false);
                  }}
                >
                  {item}
                </PaperText>
              )}
              style={styles.suggestionsList}
              keyboardShouldPersistTaps="handled"
            />
          )}
        </View>

        <View style={styles.autocompleteContainer}>
          <TextInput
            label="Adresse d'arrivée (optionnelle)"
            value={endAddress}
            onChangeText={(text) => {
              setEndAddress(text);
              handleTyping(text, setEndSuggestions);
            }}
            onFocus={() => setIsEndFocused(true)}
            onBlur={() => setIsEndFocused(false)}
            style={styles.input}
          />
          {isEndFocused && endSuggestions.length > 0 && (
            <FlatList
              data={endSuggestions}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item }) => (
                <PaperText
                  style={styles.suggestionItem}
                  onPress={() => {
                    setEndAddress(item);
                    setIsEndFocused(false);
                  }}
                >
                  {item}
                </PaperText>
              )}
              style={styles.suggestionsList}
              keyboardShouldPersistTaps="handled"
            />
          )}
        </View>

        <TextInput
          label="Distance en km (si pas d'adresse)"
          value={distanceKm}
          onChangeText={setDistanceKm}
          keyboardType="numeric"
          style={styles.input}
        />

        <Dropdown
          label={
            modeID
              ? transportModes.find((mode) => mode.value === modeID)?.label || 'Mode de transport'
              : 'Mode de transport'
          }
          options={[...transportModes]}
          onSelect={(value) => setModeID(value)}
          visible={showDropdown}
          showDropDown={() => setShowDropdown(true)}
          onDismiss={() => setShowDropdown(false)}
          inputProps={{
            style: styles.dropdown,
          }}
        />

        {(modeID === 4 || modeID === 5) && (
          <>
            <TextInput
              label="Marque de la voiture"
              value={carBrand}
              onChangeText={setCarBrand}
              style={styles.input}
            />
            <TextInput
              label="Modèle de la voiture"
              value={carModel}
              onChangeText={setCarModel}
              style={styles.input}
            />
          </>
        )}

        <DatePickerInput
          label="Date du trajet"
          value={tripDate}
          onChange={(date) => setTripDate(date)}
          style={styles.datePicker}
        />

        <Button mode="contained" onPress={handleSubmit} style={styles.submitButton}>
          Créer le trajet
        </Button>
      </KeyboardAvoidingView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#CC8B65",
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: theme.colors.text,
  },
  input: {
    marginBottom: 8,
    backgroundColor: theme.colors.surface,
    color: theme.colors.primary,
  },
  dropdown: {
    marginBottom: 16,
  },
  datePicker: {
    marginBottom: 16,
  },
  submitButton: {
    marginTop: 16,
    backgroundColor: "#B3E189",
  },
  suggestionItem: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: theme.colors.surface,
    color: theme.colors.text,
  },
  suggestionsList: {
    maxHeight: 150,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  autocompleteContainer: {
    marginBottom: 16,
  },
});

export default CreateTrip;
