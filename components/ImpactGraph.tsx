import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { Chart, Line, VerticalAxis, HorizontalAxis } from 'react-native-responsive-linechart';
import { API_BASE_URL } from '../constants/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

const ImpactGraph = () => {
  const [graphData, setGraphData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('month');

  useEffect(() => {
    const fetchGraphData = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (!token) {
          console.error('Aucun token trouvé, redirection vers la connexion.');
          router.replace('/(unauth)/login');
          return;
        }
        const endpoint = view === 'day' 
          ? `${API_BASE_URL}/trips/impactGraphDay` 
          : `${API_BASE_URL}/trips/impactGraphMonth`;

        const response = await fetch(endpoint, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        if (data && data.points) {
          setGraphData(
            data.points.map(point => ({
              x: point.x, // Day or month index
              y: point.y, // Cumulative carbon impact
            }))
          );
        }
      } catch (error) {
        console.error('Error fetching graph data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGraphData();
  }, [view]);

  const toggleView = () => {
    setView((prevView) => (prevView === 'month' ? 'day' : 'month'));
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#CC8B65" style={styles.loader} />;
  }

  if (graphData.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.noDataText}>No data available for the selected view.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Chart
        style={{ height: 200, width: '100%' }}
        data={graphData}
        padding={{ left: 40, bottom: 20, right: 20, top: 20 }}
        xDomain={{ min: 1, max: view === 'day' ? 365 : 12 }}
        // add 5 percernt to the max value to make the graph look better
        yDomain={{ min: 0, max: Math.max(...graphData.map(point => point.y)) * 1.05 }}
      >
        <VerticalAxis
          tickCount={5}
          theme={{
            labels: { formatter: (v) => v.toFixed(0), label: { color: '#E3DCD2' } },
            axis: { stroke: { color: '#E3DCD2' } },
          }}
        />
        <HorizontalAxis
          tickCount={view === 'day' ? 12 : 12}
          theme={{
            labels: { label: { color: '#E3DCD2' } },
            axis: { stroke: { color: '#E3DCD2' } },
          }}
        />
        <Line
          theme={{ stroke: { color: '#CC8B65', width: 2 } }}
        />
      </Chart>
      <TouchableOpacity style={styles.button} onPress={toggleView}>
        <Text style={styles.buttonText}>Switch to {view === 'month' ? 'Day' : 'Month'} View</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
    borderRadius: 8,
    padding: 8,
    backgroundColor: '#1d1d1d',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    color: '#E3DCD2',
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
  },
  button: {
    marginTop: 16,
    paddingVertical: 12,
    backgroundColor: '#CC8B65',
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ImpactGraph;
