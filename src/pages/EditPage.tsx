import type { RootState } from "../store/store.ts";
import { Button, Input, Select, Space } from "antd";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { updateTodo } from "../store/todosSlice";
import type { TodoItemsInterface } from "../utils/types.ts";

function EditPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const todos = useSelector((state: RootState) => state.todos.todos);
  const [todo, setTodo] = useState<TodoItemsInterface | null>(null);

  useEffect(() => {
    const found = todos.find((item) => item.id === Number(id));
    if (found) setTodo(found);
  }, [id, todos]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo((prev) => (prev ? { ...prev, todoItem: e.target.value } : prev));
  };

  const handleStatusChange = (value: string) => {
    setTodo((prev) => (prev ? { ...prev, status: value } : prev));
  };

  const handleUpdateTodo = () => {
    if (!todo) return;
    dispatch(
      updateTodo(todos.map((item) => (item.id === todo.id ? todo : item)))
    );
    // navigate("/");
  };

  if (!todo) return <div>Loading...</div>;

  return (
    <div className="addPage">
      <h1 className="headerTitle">Edit Todo Item</h1>

      <Input
        value={todo.todoItem}
        onChange={handleInputChange}
        placeholder="Update Todo Item"
      />
      <br />

      <Space wrap>
        <Select
          value={todo.status}
          style={{ width: 120 }}
          onChange={handleStatusChange}
          options={[
            { value: "pending", label: "Pending" },
            { value: "inprogress", label: "InProgress" },
            { value: "complete", label: "Complete" },
          ]}
        />
      </Space>

      <br />
      <Button onClick={handleUpdateTodo} type="primary">
        Update
      </Button>
    </div>
  );
}

export default EditPage;
