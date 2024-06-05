import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useLoginMutation, useLogoutMutation } from "../store/apis/canastaApi";

function Login() {
  const [login, { data, error, isLoading }] = useLoginMutation();
  const [loginError, setLoginError] = useState("");
  const [logout, { data: logoutData, error: logoutError, isLoading: logoutIsLoading }] = useLogoutMutation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await login({ email, password }).unwrap();
      navigate('/lobbies');
    } catch (error) {
      setLoginError(error.data);
    }
  };

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
    <div className="flex flex-col items-center justify-center h-screen">
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Email"
        className="p-2 border border-gray-300 rounded"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="p-2 border border-gray-300 rounded"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button
        type="submit"
        className="p-2 bg-sky-500 text-white rounded hover:bg-sky-600"
      >
        Login
      </button>
      <button
        onClick={handleLogout}
        className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Logout
      </button>
      <div className="flex flex-col gap-4">
        {loginError && <p>{loginError}</p>}
      </div>
    </form>
    </div>
  );
}

export default Login;