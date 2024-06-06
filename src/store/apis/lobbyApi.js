import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const KEY_FOR_TOKEN = "canasta_token";

// Define a base query with token handling
const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3001",
  prepareHeaders: (headers, { getState }) => {
    // Either get the token from redux store or local storage. Allows for login persistence
    const token = getState().auth.token || localStorage.getItem(KEY_FOR_TOKEN);
    // console.log(token);

    if (token) {
      headers.set("authorization", token);
      // console.log(headers)
    }
    return headers;
  },
});

const lobbyApi = createApi({
  reducerPath: "lobbyApi",
  baseQuery,
  endpoints(builder) {
    return {
      fetchLobbies: builder.query({
        providesTags: ["Lobbies"],
        query: () => ({
          url: "/lobbies",
          method: "GET",
        }),
      }),
      createLobby: builder.mutation({
        query: (lobby) => ({
          url: "/create",
          method: "POST",
          body: {
            game: lobby.game,
            is_active: false // A new lobby is never active upon creation 
          }
        })
      }),
    };
  },
});

export const {
  useFetchLobbiesQuery,
  useCreateLobbyMutation,
} = lobbyApi;

export { lobbyApi };
