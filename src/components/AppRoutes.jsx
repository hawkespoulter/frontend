import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./Login.jsx";
import Lobbies from "./Lobbies.jsx";
import { useCurrentUserQuery } from "../store/apis/canastaApi";

function RequireAuth({ children }) {
  // this should be updated so that if you try and hit a specific page one successful login it sends you back to that page. 
  const { data: currentUser, isLoading: loadingUser } = useCurrentUserQuery();

  if (loadingUser) {
    return <div>Loading...</div>; // Optional: Show loading indicator
  }
  else if (!currentUser) {
    //TODO: this is broken but needs to get implemented again. Currently this hits last and sends the user back after they login. 
    // return <Navigate to="/login" replace />;
  }

  return children;
}

function AppRoutes() {
  return (
    <Routes>
      <Route exact path="/login" element={<Login />} />
      <Route path="/lobbies" element={<RequireAuth><Lobbies /></RequireAuth>} />
    </Routes>
  );
}

export default AppRoutes;
