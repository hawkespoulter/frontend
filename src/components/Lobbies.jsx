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
        </div>
      ))}
    </div>
  )


}

export default Lobbies;