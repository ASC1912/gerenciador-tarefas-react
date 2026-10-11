import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { PageLayout } from "./components/PageLayout";
import { Home } from "./pages/Home";
import { TaskDetails } from "./pages/TaskDetails";
import { Login } from "./pages/Login";
import { CreateTask } from "./pages/CreateTask";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { useAuth } from "./contexts/AuthContext";

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<PageLayout />}>
          {/* Públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/tarefa/:id" element={<TaskDetails />} />

          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/" replace /> : <Login />}
          />
          {/* Requer autenticação */}
          <Route element={<ProtectedRoute />}>
            <Route path="/create-task" element={<CreateTask />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
