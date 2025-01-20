import React from "react";
import {
  Box,
  Typography,
  Grid,
  TextField,
} from "@mui/material";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Exemple de données pour le graphique
const data = [
  { name: "Octobre", value: 10 },
  { name: "Novembre", value: 30 },
  { name: "Décembre", value: 20 },
  { name: "Janvier", value: 50 },
  { name: "Février", value: 40 },
];
const GrafiqueAll: React.FC = () => {
  return (
    <Box
        sx={{
          width: { xs: "100%", md: "80%" },
          height: { xs: "250px", sm: "300px" },
          backgroundColor: "#013328",
          // background: "linear-gradient(0deg, rgba(179,225,137,1) 0%, rgba(137,225,150,1) 77%)",
          color: "#CC8B65",
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
            <YAxis stroke="#CC8B65" />
            <Tooltip contentStyle={{ backgroundColor: "#fff", border: "none" }} />
            <Line type="monotone" dataKey="value" stroke="#CC8B65" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </Box>
        );
    };
export default GrafiqueAll;