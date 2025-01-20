import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  CssBaseline,
  Grid,
  ThemeProvider,
  createTheme,
} from "@mui/material";

// Créer un thème sombre
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#fff",
      paper: "#1d1d1d",
    },
    text: {
      primary: "#ffffff",
    },
  },
});

const LoginPage: React.FC = () => {
  // State pour stocker les valeurs des champs
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // Gestion de la soumission du formulaire
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "40rem",
            backgroundColor: "background.paper", // Couleur du fond
            padding: 4,
            borderRadius: 2,
          }}
        >
          <Typography component="h1" variant="h5">
            Connexion
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Adresse Email"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                  }
                  InputLabelProps={{
                    style: { color: "rgba(255, 255, 255, 0.7)" }, // Couleur du label
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Mot de passe"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                  }
                  InputLabelProps={{
                    style: { color: "rgba(255, 255, 255, 0.7)" },
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: "#6200ea", // Couleur personnalisée du bouton
                ":hover": {
                  backgroundColor: "#3700b3", // Couleur au survol
                },
              }}
            >
              Se connecter
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default LoginPage;
