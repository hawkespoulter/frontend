import { useFetchUsersQuery } from "../store/apis/canastaApi";
import { useState } from "react";

function Login() {
  const { data, isLoading } = useFetchUsersQuery();
  const [show, setShow] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Login</h1>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          className="p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="p-2 bg-sky-500 text-white rounded hover:bg-sky-600"
          onClick={() => setShow(!show)}
        >
          Login
        </button>
          <div className="flex flex-col gap-4">
            {isLoading ? (
              <p>Loading...</p> 
            ) : (
                <div>
                  <h1 className="font-bold">Look redux is working yayyyyy</h1>
                  {data.map((user) => (
                    <div key={user.id}>
                      <p>{user.name}</p>
                      <p>{user.role}</p>
                    </div>
                  ))}
                </div>
            )}
          </div>
      </form>
    </div>
  );
}

export default Login;