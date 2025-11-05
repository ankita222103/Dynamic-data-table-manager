import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TableRow {
  id: number;
  name: string;
  email: string;
  age: number | string;
  role: string;
  [key: string]: any;
}

export interface TableState {
  rows: TableRow[];
  visibleColumns: string[];
  searchTerm: string;
  sortColumn: string | null;
  sortDirection: 'asc' | 'desc';
  currentPage: number;
   themeMode:'light'|'dark';
}

const initialState: TableState = {
  rows: [
    { id: 1, name: 'John Doe', email: 'john@example.com', age: 25, role: 'Developer' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 30, role: 'Designer' },
  ],
  visibleColumns: ['name', 'email', 'age', 'role'],
  searchTerm: '',
  sortColumn: null,
  sortDirection: 'asc',
  currentPage: 1,
  themeMode:'light',
};

type NewRow = Omit<TableRow, 'id'>;

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      state.currentPage = 1; // reset page when searching
    },

    toggleColumn: (state, action: PayloadAction<string>) => {
      const col = action.payload;
      if (state.visibleColumns.includes(col)) {
        state.visibleColumns = state.visibleColumns.filter((c) => c !== col);
      } else {
        state.visibleColumns.push(col);
      }
    },

    addColumn: (state, action: PayloadAction<string>) => {
      const col = action.payload;
      if (!state.visibleColumns.includes(col)) {
        state.visibleColumns.push(col);
        state.rows = state.rows.map((r) => ({ ...r, [col]: '' }));
      }
    },

    
    setRows: (state, action: PayloadAction<TableRow[]>) => {
  state.rows = action.payload.map((r, i) => ({
    ...r,
    id: i + 1, 
  }));
  state.currentPage = 1;
},
  
    addRow: (state, action: PayloadAction<Partial<TableRow>>) => {
  const newId =
    state.rows.length > 0 ? Math.max(...state.rows.map((r) => r.id)) + 1 : 1;

  const defaultRow: TableRow = {
    id: newId,
    name: '',
    email: '',
    age: 0,
    role: '',
  };

  const newRow = { ...defaultRow, ...action.payload, id: newId };
  state.rows.push(newRow);
},
    
    setSort: (state, action: PayloadAction<string>) => {
      const col = action.payload;
      if (state.sortColumn === col) {
        state.sortDirection = state.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        state.sortColumn = col;
        state.sortDirection = 'asc';
      }
      state.currentPage = 1;
    },

    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    updateRow: (state, action: PayloadAction<TableRow>) => {
  const updatedRow = action.payload;
  state.rows = state.rows.map((row) =>
    row.id === updatedRow.id ? updatedRow : row
  );
},

deleteRow: (state, action: PayloadAction<number>) => {
  state.rows = state.rows.filter((row) => row.id !== action.payload);
},

setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
  state.themeMode = action.payload;
},
reorderColumns: (state, action: PayloadAction<{ fromIndex: number; toIndex: number }>) => {
  const { fromIndex, toIndex } = action.payload;
  const cols = Array.from(state.visibleColumns);
  const [removed] = cols.splice(fromIndex, 1);
  cols.splice(toIndex, 0, removed);
  state.visibleColumns = cols;
},
reorderRows(state, action: PayloadAction<TableRow[]>) {
  state.rows = action.payload;
},
  },
});

export const {
  setSearchTerm,
  toggleColumn,
  addColumn,
  setRows,
  addRow,
  setSort,
  setPage,
  updateRow,
  deleteRow,
  setTheme,
  reorderColumns, 
  reorderRows,
} = tableSlice.actions;

export default tableSlice.reducer;