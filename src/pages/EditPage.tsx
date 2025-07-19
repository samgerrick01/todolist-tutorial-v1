import type { RootState } from "../store/store.ts";
import { Button, Input } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { useDispatch } from "react-redux";
import { updateTodo } from "../store/todosSlice";

function EditPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [todoItem, setTodoItem] = useState<string>("");
  const todos = useSelector((state: RootState) => state.todos.todos);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoItem(e.target.value);
  };

  const getToto = () => {
    todos.forEach((todo) => {
      if (todo.id === Number(id)) {
        setTodoItem(todo.todoItem);
      }
    });
  };

  useEffect(() => {
    getToto();
  }, []);

  const handleUpdateTodo = () => {
    const updatedTodo = {
      id: Number(id),
      todoItem: todoItem,
      status: "Pending",
    };
    const updatedTodos = todos.map((todo) =>
      todo.id === Number(id) ? updatedTodo : todo
    );
    dispatch(updateTodo(updatedTodos));
    setTodoItem("");
    navigate("/");
  };

  return (
    <div className="addPage">
      <h1 className="headerTitle">Edit Todo Item</h1>

      <Input
        value={todoItem}
        onChange={handleInputChange}
        placeholder="Update Todo Item"
      />
      <br />
      <Button onClick={handleUpdateTodo} type="primary">
        Update
      </Button>
    </div>
  );
}

export default EditPage;
