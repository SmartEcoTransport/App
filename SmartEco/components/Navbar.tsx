import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import { useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobile = useMediaQuery('(max-width:600px)'); // Détecte les écrans < 600px

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="sticky" color="primary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
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
              <MenuItem onClick={handleMenuClose} component="a" href="#home">
                Accueil
              </MenuItem>
              <MenuItem onClick={handleMenuClose} component="a" href="#about">
                À propos
              </MenuItem>
              <MenuItem onClick={handleMenuClose} component="a" href="#services">
                Services
              </MenuItem>
              <MenuItem onClick={handleMenuClose} component="a" href="#contact">
                Contact
              </MenuItem>
            </Menu>
          </>
        ) : (
          // Affiche les boutons normaux si l'écran est plus grand
          <>
            <Button color="inherit" sx={{ marginLeft: 1 }} href="#home">
              Accueil
            </Button>
            <Button color="inherit" sx={{ marginLeft: 1 }} href="#about">
              À propos
            </Button>
            <Button color="inherit" sx={{ marginLeft: 1 }} href="#services">
              Services
            </Button>
            <Button color="inherit" sx={{ marginLeft: 1 }} href="#contact">
              Contact
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
