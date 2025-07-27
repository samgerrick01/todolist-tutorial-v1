import { Button, Space } from "antd";
import type { TodoItemsInterface } from "../utils/types";

interface ReusableTableProps {
  todos: TodoItemsInterface[];
  handleDelete: (id: number) => void;
  navigate: (path: string) => void;
}

function Table(props: ReusableTableProps) {
  const { todos, handleDelete, navigate } = props;

  return (
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
  );
}

export default Table;
