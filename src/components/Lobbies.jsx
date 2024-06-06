import { useCurrentUserQuery } from "../store/apis/canastaApi";
import { useFetchLobbiesQuery } from "../store/apis/lobbyApi";

function Lobbies() {
  const { data, error, isLoading } = useFetchLobbiesQuery();
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

  return (
    <div className="flex">
      <div className="bg-slate-900 p-4 m-4 text-white">
        <p>Current User: {currentUser.email}</p>
      </div>

      {data.map(lobby => (
        <div key={lobby.id} className="bg-sky-500 p-4 m-4 text-white">
          <p>{lobby.game}</p>
          <p>Put some info in here. Player count, names, etc. Maybe some player icons.</p>
        </div>
      ))}
    </div>
  )


}

export default Lobbies;