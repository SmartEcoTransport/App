import React from 'react';
import { Box, Typography, List, ListItem, ListItemAvatar, ListItemText, Avatar, Button } from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import TrainIcon from '@mui/icons-material/Train';
import FlightIcon from '@mui/icons-material/Flight';
import { useRouter } from "expo-router"; // Assure-toi que cela provient de la bonne bibliothèque

type Trajet = {
  moyen: 'Voiture' | 'Train' | 'Avion';
  destination: string;
  emission: number; // en kg de CO2
  distance: number; // en km
};

const trajets: Trajet[] = [
  { moyen: 'Voiture', destination: 'Paris - Lyon', emission: 50, distance: 450 },
  { moyen: 'Train', destination: 'Lyon - Marseille', emission: 10, distance: 320 },
  { moyen: 'Avion', destination: 'Marseille - Barcelone', emission: 200, distance: 500 },
];

const TrajetList: React.FC = () => {
  const router = useRouter(); // Déplacer useRouter à l'intérieur du composant

  const handleMenuClose = () => {
    // Si setAnchorEl n'est pas utilisé ailleurs, tu peux le supprimer
    console.log("Menu fermé");
  };

  const getIcon = (moyen: Trajet['moyen']) => {
    switch (moyen) {
      case 'Voiture':
        return <DirectionsCarIcon />;
      case 'Train':
        return <TrainIcon />;
      case 'Avion':
        return <FlightIcon />;
      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: '#013328',
        color: 'white',
        padding: 2,
        borderRadius: 2,
        width: '80%',
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'auto',
        position: 'relative',
      }}
    >
      <Button
        variant="contained"
        sx={{
          position: 'absolute',
          top: 16,
          right: 16,
          backgroundColor: '#B3E189',
          color: '#013328',
          '&:hover': {
            backgroundColor: '#CC8B65',
          },
        }}
        onClick={() => {
          handleMenuClose();
          router.push("/CreatTrajet"); // Vérifie que "/CreatTrajet" est une route valide
        }}
      >
        Créer un trajet
      </Button>
      <Typography variant="h6" sx={{ marginBottom: 2, textAlign: 'center' }}>
        Mes Trajets et Émissions
      </Typography>
      <List sx={{ width: '100%' }}>
        {trajets.map((trajet, index) => (
          <ListItem
            key={index}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              textAlign: 'center',
            }}
          >
            <ListItemAvatar>
              <Avatar sx={{ backgroundColor: '#B3E189' }}>{getIcon(trajet.moyen)}</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={trajet.destination}
              secondary={
                <>
                  <Typography component="span" sx={{ color: '#CC8B65' }}>
                    Émissions : {trajet.emission} kg CO2
                  </Typography>
                  <br />
                  <Typography component="span" sx={{ color: '#B3E189' }}>
                    Distance : {trajet.distance} km
                  </Typography>
                </>
              }
              sx={{
                textAlign: 'center',
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default TrajetList;
