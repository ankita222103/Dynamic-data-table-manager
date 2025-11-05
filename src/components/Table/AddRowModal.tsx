'use client';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addRow } from '@/features/table/tableSlice';
import { RootState } from '@/store/store';

interface Props { open: boolean; onClose: () => void; }

export default function AddRowModal({ open, onClose }: Props) {
  const dispatch = useDispatch();
  const { visibleColumns } = useSelector((state: RootState) => state.table);
  const editableColumns = visibleColumns.filter((c) => c !== 'id');

  type FormValues = Record<string, any>;
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    // basic conversions
    const formatted = { ...data };
    if (formatted.age !== undefined && formatted.age !== '') formatted.age = Number(formatted.age);
    dispatch(addRow(formatted));
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Row</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ marginTop: 1, width: '320px' }}>
          {editableColumns.map((col) => {
            const isEmail = col.toLowerCase() === 'email';
            const isAge = col.toLowerCase() === 'age';
            return (
              <TextField
                key={col}
                label={col.charAt(0).toUpperCase() + col.slice(1)}
                {...register(col, {
                  required: false,
                  validate: (val) => {
                    if (isEmail && val && !/^\S+@\S+\.\S+$/.test(val)) return 'Invalid email';
                    if (isAge && val && !Number.isInteger(Number(val))) return 'Age must be an integer';
                    return true;
                  },
                })}
                error={!!errors[col]}
                helperText={errors[col]?.message as string | undefined}
                type={isAge ? 'number' : 'text'}
              />
            );
          })}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => { reset(); onClose(); }}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit(onSubmit)}>Add</Button>
      </DialogActions>
    </Dialog>
  );
}