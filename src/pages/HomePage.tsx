import { Button, Space } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useDeleteTodo, useFetchTodos } from "../api/index.ts";
import type { RootState } from "../store/store.ts";
import { setAllTodos } from "../store/todosSlice";
import "../styles/homePage.css";
import ReusableButton from "../components/ReusableButton.tsx";

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data } = useFetchTodos();
  const { mutate: deleteTodo } = useDeleteTodo();
  const todos = useSelector((state: RootState) => state.todos.todos);

  const handleDelete = (id: number) => {
    deleteTodo(id);
  };

  useEffect(() => {
    if (data) {
      dispatch(setAllTodos(data));
    }
  }, [data]);

  return (
    <div className="homePage">
      <h1 className="headerTitle">Todo List App</h1>
      <table
        style={{
          width: "100%",
          margin: "0 auto",
          border: "1px solid #ccc",
          padding: "20px",
        }}
      >
        <thead>
          <tr>
            <th style={{ width: "80%" }}>Todo Item</th>
            <th style={{ width: "10%" }}>Status</th>
            <th style={{ width: "10%" }}>Action</th>
          </tr>
        </thead>
        <tbody style={{ textAlign: "center" }}>
          {todos.map((todo) => (
            <tr key={todo.id}>
              <td
                className={todo.status === "Complete" ? "todoItemComplete" : ""}
              >
                {todo.todoItem}
              </td>
              <td>{todo.status}</td>
              <td>
                <Space size="middle">
                  <Button
                    type="primary"
                    onClick={() => navigate("/editPage/" + todo.id)}
                  >
                    Edit
                  </Button>
                  <Button onClick={() => handleDelete(todo.id)}>Delete</Button>
                </Space>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <ReusableButton
        onClickValue={() => navigate("/addPage")}
        label="Goto Add Page"
      />
    </div>
  );
};

export default HomePage;
