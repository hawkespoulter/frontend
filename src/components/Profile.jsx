import { useCurrentUserQuery } from "../store/apis/canastaApi";

function Profile() {
  const { data: currentUser, isLoading: loadingUser } = useCurrentUserQuery();
  console.log(currentUser);

  return (
    loadingUser ? <div>Loading...</div> : (
      <div className="flex flex-col items-center justify-center h-screen">
        <form className="flex flex-col gap-4" onSubmit={console.log("Save")}>
          <input
            type="text"
            placeholder="Username"
            className="p-2 border border-gray-300 rounded"
            value={currentUser.email}
            // onChange={e => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Password"
            className="p-2 border border-gray-300 rounded"
            value={currentUser.email}
            // onChange={e => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="p-2 bg-sky-500 text-white rounded hover:bg-sky-600"
          >
            Save
          </button>
        </form>
      </div>
    )
  );
}

export default Profile;