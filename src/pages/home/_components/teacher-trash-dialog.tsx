import { RootState } from "@/app/store";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteTeacher } from "@/features/teacher-slice";
import { teacherService } from "@/services/teacher.service";
import { AlertDialogCancel } from "@radix-ui/react-alert-dialog";
import { Trash } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

export default function TeacherTrashDialog({ id }: { id: number }) {
  const dispatch = useDispatch();
  const { query } = useSelector((state: RootState) => state.teachers);

  const deleteTeacherData = async (id: number) => {
    try {
      const data = await teacherService.deleteTeacher(id);
      if (data.success) {
        dispatch(deleteTeacher({ query, id }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="cursor-pointer" variant={"destructive"}>
          <Trash />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => deleteTeacherData(id)}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
