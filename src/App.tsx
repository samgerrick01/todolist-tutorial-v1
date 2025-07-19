import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import AddPage from "./pages/AddPage";
import EditPage from "./pages/EditPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/addpage" element={<AddPage />} />
      <Route path="/editpage/:id" element={<EditPage />} />
    </Routes>
  );
}

export default App;
