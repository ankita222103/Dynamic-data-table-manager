'use client';
import { Provider, useSelector } from 'react-redux';
import { store, persistor } from '../store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { getAppTheme } from '@/styles/theme';
import { RootState } from '@/store/store';
import { createTheme } from '@mui/material/styles';

function InnerProviders({ children }: { children: React.ReactNode }) {
  const themeMode = useSelector((state: RootState) => state.table.themeMode);
  const theme = getAppTheme(themeMode ?? 'light');
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <InnerProviders>{children}</InnerProviders>
      </PersistGate>
    </Provider>
  );
}

export const getAppTheme = (mode: 'light' | 'dark') =>
  createTheme({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            background: { default: '#f9f9f9' },
          }
        : {
            background: { default: '#121212' },
          }),
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
