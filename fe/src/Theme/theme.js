import { createTheme } from '@mui/material/styles';

const appTheme = createTheme({
  cssVariables: true,
  typography: {
    fontFamily: '"Noto Sans", sans-serif',
  },
  palette: {
    primary: {
      main: '#44776d',
      dark: '#44776d',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ea4b2d',
      contrastText: '#ffffff',
    },
  },
  components: {
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
  },
});

export default appTheme;
