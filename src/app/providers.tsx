'use client';
import { Provider, useSelector } from 'react-redux';
import { store, persistor } from '../store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { getAppTheme } from '@/styles/theme';
import { RootState } from '@/store/store';

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