import { Button, Space } from "antd";
import "../styles/homePage.css";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store.ts";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { deleteTodo } from "../store/todosSlice";

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos.todos);

  const handleDelete = (id: number) => {
    dispatch(deleteTodo(id));
  };
  console.log("Todos:", todos);
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
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.todoItem}</td>
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
      <Button onClick={() => navigate("/addPage")} type="primary">
        Goto Add Page
      </Button>
    </div>
  );
};

export default HomePage;
