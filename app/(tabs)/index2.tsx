import React from "react";
import {
  Box,
  Grid,
} from "@mui/material";
import Navbar from "@/components/Navbar";
import GrafiqueAll from "@/components/GrafiqueAll";
import PollutingTransport from "@/components/PollutingTransport";
import TrajetList from "@/components/TrajetList";

const PageLayout: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
        backgroundColor: "#E3DCD2",
        overflow: "auto",
        maxHeight: '100vh',
        overflowY: 'auto',
        alignItems: "stretch", // Utiliser stretch pour prendre toute la largeur
        width: '100%', // Garantir que la largeur est 100% pour les éléments enfants
      }}
    >
      <Navbar />
      {/* Section 2: Graphique */}
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} md={7}>
          <GrafiqueAll />
        </Grid>
        <Grid item xs={12} md={4}>
          <PollutingTransport />
        </Grid>
      </Grid>

      {/* TrajetList section : prendre toute la largeur */}
      <Grid item xs={12} md={8} sx={{ width: '100%' }}>
        <TrajetList />
      </Grid>
    </Box>
  );
};

export default PageLayout;
