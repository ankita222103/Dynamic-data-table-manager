'use client';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { setSearchTerm, setRows } from '@/features/table/tableSlice';
import { Box, Button, TextField, Snackbar, Alert,Toolbar,Typography } from '@mui/material';
import { useState } from 'react';
import ManageColumnsModal from './ManageColumnsModal';
import AddRowModal from './AddRowModal';
import { importCSV, exportCSV } from '@/utils/csvUtils';
import ThemeToggle from '@/components/Shared/ThemeToggle'

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
      // reset input
      event.currentTarget.value = '';
    }
  };

  const handleExport = () => exportCSV(rows, visibleColumns);

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2, flexWrap: 'wrap', gap: 1 }}>
        <TextField label="Search" variant="outlined" size="small" value={searchTerm} onChange={(e) => dispatch(setSearchTerm(e.target.value))} sx={{ width: 300 }} />
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant="contained" color="primary" onClick={() => setOpenAdd(true)}>Add Row</Button>
          <Button variant="outlined" component="label">Import CSV<input type="file" accept=".csv" hidden onChange={handleImport} /></Button>
          <Button variant="outlined" onClick={handleExport}>Export CSV</Button>
          <Button variant="contained" onClick={() => setOpenManage(true)}>Manage Columns</Button>
        </Box>
      </Box>
      <Toolbar>
  <Typography variant="h6" sx={{ flexGrow: 1 }}>
    Dynamic Table
  </Typography>

  <ThemeToggle />

  
</Toolbar>

      <ManageColumnsModal open={openManage} onClose={() => setOpenManage(false)} />
      <AddRowModal open={openAdd} onClose={() => setOpenAdd(false)} />

      <Snackbar open={!!errorMsg} autoHideDuration={6000} onClose={() => setErrorMsg(null)}>
        <Alert onClose={() => setErrorMsg(null)} severity="error" sx={{ width: '100%' }}>{errorMsg}</Alert>
      </Snackbar>
    </>
  );
}