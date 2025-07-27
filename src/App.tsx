import { Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";
import AddPage from "./pages/AddPage";
import EditPage from "./pages/EditPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ProtectedRoute from "./provider/ProtectedRoute";

function App() {
  const protectedRoutes = [
    { path: "/", element: <HomePage /> },
    { path: "/addpage", element: <AddPage /> },
    { path: "/editpage/:id", element: <EditPage /> },
  ];

  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {protectedRoutes.map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={<ProtectedRoute>{element}</ProtectedRoute>}
          />
        ))}
      </Routes>
      <ToastContainer position="top-left" autoClose={3000} />
    </>
  );
}

export default App;
