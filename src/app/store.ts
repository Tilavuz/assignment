import { configureStore } from "@reduxjs/toolkit";
import teachersReducer from "@/features/teacher-slice";

export const store = configureStore({
  reducer: {
    teachers: teachersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
