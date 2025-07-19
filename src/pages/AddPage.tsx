import { Button, Input } from "antd";
import "../styles/addPage.css";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router";
import { addTodo } from "../store/todosSlice";

function AddPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [todoItem, setTodoItem] = useState<string>("");

  const handleAddTodo = () => {
    const newTodo = {
      id: Date.now(),
      todoItem: todoItem,
      status: "Pending",
    };
    dispatch(addTodo(newTodo));
    navigate("/");
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
      <Button onClick={handleAddTodo} type="primary">
        Add
      </Button>
    </div>
  );
}

export default AddPage;
