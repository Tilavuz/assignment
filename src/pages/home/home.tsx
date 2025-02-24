import TableHead from "./_components/table-head";
import TeachersTable from "./_components/teachers-table";

export default function Home() {
  return (
    <div>
      <div>
        <TableHead />
        <TeachersTable />
      </div>
    </div>
  );
}
