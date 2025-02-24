import { ITeacher } from "@/interfaces/teacher-interface";
import { teacherService } from "@/services/teacher.service";
import { teachersFilterStorage } from "@/utils/teachers-filter-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface TeacherState {
  teachers: {
    [key: string]: ITeacher[];
  };
  paginations: {
    [key: string]: {
      page: number;
      totalPages: number;
      totalTeachers: number;
    };
  };
  loading: boolean;
  query: string;
}

export const filterTeachersThunk = createAsyncThunk(
  "filter/teachers",
  async ({
    page,
    size,
    id,
    phone,
    firstName,
    lastName,
    pinfl,
    keyword,
  }: {
    page: number;
    size: number;
    id?: number;
    phone?: string;
    firstName?: string;
    lastName?: string;
    pinfl?: string;
    keyword?: string;
  }) => {
    const data = await teacherService.filterTeacher({
      page,
      size,
      id,
      phone,
      firstName,
      lastName,
      pinfl,
      keyword,
    });
    const query = {
      page,
      size,
      id,
      phone,
      firstName,
      lastName,
      pinfl,
      keyword,
    };
    teachersFilterStorage.setQuery({ query });
    return {
      teachers: data.content,
      query: teachersFilterStorage.stringQuery(query),
      pagination: {
        page: data.paging.currentPage,
        totalPages: data.paging.totalPages,
        totalTeachers: data.paging.totalItems,
      },
    };
  }
);

const initialState: TeacherState = {
  teachers: {},
  loading: false,
  paginations: {},
  query: "",
};

const teacherSlice = createSlice({
  name: "teachers",
  initialState,
  reducers: {
    changePage: (
      state,
      action: PayloadAction<{ page: number; query: string }>
    ) => {
      state.paginations[action.payload.query] = {
        ...state.paginations[action.payload.query],
        page: action.payload.page,
      };
      state.query = action.payload.query;
    },
    changeQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    deleteTeacher: (
      state,
      action: PayloadAction<{ id: number; query: string }>
    ) => {
      state.teachers[action.payload.query] = state.teachers[
        action.payload.query
      ].filter((teacher) => teacher?.id !== action.payload?.id);
    },
    addTeacher: (
      state,
      action: PayloadAction<{ query: string; teacher: ITeacher }>
    ) => {
      state.teachers[action.payload.query] = [
        action.payload.teacher,
        ...state.teachers[action.payload.query],
      ];
    },
    changeTeacher: (
      state,
      action: PayloadAction<{ teacher: ITeacher; query: string }>
    ) => {
      state.teachers[action.payload.query] = state.teachers[
        action.payload.query
      ].map((teacher) =>
        teacher?.id === action.payload.teacher?.id
          ? action.payload.teacher
          : teacher
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(filterTeachersThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        filterTeachersThunk.fulfilled,
        (
          state,
          action: PayloadAction<{
            teachers: ITeacher[];
            query: string;
            pagination: {
              page: number;
              totalPages: number;
              totalTeachers: number;
            };
          }>
        ) => {
          state.teachers[action.payload.query] = action.payload.teachers;
          state.paginations[action.payload.query] = action.payload.pagination;
          state.query = action.payload.query;
          state.loading = false;
        }
      );
  },
});

export const {
  changePage,
  deleteTeacher,
  changeQuery,
  addTeacher,
  changeTeacher,
} = teacherSlice.actions;
export default teacherSlice.reducer;
