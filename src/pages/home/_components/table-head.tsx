import FilterSheet from "./filter-sheet";
import TeacherDialog from "./teacher-dialog";

export default function TableHead() {
  return (
    <div className="flex items-center justify-end gap-4 p-4 rounded border mb-4">
      <FilterSheet />
      <TeacherDialog type="create" />
    </div>
  );
}
