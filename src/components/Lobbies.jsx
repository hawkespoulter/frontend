import { useFetchLobbiesQuery } from "../store/apis/canastaApi";

function Lobbies() {
  const { data, error, isLoading } = useFetchLobbiesQuery();

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.data}</div>
  }

  return (
    <div className="flex">

      {data.map(lobby => (
        <div key={lobby.id} className="bg-sky-500 rounded p-4 m-4 text-white">
          <p>{lobby.game}</p>
          <p>Put some info in here. Player count, names, etc. Maybe some player icons.</p>
          <button className="bg-sky-800 rounded p-4 m-4 text-white">Join</button>
        </div>
      ))}
    </div>
  )


}

export default Lobbies;