import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./Login.jsx";
import Lobbies from "./Lobbies.jsx";
import Profile from "./Profile.jsx";
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
      <Route path="/login" element={<Login />} />
      <Route path="/lobbies" element={<RequireAuth><Lobbies /></RequireAuth>} />
      {/* The below is good for redirect once we fix the required auth. I need to do a better job figuring out how to do that. */}
      <Route path="*" element={<Navigate to="/lobbies" />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default AppRoutes;
