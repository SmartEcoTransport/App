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
import { styled } from "@mui/system";
import Navbar from "./Navbar";
// Créer un thème personnalisé avec les couleurs extraites
const customTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#013328", // Fond sombre
      paper: "#1d1d1d",
    },
    primary: {
      main: "#CC8B65", // Accent clair pour les boutons
    },
    text: {
      primary: "#E3DCD2", // Texte clair
    },
  },
});

// Style pour la carte avec effet de rotation
const CardContainer = styled(Box)(() => ({
  perspective: "1000px", // Pour activer l'effet 3D
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100%",
}));

const Card = styled(Box)<{ flipped: boolean }>(({ flipped }) => ({
  width: "100%",
  height: "400px",
  transformStyle: "preserve-3d",
  transition: "transform 0.6s ease-in-out",
  transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
  position: "relative",
}));

const CardSide = styled(Box)<{ front?: boolean }>(({ front }) => ({
  width: "100%",
  height: "100%",
  backfaceVisibility: "hidden", // Cache la face arrière lorsqu'elle est derrière
  position: "absolute",
  top: 0,
  left: 0,
  backgroundColor: front ? "#013328" : "#013328", // Différencier les faces
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
  transform: front ? "rotateY(0deg)" : "rotateY(180deg)",
}));

const Login: React.FC = () => {
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signUpData, setSignUpData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleFlip = () => {
    setIsCardFlipped(!isCardFlipped);
  };

  const handleLoginSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Login Data:", loginData);
  };

  const handleSignUpSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Sign Up Data:", signUpData);
  };

  return (
    <ThemeProvider theme={customTheme}>

      <Container
        component="main"
        
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "90vh",
          backgroundColor: "#CC8B65",
            xs: 12, md: 3 
        }}
      >
        <CssBaseline />
        <CardContainer >

          <Card flipped={isCardFlipped}>
            {/* Côté Connexion */}
            <CardSide front>
              <Typography component="h1" variant="h5" color="text.primary">
                Connexion
              </Typography>
              <Box
                component="form"
                onSubmit={handleLoginSubmit}
                noValidate
                sx={{ mt: 3 }}
              >
                <Grid container >
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="login-email"
                      label="Adresse Email"
                      name="email"
                      autoComplete="email"
                      value={loginData.email}
                      onChange={(e) =>
                        setLoginData({ ...loginData, email: e.target.value })
                      }
                      InputLabelProps={{
                        style: { color: "rgba(227, 220, 210, 0.7)" },
                      }}
                      InputProps={{
                        style: { color: "#E3DCD2" },
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
                      id="login-password"
                      autoComplete="current-password"
                      value={loginData.password}
                      onChange={(e) =>
                        setLoginData({ ...loginData, password: e.target.value })
                      }
                      InputLabelProps={{
                        style: { color: "rgba(227, 220, 210, 0.7)" },
                      }}
                      InputProps={{
                        style: { color: "#E3DCD2" },
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
                    backgroundColor: "#CC8B65",
                    color: "#013328",
                    fontWeight: "bold",
                    ":hover": {
                      backgroundColor: "#E3DCD2",
                      color: "#013328",
                    },
                  }}
                >
                  Se connecter
                </Button>
                <Button
                  fullWidth
                  onClick={handleFlip}
                  sx={{ color: "text.primary" }}
                >
                  Créer un compte
                </Button>
              </Box>
            </CardSide>

            {/* Côté Inscription */}
            <CardSide>
              <Typography component="h1" variant="h5" color="text.primary">
                Inscription
              </Typography>
              <Box
                component="form"
                onSubmit={handleSignUpSubmit}
                noValidate
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="signUp-email"
                      label="Adresse Email"
                      name="email"
                      autoComplete="email"
                      value={signUpData.email}
                      onChange={(e) =>
                        setSignUpData({ ...signUpData, email: e.target.value })
                      }
                      InputLabelProps={{
                        style: { color: "rgba(227, 220, 210, 0.7)" },
                      }}
                      InputProps={{
                        style: { color: "#E3DCD2" },
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
                      id="signUp-password"
                      autoComplete="new-password"
                      value={signUpData.password}
                      onChange={(e) =>
                        setSignUpData({ ...signUpData, password: e.target.value })
                      }
                      InputLabelProps={{
                        style: { color: "rgba(227, 220, 210, 0.7)" },
                      }}
                      InputProps={{
                        style: { color: "#E3DCD2" },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="confirm-password"
                      label="Confirmer le mot de passe"
                      type="password"
                      id="confirm-password"
                      autoComplete="new-password"
                      value={signUpData.confirmPassword}
                      onChange={(e) =>
                        setSignUpData({
                          ...signUpData,
                          confirmPassword: e.target.value,
                        })
                      }
                      InputLabelProps={{
                        style: { color: "rgba(227, 220, 210, 0.7)" },
                      }}
                      InputProps={{
                        style: { color: "#E3DCD2" },
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
                    backgroundColor: "#CC8B65",
                    color: "#013328",
                    fontWeight: "bold",
                    ":hover": {
                      backgroundColor: "#E3DCD2",
                      color: "#013328",
                    },
                  }}
                >
                  S'inscrire
                </Button>
                <Button
                  fullWidth
                  onClick={handleFlip}
                  sx={{ color: "text.primary" }}
                >
                  Retour à la connexion
                </Button>
              </Box>
            </CardSide>
          </Card>
        </CardContainer>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
