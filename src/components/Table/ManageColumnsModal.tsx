'use client';
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  TextField,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useState } from 'react';
import { toggleColumn, addColumn } from '@/features/table/tableSlice';

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function ManageColumnsModal({ open, onClose }: Props) {
  const dispatch = useDispatch();
  const { visibleColumns } = useSelector((state: RootState) => state.table);
  const [newColumn, setNewColumn] = useState('');

  const defaultColumns = ['name', 'email', 'age', 'role'];

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Manage Columns</DialogTitle>
      <DialogContent>
        {defaultColumns.map((col) => (
          <FormControlLabel
            key={col}
            control={
              <Checkbox
                checked={visibleColumns.includes(col)}
                onChange={() => dispatch(toggleColumn(col))}
              />
            }
            label={col.toUpperCase()}
          />
        ))}

        <Box sx={{ marginTop: 2 }}>
          <TextField
            label="Add New Column"
            fullWidth
            size="small"
            value={newColumn}
            onChange={(e) => setNewColumn(e.target.value)}
          />
          <Button
            sx={{ marginTop: 1 }}
            variant="outlined"
            onClick={() => {
              if (newColumn.trim()) {
                dispatch(addColumn(newColumn.trim().toLowerCase()));
                setNewColumn('');
              }
            }}
          >
            Add Column
          </Button>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}