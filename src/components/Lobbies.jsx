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
        <div key={lobby.id} className="bg-sky-500 p-4 m-4 text-white">
          <p>{lobby.game}</p>
          <p>Put some info in here. Player count, names, etc. Maybe some player icons.</p>
        </div>
      ))}
    </div>
  )


}

export default Lobbies;