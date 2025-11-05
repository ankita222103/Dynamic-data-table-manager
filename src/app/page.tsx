import TableToolbar from '@/components/Table/TableToolbar';
import DataTable from '@/components/Table/DataTable';

export default function Home() {
  return (
    <main style={{ padding: '20px' }}>
      <h1>Dynamic Data Table Manager</h1>
      <TableToolbar />
      <DataTable />
    </main>
  );
}