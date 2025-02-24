import { AppDispatch, RootState } from "@/app/store";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  changePage,
  deleteTeacher,
  filterTeachersThunk,
} from "@/features/teacher-slice";
import { teachersFilterStorage } from "@/utils/teachers-filter-storage";
import { Trash } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "./pagination";

import { Button } from "@/components/ui/button";
import TeacherDialog from "./teacher-dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { teacherService } from "@/services/teacher.service";

export default function TeachersTable() {
  const { teachers, paginations, query } = useSelector(
    (state: RootState) => state.teachers
  );
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const query: {
      page: number;
      size: number;
      id?: number;
      phone?: string;
      firstName?: string;
      lastName?: string;
      pinfl?: string;
      keyword?: string;
    } = teachersFilterStorage.getQuery();

    const stringQuery = teachersFilterStorage.stringQuery({
      ...query,
      page: query?.page ?? 0,
      size: query?.size ?? 10,
    });

    if (!teachers[stringQuery]) {
      dispatch(
        filterTeachersThunk({
          ...query,
          page: query?.page ?? 0,
          size: query?.size ?? 10,
        })
      );
    }
  }, [dispatch]);

  const handlePage = async (page: number) => {
    try {
      const storageQuery = teachersFilterStorage.getQuery();
      const query = {
        ...storageQuery,
        page,
        size: 10,
      };
      const stringQuery = teachersFilterStorage.stringQuery(query);
      if (!teachers[stringQuery]) {
        dispatch(filterTeachersThunk(query));
      } else {
        dispatch(changePage({ page, query: stringQuery }));
        teachersFilterStorage.setQuery({ query });
      }
    } catch (error) {
      console.error(error);
    }
  };

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
    <div>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Teacher Id</TableHead>
              <TableHead>Full name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Pinfl</TableHead>
              <TableHead>Degree</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teachers &&
              teachers[query]?.map((teacher) => {
                return (
                  <TableRow key={teacher.id}>
                    <TableCell>{teacher?.id}</TableCell>
                    <TableCell>
                      {teacher?.firstName} {teacher?.lastName}
                    </TableCell>
                    <TableCell>{teacher?.phone}</TableCell>
                    <TableCell>{teacher?.pinfl}</TableCell>
                    <TableCell>{teacher?.degree}</TableCell>
                    <TableCell>{teacher?.position}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <TeacherDialog type="update" teacher={teacher} />
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              className="cursor-pointer"
                              variant={"destructive"}
                            >
                              <Trash />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Are you absolutely sure?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will
                                permanently delete your account and remove your
                                data from our servers.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => deleteTeacherData(teacher.id)}
                              >
                                Continue
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </div>
      <div>
        <Pagination
          totalPages={paginations[query]?.totalPages}
          currentPage={paginations[query]?.page}
          onPageChange={handlePage}
        />
      </div>
    </div>
  );
}
