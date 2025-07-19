import { Input } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useInsertTodo } from "../api";
import ReusableButton from "../components/ReusableButton";
import "../styles/addPage.css";

function AddPage() {
  const navigate = useNavigate();
  const [todoItem, setTodoItem] = useState<string>("");
  const { mutate: insertTodo } = useInsertTodo();

  const handleAddTodo = () => {
    insertTodo(
      {
        todoItem,
        status: "Pending",
      },
      {
        onSuccess: () => {
          navigate("/");
        },
        onError: (error) => {
          console.error("Error adding todo:", error);
        },
      }
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoItem(e.target.value);
  };

  return (
    <div className="addPage">
      <h1 className="headerTitle">Add Todo Item</h1>
      <Input
        value={todoItem}
        onChange={handleInputChange}
        placeholder="Add todo"
      />
      <br />
      <ReusableButton label="Add Todo" onClickValue={handleAddTodo} />
    </div>
  );
}

export default AddPage;
