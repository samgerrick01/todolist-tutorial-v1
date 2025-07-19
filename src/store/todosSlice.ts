// src/store/slices/counterSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { TodoItemsInterface } from "../utils/types";

interface TodoSliceInterface {
  todos: TodoItemsInterface[];
}

const loadTodos = () => {
  try {
    const data = localStorage.getItem("todos");
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("Failed to load todos from localStorage:", e);
    return [];
  }
};

const saveTodos = (todos: any[]) => {
  try {
    localStorage.setItem("todos", JSON.stringify(todos));
  } catch (e) {
    console.error("Failed to save todos to localStorage:", e);
  }
};

const initialState: TodoSliceInterface = {
  todos: loadTodos(),
};

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos = [...state.todos, action.payload];
      saveTodos(state.todos);
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      saveTodos(state.todos);
    },
    updateTodo: (state, action) => {
      state.todos = action.payload;
      saveTodos(state.todos);
    },
  },
});
export const { addTodo, deleteTodo, updateTodo } = todosSlice.actions;
export default todosSlice.reducer;
