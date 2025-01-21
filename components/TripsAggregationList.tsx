import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { Card, Avatar, Text, Button } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import { API_BASE_URL } from '../constants/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const modeIcons = {
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

const TripsAggregationList = () => {
  const [aggregatedTrips, setAggregatedTrips] = useState(null);
  const [totalImpact, setTotalImpact] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const { authLoading, isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    async function fetchAggregatedTrips() {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (!token) {
          console.error('Aucun token trouvé, redirection vers la connexion.');
          router.replace('/(unauth)/login');
          return;
        }

        const response = await fetch(`${API_BASE_URL}/trips/aggregation`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Échec de la récupération des données agrégées');
        }

        const data = await response.json();
        setAggregatedTrips(data.trips);
        // range over the trips to calculate the total impact
        let totalImpact = 0;
        for (const trip of data.trips) {
          totalImpact += trip.total_impact;
        }
        // only two decimal places
        totalImpact = Math.round(totalImpact * 100) / 100;
        setTotalImpact(totalImpact);
      } catch (error) {
        console.error('Erreur lors de la récupération des données agrégées :', error);
      } finally {
        setLoading(false);
      }
    }

    if (!authLoading && isLoggedIn) {
      fetchAggregatedTrips();
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

      {/* Total Impact */}
      {totalImpact !== null && (
        <Text variant="headlineMedium" style={styles.impactText}>
          Impact total des émissions : {totalImpact} kg CO2
        </Text>
      )}
      <Text variant="headlineSmall" style={styles.title}>
        Agrégation par mode de transport
      </Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {aggregatedTrips && aggregatedTrips.length > 0 ? (
          aggregatedTrips.map((trip) => (
            <Card key={trip.mode_id} style={styles.card}>
              <Card.Title
                title={modeDescriptions[trip.mode_id] || 'Inconnu'}
                subtitle={
                  <View>
                    <Text style={styles.emissionText}>
                      Total Émissions : {Math.round(trip.total_impact * 100) / 100} kg CO2
                    </Text>
                    <Text style={styles.distanceText}>
                      Total Distance : {trip.total_distance} km
                    </Text>
                    <Text style={styles.tripCountText}>
                      Nombre de trajets : {trip.total_trips}
                    </Text>
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
          <Text style={styles.noTripsText}>
            Aucun trajet agrégé disponible.
          </Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  impactText: {
    color: '#E3DCD2',
    textAlign: 'center',
    marginBottom: 16,
  },
  createButton: {
    backgroundColor: '#B3E189',
    marginBottom: 16,
  },
  container: {
    flex: 1,
    backgroundColor: '#013328',
    padding: 16,
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
  title: {
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
  tripCountText: {
    color: '#E3DCD2',
  },
  noTripsText: {
    color: '#E3DCD2',
    textAlign: 'center',
    marginTop: 16,
    fontSize: 16,
  },
});

export default TripsAggregationList;
