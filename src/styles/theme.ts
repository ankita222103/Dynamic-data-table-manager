import { createTheme } from '@mui/material/styles';

export const getAppTheme = (mode: 'light' | 'dark') =>
  createTheme({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            background: { default: '#f7f7f7' },
          }
        : {
            background: { default: '#121212' },
          }),
    },
    components: {
      MuiButton: { defaultProps: { disableElevation: true } },
    },
  });