'use client';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { setSearchTerm, setRows } from '@/features/table/tableSlice';
import {
  Box,
  Button,
  TextField,
  Snackbar,
  Alert,
  Toolbar,
  Typography,
  Stack,
} from '@mui/material';
import { useState } from 'react';
import ManageColumnsModal from './ManageColumnsModal';
import AddRowModal from './AddRowModal';
import { importCSV, exportCSV } from '@/utils/csvUtils';
import ThemeToggle from '@/components/Shared/ThemeToggle';

export default function TableToolbar() {
  const dispatch = useDispatch();
  const { rows, visibleColumns, searchTerm } = useSelector((state: RootState) => state.table);
  const [openManage, setOpenManage] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      importCSV(
        file,
        (data) => dispatch(setRows(data)),
        (msg) => setErrorMsg(msg)
      );
      event.currentTarget.value = '';
    }
  };

  const handleExport = () => exportCSV(rows, visibleColumns);

  return (
    <>
      {/*  Responsive Toolbar */}
      <Box sx={{ mb: 2 }}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={1.5}
          alignItems={{ xs: 'stretch', sm: 'center' }}
          justifyContent="space-between"
          flexWrap="wrap"
        >
          {/*  Search */}
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => dispatch(setSearchTerm(e.target.value))}
            sx={{ width: { xs: '100%', sm: 300 } }}
          />

          {/*  Buttons Stack */}
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1}
            alignItems={{ xs: 'stretch', sm: 'center' }}
            sx={{ width: { xs: '100%', sm: 'auto' } }}
          >
            <Button variant="contained" color="primary" onClick={() => setOpenAdd(true)}>
              Add Row
            </Button>

            <Button variant="outlined" component="label">
              Import CSV
              <input type="file" accept=".csv" hidden onChange={handleImport} />
            </Button>

            <Button variant="outlined" onClick={handleExport}>
              Export CSV
            </Button>

            <Button variant="contained" onClick={() => setOpenManage(true)}>
              Manage Columns
            </Button>
          </Stack>
        </Stack>
      </Box>

      {/* Header Toolbar with Theme Toggle */}
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Dynamic Table
        </Typography>
        <ThemeToggle />
      </Toolbar>

      {/* Modals */}
      <ManageColumnsModal open={openManage} onClose={() => setOpenManage(false)} />
      <AddRowModal open={openAdd} onClose={() => setOpenAdd(false)} />

      {/* Error Snackbar */}
      <Snackbar
        open={!!errorMsg}
        autoHideDuration={6000}
        onClose={() => setErrorMsg(null)}
      >
        <Alert
          onClose={() => setErrorMsg(null)}
          severity="error"
          sx={{ width: '100%' }}
        >
          {errorMsg}
        </Alert>
      </Snackbar>
    </>
  );
}
