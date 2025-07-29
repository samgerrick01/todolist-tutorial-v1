import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useDeleteTodo, useFetchTodos } from "../api/index.ts";
import ReusableButton from "../components/ReusableButton.tsx";
import Table from "../components/Table.tsx";
import { useAuth } from "../provider/AuthProvider.tsx";
import type { RootState } from "../store/store.ts";
import { resetState, setAllTodos } from "../store/todosSlice";
import "../styles/homePage.css";
import { supabase } from "../utils/supabaseClient.ts";
import EmptyTable from "../components/EmptyTable.tsx";

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data } = useFetchTodos();
  const { mutate: deleteTodo } = useDeleteTodo();
  const todos = useSelector((state: RootState) => state.todos.todos);

  const { user } = useAuth();

  const handleDelete = (id: number) => {
    deleteTodo(id);
  };

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (!confirmLogout) return;
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error(error.message);
    } else {
      dispatch(resetState());
      navigate("/login");
    }
  };

  useEffect(() => {
    if (data) {
      dispatch(setAllTodos(data));
    }
  }, [data]);

  return (
    <div className="homePage">
      <div className="home-btn-logout-container">
        <ReusableButton label="Logout" onClickValue={handleLogout} />
      </div>
      <h1 className="headerTitle">
        Welcome back, {user?.user_metadata?.display_name}
      </h1>
      <h1 className="headerTitle">Todo List App</h1>
      {todos.length === 0 ? (
        <EmptyTable />
      ) : (
        <Table todos={todos} handleDelete={handleDelete} navigate={navigate} />
      )}
      <br />
      <ReusableButton
        onClickValue={() => navigate("/addPage")}
        label="Goto Add Page"
      />
    </div>
  );
};

export default HomePage;
