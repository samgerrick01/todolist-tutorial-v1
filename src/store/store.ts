// src/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./todosSlice";

export const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
});

// Infer RootState and AppDispatch for usage in components
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
