import Papa from 'papaparse';
import { saveAs } from 'file-saver';
import { TableRow } from '@/features/table/tableSlice';

// importCsv now reports errors via callbacks with details
export const importCSV = (
  file: File,
  onSuccess: (data: TableRow[]) => void,
  onError: (msg: string) => void
) => {
  Papa.parse(file, {
    header: true,
    skipEmptyLines: true,
    dynamicTyping: false,
    complete: (results) => {
      if (results.errors && results.errors.length) {
        // create a helpful message
        const msgs = results.errors.map((e) => 'Row ${e.row}: ${e.message}').slice(0, 5);
        onError('CSV parse error: ${msgs.join(";")}');
        return;
      }

      const parsed = results.data as any[];
      // Basic validation: ensure entries are objects and at least have name/email OR one column
      if (!parsed.length) {
        onError('CSV is empty or header row missing.');
        return;
      }
      // Normalize rows: keep as-is; caller will normalize ids
      try {
        onSuccess(parsed as TableRow[]);
      } catch (e) {
        onError('Failed to parse CSV data.');
      }
    },
    error: (err) => {
      onError('Failed to read file: ${err?.message ?? "unknown error"}');
    },
  });
};

export const exportCSV = (rows: TableRow[], visibleColumns: string[]) => {
  const filteredRows = rows.map((row) => {
    const newObj: any = {};
    visibleColumns.forEach((col) => (newObj[col] = row[col]));
    return newObj;
  });
  const csv = Papa.unparse(filteredRows);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, 'table-data.csv');
};