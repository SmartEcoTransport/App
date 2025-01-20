import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Grid,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import Papa from 'papaparse';

type Trajet = {
  moyen: 'Voiture' | 'Train' | 'Avion';
  destination: string;
  emission: number;
  distance: number;
};

const moyensDeTransport = ['Voiture', 'Train', 'Avion'];

const CreateTrajet: React.FC = () => {
  const [trajets, setTrajets] = useState<Trajet[]>([]);
  const [newTrajet, setNewTrajet] = useState<Trajet>({
    moyen: 'Voiture',
    destination: '',
    emission: 0,
    distance: 0,
  });

  const handleInputChange = (field: keyof Trajet, value: string | number) => {
    setNewTrajet({ ...newTrajet, [field]: value });
  };

  const handleAddTrajet = () => {
    setTrajets([...trajets, newTrajet]);
    setNewTrajet({
      moyen: 'Voiture',
      destination: '',
      emission: 0,
      distance: 0,
    });
  };

  const handleExportToCSV = () => {
    const csvData = Papa.unparse(trajets);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'trajets.csv');
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 4,
        backgroundColor: '#E3DCD2',
        minHeight: '100vh',
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: 4 }}>
        Ajouter un Nouveau Trajet
      </Typography>

      {/* Formulaire */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          width: '50%',
          backgroundColor: '#FFFFFF',
          padding: 4,
          borderRadius: 2,
          boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
        }}
      >
        <TextField
          select
          label="Moyen de Transport"
          value={newTrajet.moyen}
          onChange={(e) => handleInputChange('moyen', e.target.value)}
          fullWidth
        >
          {moyensDeTransport.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Destination"
          value={newTrajet.destination}
          onChange={(e) => handleInputChange('destination', e.target.value)}
          fullWidth
        />

        <TextField
          type="number"
          label="Émissions (kg CO2)"
          value={newTrajet.emission}
          onChange={(e) => handleInputChange('emission', parseFloat(e.target.value))}
          fullWidth
        />

        <TextField
          type="number"
          label="Distance (km)"
          value={newTrajet.distance}
          onChange={(e) => handleInputChange('distance', parseFloat(e.target.value))}
          fullWidth
        />

        <Button variant="contained" color="primary" onClick={handleAddTrajet}>
          Ajouter Trajet
        </Button>
      </Box>

      {/* Liste des trajets */}
      <Typography variant="h5" sx={{ marginTop: 4, marginBottom: 2 }}>
        Liste des Trajets
      </Typography>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={8}>
          <List sx={{ width: '100%', backgroundColor: '#FFFFFF', borderRadius: 2, padding: 2 }}>
            {trajets.map((trajet, index) => (
              <ListItem key={index} sx={{ borderBottom: '1px solid #ddd' }}>
                <ListItemText
                  primary={`${trajet.moyen} - ${trajet.destination}`}
                  secondary={`Émissions : ${trajet.emission} kg CO2 | Distance : ${trajet.distance} km`}
                />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>

      {/* Export CSV */}
      <Button
        variant="contained"
        color="secondary"
        sx={{ marginTop: 4 }}
        onClick={handleExportToCSV}
      >
        Exporter en CSV
      </Button>
    </Box>
  );
};

export default CreateTrajet;
