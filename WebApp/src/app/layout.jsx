"use client";

import React, { useEffect } from 'react';
import TopAppbar from '@/components/TopAppbar';
import AppBar from '@mui/material/AppBar';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import "./globals.css";
import {Slide,Divider} from '@mui/material';
import Appbar from '@/components/Appbar';
import Footer from '@/components/Footer';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/theme';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import DrawerBody from '@/components/Cart';
import { CartProvider } from '@/shared/CartContext/CartCtx';


export default function RootLayout(props) {
  const { children } = props;

  const [top, settop] = React.useState('25px')

  useEffect(() => {
    let lastScrollTop = 0;
    const handleScroll = () => {
      const currentScrollTop = window.pageYOffset;
       if(currentScrollTop < lastScrollTop) settop('25px')
         else settop('0px');
      lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop; 
    };
 
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



  function HideOnScroll(props) {

    const { children, window } = props;

    let trigger = useScrollTrigger({
      target: window ? window() : undefined,
    });

    return (

      <Slide appear={false} direction="down" in={!trigger}>
        {children ?? <div />}
      </Slide>
    );
  }
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
    <html lang="en">
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
          <CartProvider>
          <Appbar top={'0px'} toggleDrawer={handleDrawerToggle}/>
           
         
                <TopAppbar />
           
          
            <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          anchor={'right'}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          
          sx={{
            display: { xs: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth,height:"100%" },
          }}
        >
         <DrawerBody handleDrawerToggle={handleDrawerToggle}/>
        </Drawer>
       
            </Box>
            {children}
            </CartProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
        <Footer></Footer>
      </body>


    </html>

  );
}
