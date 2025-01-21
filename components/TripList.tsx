import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { Card, Avatar, Text, Button } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import { API_BASE_URL } from '../constants/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Trip data type
type Trip = {
  trip_id: number;
  user_id: number;
  start_address?: string;
  end_address?: string;
  distance_km?: number;
  mode_id: number;
  carbon_impact_kg?: number;
  trip_date: string;
};

const modeIcons: { [key: number]: string } = {
  1: 'airplane',
  2: 'train',
  3: 'train-car',
  4: 'car',
  5: 'car-electric',
  6: 'bus',
  7: 'bike',
  8: 'bike',
  9: 'bus',
  10: 'tram',
  11: 'subway',
  12: 'motorbike',
  13: 'motorbike',
  14: 'train',
  15: 'train',
  16: 'bus',
  17: 'scooter',
  21: 'bus',
  22: 'car',
  23: 'car',
  24: 'car',
  25: 'car',
  26: 'car-electric',
  27: 'car-electric',
  28: 'car-electric',
  29: 'car-electric',
};

const modeDescriptions: { [key: number]: string } = {
  1: 'Trajet en avion',
  2: 'Trajet en TGV',
  3: 'Trajet en train',
  4: 'Trajet en voiture',
  5: 'Trajet en voiture électrique',
  6: 'Trajet en bus',
  7: 'Trajet en vélo',
  8: 'Trajet en vélo électrique',
  9: 'Trajet en bus',
  10: 'Trajet en tramway',
  11: 'Trajet en métro',
  12: 'Trajet en scooter ou moto légère',
  13: 'Trajet en moto',
  14: 'Trajet en train de banlieue',
  15: 'Trajet en train régional',
  16: 'Trajet en bus électrique',
  17: 'Trajet en trottinette électrique',
  21: 'Trajet en bus au gaz naturel',
  22: 'Covoiturage (1 passager)',
  23: 'Covoiturage (2 passagers)',
  24: 'Covoiturage (3 passagers)',
  25: 'Covoiturage (4 passagers)',
  26: 'Covoiturage électrique (1 passager)',
  27: 'Covoiturage électrique (2 passagers)',
  28: 'Covoiturage électrique (3 passagers)',
  29: 'Covoiturage électrique (4 passagers)',
};

const TripList: React.FC = () => {
  const [trips, setTrips] = useState<Trip[] | null>(null);
  const [totalImpact, setTotalImpact] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const { authLoading, isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    async function fetchTripsAndImpact() {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (!token) {
          console.error('Aucun token trouvé, redirection vers la connexion.');
          router.replace('/(unauth)/login');
          return;
        }

        const [tripsResponse, impactResponse] = await Promise.all([
          fetch(`${API_BASE_URL}/trips`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }),
          fetch(`${API_BASE_URL}/trips/impact`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }),
        ]);

        if (!tripsResponse.ok || !impactResponse.ok) {
          throw new Error('Échec de la récupération des données');
        }

        const tripsData = await tripsResponse.json();
        const impactData = await impactResponse.json();

        setTrips(tripsData.trips);
        setTotalImpact(impactData.total_impact);
        console.log('Données récupérées :', { trips: tripsData, impact: impactData });
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
      } finally {
        setLoading(false);
      }
    }

    if (!authLoading && isLoggedIn) {
      fetchTripsAndImpact();
    }
  }, [authLoading, isLoggedIn]);

  if (loading || authLoading) {
    return (
      <View style={styles.spinnerContainer}>
        <ActivityIndicator size="large" color="#CC8B65" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header Button */}
      <Button
        mode="contained"
        onPress={() => router.push('/(auth)/create-trip')}
        style={styles.createButton}
        textColor="#013328"
      >
        Créer un trajet
      </Button>

      {/* Title */}
      <Text variant="headlineMedium" style={styles.title}>
        Mes trajets et émissions
      </Text>

      {/* Trip List */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {trips && trips.length > 0 ? (
          trips.map((trip) => (
            <Card key={trip.trip_id} style={styles.card}>
              <Card.Title
                title={
                  trip.start_address && trip.end_address
                    ? `${trip.start_address} - ${trip.end_address}`
                    : modeDescriptions[trip.mode_id] || 'Trajet inconnu'
                }
                subtitle={
                  <View>
                    <Text style={styles.emissionText}>Émissions : {trip.carbon_impact_kg ?? 0} kg CO2</Text>
                    <Text style={styles.distanceText}>Distance : {trip.distance_km ?? 0} km</Text>
                  </View>
                }
                left={(props) => (
                  <Avatar.Icon
                    {...props}
                    icon={modeIcons[trip.mode_id] || 'help-circle'}
                    style={styles.avatar}
                  />
                )}
              />
            </Card>
          ))
        ) : (
          <Text style={styles.noTripsText}>Aucun trajet disponible. Créez-en un pour commencer !</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '80%',
    flex: 1,
    backgroundColor: '#013328',
    padding: 16,
    borderRadius: 8,
  },
  scrollContainer: {
    paddingBottom: 16,
  },
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#013328',
  },
  createButton: {
    backgroundColor: '#B3E189',
    marginBottom: 16,
  },
  title: {
    color: '#E3DCD2',
    textAlign: 'center',
    marginBottom: 16,
  },
  impactText: {
    color: '#CC8B65',
    textAlign: 'center',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#1d1d1d',
    marginBottom: 16,
  },
  avatar: {
    backgroundColor: '#B3E189',
  },
  emissionText: {
    color: '#CC8B65',
  },
  distanceText: {
    color: '#B3E189',
  },
  noTripsText: {
    color: '#E3DCD2',
    textAlign: 'center',
    marginTop: 16,
    fontSize: 16,
  },
});

export default TripList;
