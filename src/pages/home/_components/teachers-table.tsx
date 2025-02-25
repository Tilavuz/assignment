import { AppDispatch, RootState } from "@/app/store";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { changePage, filterTeachersThunk } from "@/features/teacher-slice";
import { teachersFilterStorage } from "@/utils/teachers-filter-storage";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "./pagination";
import TeacherDialog from "./teacher-dialog";
import { useNavigate } from "react-router-dom";
import TeacherTrashDialog from "./teacher-trash-dialog";
import TeacherRegistrationFace from "./teacher-registration-face";

export default function TeachersTable() {
  const { teachers, paginations, query } = useSelector(
    (state: RootState) => state.teachers
  );
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

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
                  <TableRow key={teacher?.id}>
                    <TableCell>{teacher?.id}</TableCell>
                    <TableCell
                      className="text-blue-500 cursor-pointer"
                      onClick={() => navigate(`/teachers/${teacher?.id}`)}
                    >
                      {teacher?.firstName} {teacher?.lastName}
                    </TableCell>
                    <TableCell>{teacher?.phone}</TableCell>
                    <TableCell>{teacher?.pinfl}</TableCell>
                    <TableCell>{teacher?.degree}</TableCell>
                    <TableCell>{teacher?.position}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <TeacherRegistrationFace id={teacher?.id} />
                        <TeacherDialog type="update" teacher={teacher} />
                        <TeacherTrashDialog id={teacher?.id} />
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </div>
      <div>
        {paginations[query]?.totalPages > 0 && (
          <Pagination
            totalPages={paginations[query]?.totalPages}
            currentPage={paginations[query]?.page}
            onPageChange={handlePage}
          />
        )}
      </div>
    </div>
  );
}
