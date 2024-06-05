import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setToken, clearToken } from "../slices/authSlice";

// Define a base query with token handling
const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3001",
  prepareHeaders: (headers, { getState }) => {
  const token = getState().auth.token;
  console.log(token)
  if (token) {
    headers.set("authorization", token);
    console.log(headers)
  }
  return headers;
},
});

const canastaApi = createApi({
  reducerPath: "canastaApi",
  baseQuery,
  endpoints(builder) {
    return {
      fetchUsers: builder.query({
        providesTags: ["Users"],
        query: () => ({
          url: "/users",
          method: "GET",
        }),
      }),
      fetchLobbies: builder.query({
        providesTags: ["Lobbies"],
        query: () => ({
          url: "/lobbies",
          method: "GET",
        }),
      }),
      login: builder.mutation({
        query: (login) => ({
          url: "/login",
          method: "POST",
          body: {
            user: {
              email: login.email,
              password: login.password,
            },
          },
        }),
        async onQueryStarted(arg, { dispatch, queryFulfilled }) {
          try {
            const { meta } = await queryFulfilled;
            const token = meta.response.headers.get("authorization");
            dispatch(setToken( token )); 
            localStorage.setItem("token", token);
          } catch {
            // Handle error if needed
          }
        },
      }),
      logout: builder.mutation({
        query: () => ({
          url: "/logout",
          method: "DELETE",
        }),
        async onQueryStarted(arg, { dispatch, queryFulfilled }) {
          try {
            await queryFulfilled;
            dispatch(clearToken()); // Clear the token on logout
          } catch {
            // Handle error if needed
          }
        },
      }),
      currentUser: builder.query({
        query: () => ({
          url: "/current_user",
          method: "GET",
        }),
      }),
    };
  },
});

export const {
  useFetchUsersQuery,
  useLoginMutation,
  useLogoutMutation,
  useCurrentUserQuery,
  useFetchLobbiesQuery,
} = canastaApi;

export { canastaApi };
