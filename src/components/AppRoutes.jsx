import { Route, Routes } from "react-router-dom";
import Login from "./Login.jsx";

function AppRoutes() {
  return (
    <Routes>
      <Route exact path="/login" element={<Login />} />
    </Routes>
  );
}

export default AppRoutes;
