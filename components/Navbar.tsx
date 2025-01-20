import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import { useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from "expo-router";


const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobile = useMediaQuery('(max-width:600px)'); // Détecte les écrans < 600px
  const router = useRouter();

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: '#013328', // Couleur personnalisée
        color: '#CC8B65',
      }}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold', color: 'white' }}>
          Smart Eco
        </Typography>
        {isMobile ? (
          // Affiche un bouton hamburger si l'écran est petit
          <>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleMenuOpen}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={isMenuOpen}
              onClose={handleMenuClose}
            >

              <MenuItem onClick={() => { handleMenuClose(); router.push("/index2"); }}>
                Accueil
              </MenuItem>
              <MenuItem onClick={() => { handleMenuClose(); router.push("/"); }}>
                À propos
              </MenuItem>
              <MenuItem onClick={() => { handleMenuClose(); router.push("/explore"); }}>
                Services
              </MenuItem>
            </Menu>
          </>
        ) : (
          // Affiche les boutons normaux si l'écran est plus grand
          <>
            <Button color="inherit" sx={{ marginLeft: 1 }} onClick={() => { handleMenuClose(); router.push("/"); }}>
              Accueil
            </Button>
            <Button color="inherit" sx={{ marginLeft: 1 }} onClick={() => { handleMenuClose(); router.push("/"); }}>
              À propos
            </Button>
            <Button color="inherit" sx={{ marginLeft: 1 }} onClick={() => { handleMenuClose(); router.push("/explore"); }}>
              Services
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
