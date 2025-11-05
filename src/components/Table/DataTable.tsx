'use client';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from '@hello-pangea/dnd';
import { reorderRows } from '@/features/table/tableSlice';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  TableSortLabel,
  TablePagination,
  TextField,
  Box,
  Button,
} from '@mui/material';
import {
  setSort,
  setPage,
  updateRow,
  deleteRow,
  reorderColumns,
} from '@/features/table/tableSlice';
import { useState, useCallback } from 'react';
import RowActions from '@/components/Table/RowActions';

export default function DataTable() {
  const dispatch = useDispatch();
  const {
    rows,
    visibleColumns,
    searchTerm,
    sortColumn,
    sortDirection,
    currentPage,
  } = useSelector((state: RootState) => state.table);

  const [editRowId, setEditRowId] = useState<number | null>(null);
  const [editValues, setEditValues] = useState<Record<string, any>>({});
  const [batchEdits, setBatchEdits] = useState<
    Record<number, Record<string, any>>
  >({});


  const filteredRows = rows.filter((row) =>
    Object.values(row).some((value) =>
      (value ?? '').toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );


  const sortedRows = [...filteredRows].sort((a, b) => {
    if (!sortColumn) return 0;
    const valA = a[sortColumn];
    const valB = b[sortColumn];
    if (valA === valB) return 0;
    if (sortDirection === 'asc') return valA > valB ? 1 : -1;
    return valA < valB ? 1 : -1;
  });

  
  const rowsPerPage = 10;
  const paginatedRows = sortedRows.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  
  const startEditRow = (row: any) => {
    setEditRowId(row.id);
    setEditValues({ ...row });
  };

  const onCellDoubleClick = (row: any) => startEditRow(row);

  const handleChange = (col: string, value: any) => {
    if (editRowId !== null) {
      setEditValues((p) => ({ ...p, [col]: value }));
      setBatchEdits((p) => ({
        ...p,
        [editRowId]: { ...p[editRowId], [col]: value },
      }));
    }
  };

 const handleSaveOne = (id: number) => {
  const updated = editValues;

  if (
    updated.email &&
    !/^\S+@\S+\.\S+$/.test(updated.email.toString().trim())
  ) {
    alert('Please enter a valid email address');
    return;
  }

  
  if (
    updated.age !== undefined &&
    updated.age !== '' &&
    Number.isNaN(Number(updated.age))
  ) {
    alert('Age must be a number');
    return;
  }

  const currentRow = rows.find((row) => row.id === id);
  if (!currentRow) return;

  const updatedRow = { ...currentRow, ...updated, id };

  dispatch(updateRow(updatedRow));
  setEditRowId(null);
  setEditValues({});
  setBatchEdits((p) => {
    const copy = { ...p };
    delete copy[id];
    return copy;
  });
};

  const handleCancelOne = () => {
    setEditRowId(null);
    setEditValues({});
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this row?')) {
      dispatch(deleteRow(id));
    }
  };

  const handleSaveAll = () => {
    Object.entries(batchEdits).forEach(([idStr, values]) => {
      const id = Number(idStr);
      if (
        values.email &&
        !/^\S+@\S+\.\S+$/.test(values.email.toString().trim())
      ) {
        alert('Row ${id}: invalid email');
        return;
      }
      if (
        values.age !== undefined &&
        values.age !== '' &&
        Number.isNaN(Number(values.age))
      ) {
        alert('Row ${id}: age must be a number');
        return;
      }
      const base = rows.find((r) => r.id === id);
if (!base) return; 

const updatedRow = { ...base, ...values, id };
dispatch(updateRow(updatedRow));
    });
    setBatchEdits({});
    setEditRowId(null);
    setEditValues({});
  };

  const handleCancelAll = () => {
    setBatchEdits({});
    setEditRowId(null);
    setEditValues({});
  };
  const handleDragEnd = (result: DropResult) => {
  if (!result.destination) return;

  const newRows = Array.from(rows);
  const [moved] = newRows.splice(result.source.index, 1);
  newRows.splice(result.destination.index, 0, moved);

  dispatch(reorderRows(newRows));
};

  
  const onDragEnd = useCallback(
    (result: DropResult) => {
      if (!result.destination) return;
      const fromIndex = result.source.index;
      const toIndex = result.destination.index;
      dispatch(reorderColumns({ fromIndex, toIndex }));
    },
    [dispatch]
  );

  return (
    <TableContainer component={Paper}>
      
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, p: 1 }}>
        <Button
          disabled={!Object.keys(batchEdits).length}
          onClick={handleSaveAll}
          variant="contained"
          color="success"
        >
          Save All
        </Button>
        <Button
          disabled={!Object.keys(batchEdits).length}
          onClick={handleCancelAll}
          variant="outlined"
          color="inherit"
        >
          Cancel All
        </Button>
      </Box>

      <Table>
        
        <TableHead>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="columns" direction="horizontal">
              {(provided) => (
                <TableRow ref={provided.innerRef} {...provided.droppableProps}>
                  {visibleColumns.map((col, index) => (
                    <Draggable draggableId={col} index={index} key={col}>
                      {(providedDr) => (
                        <TableCell
                          ref={providedDr.innerRef}
                          {...providedDr.draggableProps}
                          {...providedDr.dragHandleProps}
                          key={col}
                        >
                          <TableSortLabel
                            active={sortColumn === col}
                            direction={sortDirection}
                            onClick={() => dispatch(setSort(col))}
                          >
                            {col.toUpperCase()}
                          </TableSortLabel>
                        </TableCell>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                  <TableCell>ACTIONS</TableCell>
                </TableRow>
              )}
            </Droppable>
          </DragDropContext>
        </TableHead>

        {/* Table Body */}
        <DragDropContext onDragEnd={handleDragEnd}>
  <Droppable droppableId="rows">
    {(provided) => (
      <TableBody ref={provided.innerRef} {...provided.droppableProps}>
        {paginatedRows.map((row, index) => (
          <Draggable key={row.id} draggableId={String(row.id)} index={index}>
            {(provided) => (
              <TableRow
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                sx={{ cursor: 'grab' }}
              >
                {visibleColumns.map((col) => (
                  <TableCell
                    key={col}
                    onDoubleClick={() => onCellDoubleClick(row)}
                  >
                    {editRowId === row.id ? (
                      <TextField
                        value={editValues[col] ?? ''}
                        onChange={(e) => handleChange(col, e.target.value)}
                        size="small"
                        type={col === 'age' ? 'number' : 'text'}
                      />
                    ) : (
                      row[col]
                    )}
                  </TableCell>
                ))}

                <TableCell>
                  <RowActions
                    isEditing={editRowId === row.id}
                    onEdit={() => startEditRow(row)}
                    onSave={() => handleSaveOne(row.id)}
                    onCancel={handleCancelOne}
                    onDelete={() => handleDelete(row.id)}
                  />
                </TableCell>
              </TableRow>
            )}
          </Draggable>
        ))}
        {provided.placeholder}
      </TableBody>
    )}
  </Droppable>
</DragDropContext>
      </Table>

      {/* Pagination */}
      <TablePagination
        component="div"
        count={sortedRows.length}
        page={currentPage - 1}
        onPageChange={(_, newPage) => dispatch(setPage(newPage + 1))}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[10]}
      />
    </TableContainer>
  );
}