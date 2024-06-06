import { useCurrentUserQuery } from "../store/apis/canastaApi";
import { useCreateLobbyMutation, useFetchLobbiesQuery, useJoinLobbyMutation, useLeaveLobbyMutation } from "../store/apis/lobbyApi";

function Lobbies() {
  const { refetch: getLobbies, data: lobbiesData, error, isLoading } = useFetchLobbiesQuery();
  const [createLobby, { data: createLobbyData }] = useCreateLobbyMutation();
  const [joinLobby, { data: joinLobbyData }] = useJoinLobbyMutation();
  const [leaveLobby, { data: leaveLobbyData }] = useLeaveLobbyMutation();
  const { data: currentUser, isLoading: loadingUser } = useCurrentUserQuery();

  console.log(lobbiesData);

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
      console.log("createLobbyData:", createLobbyData);

      await getLobbies();
      console.log("lobbiesData:", lobbiesData);
    } catch (error) {
      console.log("Couldn't create lobby");
      console.error(error);
    }
  }

  const handleJoinLobby = async (lobbyId) => {
    try {
      await joinLobby({ id: lobbyId });
      console.log("joinLobbyData:", joinLobbyData);

      // Probably will delete this later when the user will get redirected to the Lobby page.
      // This is for testing so we can see if the lobbies really did get properly updated
      await getLobbies();
      console.log("lobbiesData:", lobbiesData);
    } catch (error) {
      console.error(error)
    }
  }

  const handleLeaveLobby = async (lobbyId) => {
    try {
      await leaveLobby({ id: lobbyId });
      console.log("leaveLobbyData:", leaveLobbyData);

      // Probably will delete this later when the user will get redirected to the Lobby page.
      // This is for testing so we can see if the lobbies really did get properly updated
      await getLobbies();
      console.log("lobbiesData:", lobbiesData);
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
            {lobby.owner.id === currentUser.id &&
              <button
                className="bg-red-700 hover:bg-red-900 text-white font-bold  w-auto p-2 mx-2 rounded"
                onClick={() => handleDeleteLobby(lobby.id)}
              >
                Delete
              </button>
            }

            {lobby.joined &&
              <button
                className="bg-red-700 hover:bg-red-900 text-white font-bold  w-auto p-2 mx-2 rounded"
                onClick={() => handleLeaveLobby(lobby.id)}
              >
                Leave
              </button>
            }

            <button
              className="bg-green-700 hover:bg-green-900 text-white font-bold  w-auto p-2 mx-2 rounded"
              onClick={() => handleJoinLobby(lobby.id)}
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