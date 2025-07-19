import { Input, Select, Space } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { useUpdateTodo } from "../api/index.ts";
import ReusableButton from "../components/ReusableButton.tsx";
import type { RootState } from "../store/store.ts";
import type { TodoItemsInterface } from "../utils/types.ts";
//This is Edit Page Component
function EditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const todos = useSelector((state: RootState) => state.todos.todos);
  const [todo, setTodo] = useState<TodoItemsInterface | null>(null);

  const { mutate: updateTodo } = useUpdateTodo();

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
    updateTodo(todo, {
      onSuccess: () => {
        navigate("/");
      },
      onError: (error) => {
        console.error("Error updating todo:", error);
      },
    });
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
            { value: "Pending", label: "Pending" },
            { value: "InProgress", label: "InProgress" },
            { value: "Complete", label: "Complete" },
          ]}
        />
      </Space>

      <br />
      <ReusableButton label="Update Todo" onClickValue={handleUpdateTodo} />
    </div>
  );
}

export default EditPage;
