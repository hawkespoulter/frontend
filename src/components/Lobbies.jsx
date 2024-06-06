import { useCurrentUserQuery } from "../store/apis/canastaApi";
import { useCreateLobbyMutation, useFetchLobbiesQuery } from "../store/apis/lobbyApi";

function Lobbies() {
  const { refetch: getLobbies, data: lobbiesData, error, isLoading } = useFetchLobbiesQuery();
  const [createLobby, { data: createLobbyData }] = useCreateLobbyMutation();
  const { data: currentUser, isLoading: loadingUser } = useCurrentUserQuery();

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.data}</div>
  }

  if (loadingUser) {
    return <div>Loading user...</div>
  }

  const handleCreateLobby = async () => {
    try {
      await createLobby({ game: "canasta" });
      console.log("lobbyData:", createLobbyData);

      await getLobbies();
      console.log("lobbiesData:", lobbiesData);
    } catch (error) {
      console.log("Couldn't create lobby");
      console.error(error);
    }
  }

  const handleJoinLobby = async () => {
    try {

    } catch (error) {
      console.error(error)
    }
  }

  const handleDeleteLobby = async () => {
    try {

    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="flex">
      <div className="flex flex-col items-center">
        <div className="bg-slate-900 p-4 m-4 text-white">
          <p>Current User: {currentUser.email}</p>
        </div>

        <button
          className="bg-sky-600 hover:bg-sky-900 text-white font-bold  w-40 p-2 rounded"
          onClick={() => handleCreateLobby()}
        >
          Create Lobby
        </button>
      </div>

      {lobbiesData.map(lobby => (
        <div key={lobby.id} className="bg-sky-500 p-4 m-4 text-white">
          <p>{lobby.game}</p>
          <p>Owner: <b>{lobby.owner.name}</b></p>
          <p>Player(s): <b>{lobby.player_count}</b></p>

          <br />
          <div className="flex justify-center">
            {lobby.owner && lobby.owner.id === currentUser.id &&
              <button
                className="bg-red-700 hover:bg-red-900 text-white font-bold  w-auto p-2 mx-2 rounded"
                onClick={() => handleDeleteLobby()}
              >
                Delete
              </button>
            }
            <button
              className="bg-green-700 hover:bg-green-900 text-white font-bold  w-auto p-2 mx-2 rounded"
              onClick={() => handleJoinLobby()}
            >
              Join
            </button>
          </div>
        </div>
      ))}
    </div>
  )


}

export default Lobbies;