'use client';
import { ThemeProvider } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { getAppTheme } from '@/styles/theme';

export default function AppThemeProvider({ children }: { children: React.ReactNode }) {
  const mode = useSelector((state: RootState) => state.table.themeMode);

  const theme = getAppTheme(mode);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}