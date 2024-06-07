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
          url: `/lobbies/`,
          method: "POST",
          body: {
            game: lobby.game,
            is_active: false // A new lobby is never active upon creation 
          }
        }),
        async onQueryStarted(args, { dispatch, queryFulfilled }) {
          try {
            console.log("createLobby args:", args);
            const { meta } = await queryFulfilled;
            console.log("meta:", meta);
          } catch (error) {
            console.log("ERROR @createLobby onQueryStarted")
            console.error(error);
          }
        }
      }),
      joinLobby: builder.mutation({
        query: (lobby) => ({
          url: `/lobbies/${lobby.id}`,
          method: "PATCH",
          body: {
            lobby_id: lobby.id
          }
        })
      }),
      leaveLobby: builder.mutation({
        query: (lobby) => ({
          url: `/lobbies/${lobby.id}/leave`,
          method: "POST",
          body: {
            lobby_id: lobby.id
          }
        })
      }),
      deleteLobby: builder.mutation({
        query: (lobby) => ({
          url: `/lobbies/${lobby.id}`,
          method: "DELETE",
          body: {
            lobby_id: lobby.id
          }
        })
      }),
    };
  },
});

export const {
  useFetchLobbiesQuery,
  useCreateLobbyMutation,
  useLeaveLobbyMutation,
  useJoinLobbyMutation,
  useDeleteLobbyMutation,
} = lobbyApi;

export { lobbyApi };
