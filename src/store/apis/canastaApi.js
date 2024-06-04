import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setToken, clearToken } from "../slices/authSlice";

// Define a base query with token handling
const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3001",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("authorization", `${token}`);
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
            dispatch(setToken(meta.response.headers.get("authorization"))); // Capture the token on login
          } catch {
            // Handle error if needed
          }
        },
      }),
      signup: builder.mutation({
        query: (signup) => ({
          url: "/signup",
          method: "POST",
          body: {
            user: {
              name: signup.newUsername,
              email: signup.newEmail,
              password: signup.newPassword,
            },
          },
        }),
        async onQueryStarted(arg, { dispatch, queryFulfilled }) {
          try {
            const { meta } = await queryFulfilled;
            dispatch(setToken(meta.response.headers.get("authorization"))); // Capture the token on login
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
  useSignupMutation,
  useLogoutMutation,
  useCurrentUserQuery,
} = canastaApi;

export { canastaApi };
