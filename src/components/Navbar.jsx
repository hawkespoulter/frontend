import { Link } from "react-router-dom";
import { useCurrentUserQuery, useLogoutMutation } from "../store/apis/canastaApi";

function Navbar() {
  const { data: currentUser, isLoading: loadingUser } = useCurrentUserQuery();
  const [logout, { data: logoutData, error: logoutError, isLoading: logoutIsLoading }] = useLogoutMutation();

  if (loadingUser) {
    return <div>Loading...</div>; // Optional: Show loading indicator
  }

  const handleLogout = async (event) => {
    event.preventDefault();
    try {
      await logout().unwrap();
      console.log("Logout successful")
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className="flex flex-row justify-end gap-4 p-4 w-full top-0 fixed z-50 font-bold bg-slate-900 text-white">
      {currentUser ? (
        <div className="flex flex-row gap-4">
          <Link to={`/users/${currentUser.id}`}>PFP GO HERE</Link>
          <div
            onClick={handleLogout}
            className="text-white"
          >
            Logout
          </div>
        </div>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </div>
  );
}

export default Navbar;
