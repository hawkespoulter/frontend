import { Route, Routes } from "react-router-dom";
import Login from "./Login.jsx";
import Lobbies from "./Lobbies.jsx";

function AppRoutes() {
  return (
    <Routes>
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/lobbies" element={<Lobbies />} />
    </Routes>
  );
}

export default AppRoutes;
