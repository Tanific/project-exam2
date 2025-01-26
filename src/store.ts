import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice";
import { holidazeApi } from "./api/holidaze";

export const store = configureStore({
  reducer: {
    [holidazeApi.reducerPath]: holidazeApi.reducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(holidazeApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
