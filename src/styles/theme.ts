import { createTheme } from '@mui/material/styles';

export const getAppTheme = (mode: 'light' | 'dark') =>
  createTheme({
    palette: {
      mode,
      ...(mode === 'light'
        ? { background: { default: '#f9f9f9' } }
        : { background: { default: '#121212' } }),
    },
    typography: {
      fontSize: 14,
      h4: {
        fontSize: '1.5rem',
        '@media (max-width:600px)': { fontSize: '1.2rem' },
      },
      body1: {
        fontSize: '0.95rem',
        '@media (max-width:600px)': { fontSize: '0.8rem' },
      },
    },
    components: {
      MuiContainer: {
        styleOverrides: {
          root: {
            paddingLeft: '8px',
            paddingRight: '8px',
            '@media (min-width:600px)': {
              paddingLeft: '24px',
              paddingRight: '24px',
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontSize: '0.9rem',
            '@media (max-width:600px)': { width: '100%' },
          },
        },
      },
      MuiTableContainer: {
        styleOverrides: {
          root: {
            width: '100%',
            overflowX: 'auto',
          },
        },
      },
      MuiTable: {
        styleOverrides: {
          root: {
            minWidth: 600,
            tableLayout: 'auto',
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            whiteSpace: 'nowrap',
            padding: '8px 12px',
            '@media (max-width:600px)': {
              padding: '4px 8px',
              fontSize: '0.75rem',
            },
          },
        },
      },
      MuiStack: {
        styleOverrides: {
          root: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: '8px',
            '@media (max-width:600px)': {
              flexDirection: 'column',
            },
          },
        },
      },
    },
  });
