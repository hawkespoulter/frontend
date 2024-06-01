import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const canastaApi = createApi({
  reducerPath: "canastaApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001",
  }),
  endpoints(builder) {
    return {
      fetchUsers: builder.query({
        providesTags: ["Users"],
        query: () => {
          return {
            url: "/users",
            method: "GET",
          };
        },
      }),
    };
  },
});

export const {
  useFetchUsersQuery,
} = canastaApi;

export { canastaApi };
