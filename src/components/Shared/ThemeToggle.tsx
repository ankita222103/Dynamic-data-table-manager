'use client';
import { IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { setTheme } from '@/features/table/tableSlice';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

export default function ThemeToggle() {
  const dispatch = useDispatch();
  const themeMode = useSelector((state: RootState) => state.table.themeMode);
  const toggle = () => dispatch(setTheme(themeMode === 'light' ? 'dark' : 'light'));
  return (
    <IconButton onClick={toggle}>
      {themeMode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
    </IconButton>
  );
}