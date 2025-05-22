import React, { useEffect, useState } from 'react';
import TopAppbar from '../../components/TopAppbar';
import Appbar from '../../components/Appbar';
import Footer from '../../components/Footer';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import DrawerBody from '../../components/Cart';
import { Outlet } from 'react-router-dom';

export default function HomeLayout() {
  const [top, setTop] = useState('0px');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const drawerWidth = 400;

  // useEffect(() => {
  //   let lastScrollTop = 0;
  //   const handleScroll = () => {
  //     const currentScrollTop = window.pageYOffset;
  //     setTop(currentScrollTop < lastScrollTop ? '25px' : '0px');
  //     lastScrollTop = Math.max(currentScrollTop, 0);
  //   };

  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);

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
    <>
      <Appbar top={top} toggleDrawer={handleDrawerToggle} />
      <TopAppbar />

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }}}
        aria-label="drawer navigation"
      >
        <Drawer
          anchor="right"
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerClose}
          onTransitionEnd={handleDrawerTransitionEnd}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              height: '100%',
            },
          }}
        >
          <DrawerBody handleDrawerToggle={handleDrawerToggle} />
        </Drawer>
      </Box>

      <Outlet />

      <Footer />
    </>
  );
}
