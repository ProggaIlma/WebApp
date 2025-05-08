'use client';
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import { Box, Button } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import LoginIcon from '@mui/icons-material/Login';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import MoreIcon from '@mui/icons-material/MoreVert';
import { useContext } from 'react';
import { CartContext } from '@/shared/CartContext/CartCtx';
import MenuIcon from '@mui/icons-material/Menu';
import { Grid2 } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import MobileSideMenu from './MobileSideMenu';
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
  borderRadius: '15px',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  color: '#00000099',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: '#000000',
  fontSize: '14px',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),

    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function Appbar({ top, toggleDrawer }) {
  const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal } = useContext(CartContext);

  const [anchorEl, setAnchorEl] = React.useState(null);
  ///////////Drawer///////////

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
  const drawerWidth = 400;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Drawer
        anchor={'left'}
        variant="temporary"
        open={mobileOpen}
        onTransitionEnd={handleDrawerTransitionEnd}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, height: '100%' },
        }}
      >
        <MobileSideMenu handleDrawerToggle={handleDrawerToggle} />
      </Drawer>
      <AppBar position="fixed" sx={{ top: { sm: '0px', md: top } }}>
        <Toolbar className="w-full bg-white flex flex-col md:flex-row pl-0">
          <Grid2 className="flex flex-start" sx={{ width: { xs: '90%', md: 'max-content' } }}>
            <MenuIcon className="p-3 mt-2" sx={{ color: 'black', display: { xs: 'block', md: 'none' } }} onClick={() => handleDrawerToggle(true)} />

            <Typography
              noWrap
              className="flex pt-3 pl-3 pb-3 flex-col 
           items-center text-xs ml-1 font-bold"
              component="div"
              sx={{ color: '#232323', width: { xs: '100%', md: 'max-content' }, paddingRight: { xs: '30px', md: '15px' } }}
            >
              <img src="/images/logo.jpg" style={{ height: '30px', width: '30px' }} />
              ApexCart
            </Typography>
          </Grid2>
          <Grid2 className="flex w-full items-center pb-3" sx={{ justifyContent: { xs: 'center', md: 'space-between' } }}>
            <Grid2 className="w-full flex flex-row items-center" sx={{ justifyContent: { xs: 'center', md: 'flex-start' } }}>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon color="primary" />
                </SearchIconWrapper>
                <StyledInputBase placeholder="Search in Apexcart" inputProps={{ 'aria-label': 'search' }} />
              </Search>

              <Badge badgeContent={cartItems.length} color="secondary">
                <ShoppingCartOutlinedIcon
                  color="primary"
                  onClick={() => {
                    toggleDrawer(true);
                  }}
                />
              </Badge>
            </Grid2>
            <Grid2 sx={{ display: { md: 'flex', xs: 'none' },width:"40%" }} className='flex-row justify-end'>
              <Button className="bg_secondary_color rounded-3xl text-white mr-2 px-5 py-2 text-xs">Login</Button>
              <Button className="bg_primary_color rounded-3xl text-white mr-2 px-5 text-xs py-2">Sign Up</Button>
            </Grid2>
          </Grid2>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
