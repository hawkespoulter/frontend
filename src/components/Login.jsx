import { useState } from "react";
import { useLoginMutation, useLogoutMutation, useSignupMutation } from "../store/apis/canastaApi";

function Login() {
  const [login, { data, error, isLoading }] = useLoginMutation();
  const [loginError, setLoginError] = useState("");
  const [signup] = useSignupMutation();
  const [signupError, setSignupError] = useState("");
  const [logout, { data: logoutData, error: logoutError, isLoading: logoutIsLoading }] = useLogoutMutation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Sign up state variables
  const [isSignup, setIsSignup] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await login({ email, password }).unwrap();
      console.log("Login successful")
    } catch (error) {
      setLoginError(error.data);
    }
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    try {
      console.log(newUsername, newEmail, newPassword)
      await signup({ newUsername, newEmail, newPassword }).unwrap();
      console.log("Login successful")
    } catch (error) {
      setSignupError(error.data);
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


  const renderSignup = () => {
    return (
      <>
        <h2>Sign Up</h2>
        <br />
        <form className="flex flex-col gap-4" onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Username"
            className="p-2 border border-gray-300 rounded"
            value={newUsername}
            onChange={e => setNewUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder="Email"
            className="p-2 border border-gray-300 rounded"
            value={newEmail}
            onChange={e => setNewEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="p-2 border border-gray-300 rounded"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
          />
          <button
            type="submit"
            className="p-2 bg-sky-500 text-white rounded hover:bg-sky-600"
          >
            Sign Up
          </button>

          <div className="flex flex-col gap-4">
            {signupError && <p>{signupError}</p>}
          </div>
        </form>

        <p>Login{' '}
          <button onClick={() => setIsSignup(!isSignup)} style={{ background: 'none', border: 'none', color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}>
            here
          </button>
        </p>
      </>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">

      {isSignup ?
        renderSignup() :
        <>
          <h2>Login</h2>
          <br />
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
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

          <p>Sign Up{' '}
            <button onClick={() => setIsSignup(!isSignup)} style={{ background: 'none', border: 'none', color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}>
              here
            </button>
          </p>
        </>
      }
    </div>
  );
}

export default Login;