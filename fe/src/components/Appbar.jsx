import * as React from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Badge,
  Button,
  Drawer,
  Grid,
} from '@mui/material';
import { styled } from '@mui/material/styles';

import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

import { CartContext } from '../shared/CartContext/CartCtx';
import MobileSideMenu from './MobileSideMenu';

const drawerWidth = 400;

// Styled Search Box
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '15px',
  border: '2px solid #ea4b2d',
  backgroundColor: '#ffffff',
  '&:hover': {
    backgroundColor: '#ffffff',
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '75%',
  [theme.breakpoints.up('md')]: {
    marginLeft: theme.spacing(3),
    width: '80%',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 1),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#00000099',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: '#000000',
  fontSize: '14px',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function Appbar({ top = '0px', toggleDrawer }) {
  const { cartItems } = React.useContext(CartContext);

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Mobile Side Menu */}
      <Drawer
        anchor="left"
        variant="temporary"
        open={mobileOpen}
        onTransitionEnd={handleDrawerTransitionEnd}
        onClose={handleDrawerClose}
        ModalProps={{ keepMounted: true }}
        
        sx={{
             
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            height: '100%',
          },
        }}
      >
        <MobileSideMenu handleDrawerToggle={handleDrawerToggle} />
      </Drawer>

      {/* Main AppBar */}
      <AppBar position="fixed" sx={{ top: { xs: '0px', md: top }, bgcolor: 'white', boxShadow: 1 }}>
        <Toolbar sx={{ flexDirection: { xs: 'column', md: 'row' }, px: 2 }}>
          {/* Left side */}
          <Grid container alignItems="center" sx={{ width: { xs: '100%', md: 'auto' } }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerToggle}
              sx={{ display: { xs: 'block', md: 'none' }, mt: 1 }}
            >
              <MenuIcon sx={{ color: 'black' }} />
            </IconButton>

            <Box display="flex" alignItems="center" sx={{ pl: 2 }}>
              <img
                src="/assets/images/logo.jpg"
                alt="ApexCart logo"
                style={{ height: '30px', width: '30px', marginRight: '8px' }}
              />
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 'bold', color: '#232323' }}
              >
                ApexCart
              </Typography>
            </Box>
          </Grid>

          {/* Center section */}
          <Grid
            container
            alignItems="center"
            justifyContent={{ xs: 'center', md: 'space-between' }}
            sx={{ mt: { xs: 1, md: 0 }, width: '100%' }}
          >
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: { xs: 'center', md: 'flex-start' },
              }}
            >
              <Search>
                <SearchIconWrapper>
                  <SearchIcon color="primary" />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search in Apexcart"
                  inputProps={{ 'aria-label': 'search' }}
                />
              </Search>

              <IconButton onClick={() => toggleDrawer(true)} color="primary">
                <Badge badgeContent={cartItems.length} color="secondary">
                  <ShoppingCartOutlinedIcon />
                </Badge>
              </IconButton>
            </Grid>

            {/* Right side buttons */}
            <Grid
              item
              md={6}
              sx={{
                display: { xs: 'none', md: 'flex' },
                justifyContent: 'flex-end',
                gap: 1,
              }}
            >
              <Button
                variant="contained"
                color="secondary"
                sx={{ borderRadius: '24px', px: 3, fontSize: '12px' }}
              >
                Login
              </Button>
              <Button
                variant="contained"
                color="primary"
                sx={{ borderRadius: '24px', px: 3, fontSize: '12px' }}
              >
                Sign Up
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
