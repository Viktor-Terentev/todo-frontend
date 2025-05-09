import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginPage from "./pages/LoginPage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import TodosPage from "./pages/todosPage/TodosPage.tsx";
import ConfirmPage from "./pages/ConfirmPage.tsx";
import {AuthProvider} from "./store/authContext.tsx";
import "./App.module.scss";


function App() {

  return (
      <AuthProvider>
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/confirm" element={<ConfirmPage />} />
                  <Route path="/todos" element={<TodosPage />} />
              </Routes>
          </BrowserRouter>
      </AuthProvider>
  )
}

export default App
