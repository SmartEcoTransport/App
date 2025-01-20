import React from "react";
import {
  Box,
  Typography,
  Grid,
  TextField,
} from "@mui/material";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import Navbar from "@/components/Navbar";
// Exemple de données pour le graphique
const data = [
  { name: "Octobre", value: 10 },
  { name: "Novembre", value: 30 },
  { name: "Décembre", value: 20 },
  { name: "Janvier", value: 50 },
  { name: "Février", value: 40 },
];

const PageLayout: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
        // padding: { xs: 2, sm: 4 },
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
        alignItems: "center",
      }}
    >
      <Navbar />
      {/* Section 2: Graphique */}
      <Box
        sx={{
          width: { xs: "100%", md: "80%" },
          height: { xs: "250px", sm: "300px" },
          backgroundColor: "#333",
          color: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 2,
          // padding: 2,
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Section 2: Graphique
        </Typography>
        <ResponsiveContainer width="90%" height="80%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="name" stroke="white" />
            <YAxis stroke="white" />
            <Tooltip contentStyle={{ backgroundColor: "#555", border: "none" }} />
            <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </Box>

      Grid Layout
      <Grid container spacing={2} >
        {/* Section 4: Formulaire départ et arrivée
        {/* <Grid item xs={12} md={6}>
          <Box
            sx={{
              backgroundColor: "#333",
              color: "white",
              padding: 3,
              borderRadius: 2,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          > */}
            {/* <Typography variant="h6">Section 4: Formulaire</Typography>
            <Box>
              <Typography variant="subtitle2">Départ</Typography>
              <TextField
                fullWidth
                placeholder="Entrez le point de départ"
                variant="outlined"
                size="small"
                sx={{
                  input: { color: "white" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "gray",
                    },
                    "&:hover fieldset": {
                      borderColor: "white",
                    },
                  },
                }}
              />
            </Box>
            <Box>
              <Typography variant="subtitle2">Arrivée</Typography>
              <TextField
                fullWidth
                placeholder="Entrez le point d'arrivée"
                variant="outlined"
                size="small"
                sx={{
                  input: { color: "white" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "gray",
                    },
                    "&:hover fieldset": {
                      borderColor: "white",
                    },
                  },
                }}
              />
            </Box>
          </Box>
        </Grid>  */}

        {/* Section 3: Zone vide */}
        <Grid item xs={12} md={9}>
          <Box
            sx={{
              backgroundColor: "#333",
              color: "white",
              padding: 3,
              borderRadius: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <Typography variant="h6">Section 3</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PageLayout;
