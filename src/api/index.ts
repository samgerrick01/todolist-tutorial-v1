import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../utils/supabaseClient";
import type { TodoItemsInterface } from "../utils/types";

export const useFetchTodos = () => {
  return useQuery<TodoItemsInterface[]>({
    queryKey: ["todos"],
    queryFn: async () => {
      const { data, error } = await supabase.from("tbl_todos").select("*");

      if (error) {
        console.error("[Supabase] Error fetching statuses:", error);
        throw new Error(error.message);
      }

      if (!data) {
        throw new Error("No data returned from Supabase.");
      }

      const sorted = data.sort((a, b) => Number(a.id) - Number(b.id));

      return sorted;
    },
  });
};

export const useInsertTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (todo: Omit<TodoItemsInterface, "id">) => {
      const newTodo = {
        todoItem: todo.todoItem,
        status: todo.status,
      };

      const { data, error } = await supabase
        .from("tbl_todos")
        .insert(newTodo)
        .select("*")
        .single();

      if (error) {
        console.error("[Supabase] Error inserting todo:", error);
        throw new Error(error.message);
      }
      if (!data) {
        throw new Error("No data returned from Supabase.");
      }
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (todo: TodoItemsInterface) => {
      const updatedTodo = {
        todoItem: todo.todoItem,
        status: todo.status,
      };

      const { data, error } = await supabase
        .from("tbl_todos")
        .update(updatedTodo)
        .eq("id", todo.id)
        .select("*")
        .single();

      if (error) {
        console.error("[Supabase] Error inserting todo:", error);
        throw new Error(error.message);
      }
      if (!data) {
        throw new Error("No data returned from Supabase.");
      }
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const { error } = await supabase.from("tbl_todos").delete().eq("id", id);
      if (error) {
        console.error("[Supabase] Error deleting todo:", error);
        throw new Error(error.message);
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });
};
