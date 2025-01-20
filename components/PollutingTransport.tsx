import React from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';

const transportData = [
  { name: 'Avion', emission: '900g CO2 / km', color: '#CC8B65' },
  { name: 'Voiture', emission: '120g CO2 / km', color: '#CC8B65' },
  { name: 'Bus', emission: '68g CO2 / km', color: '#CC8B65' },
  { name: 'Train', emission: '14g CO2 / km', color: '#CC8B65' },
];

type Props = {};

const PollutingTransport: React.FC<Props> = () => {
  return (
    <Box sx={{ padding: 3, backgroundColor: '#013328', xs: 12, md: 12 }}>
      <Typography variant="h4" sx={{ color: '#FFFFFF', marginBottom: 3, textAlign: 'center' }}>
        Moyens de Transport les Plus Polluants
      </Typography>
      <Grid container spacing={2}>
        {transportData.map((transport, index) => (
          <Grid item xs={6} sm={6} md={3} key={index}>
            <Card sx={{ backgroundColor: transport.color, color: '#FFFFFF' }}>
              <CardContent>
                <Typography variant="h6" sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                  {transport.name}
                </Typography>
                <Typography variant="body1" sx={{ textAlign: 'center',fontSize:'14px' }}>
                  {transport.emission}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PollutingTransport;
