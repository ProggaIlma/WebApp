'use client';
import { Noto_Sans } from 'next/font/google';
import { createTheme } from '@mui/material/styles';
import { indigo, pink } from '@mui/material/colors';

const roboto = Noto_Sans({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});


const theme = createTheme({
    cssVariables: true,
  typography: {
    fontFamily: roboto.style.fontFamily,
  }, 
  palette: {
    primary: {
      main: '#44776d',
      // light: will be calculated from palette.primary.main,
       dark: '#44776d',
      contrastText: '#ffffff',    },
    secondary: {
      main: '#ea4b2d',
      
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#ffffff',
    }
  },
  MuiButtonBase: {
    defaultProps: {
        disableRipple: true,
    },
},
MuiButtonGroup: {
    defaultProps: {
        disableRipple: true,
    },
},
  
});

export default theme;
