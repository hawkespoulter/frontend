import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { canastaApi } from "./apis/canastaApi";
import { lobbyApi } from "./apis/lobbyApi";
import authReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [canastaApi.reducerPath]: canastaApi.reducer,
    [lobbyApi.reducerPath]: lobbyApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(canastaApi.middleware).concat(lobbyApi.middleware);
  },
});

setupListeners(store.dispatch);

export {
  useFetchUsersQuery,
  useLoginMutation,
  useLogoutMutation,
  useCurrentUserQuery,
} from "./apis/canastaApi";

export {
  useFetchLobbiesQuery,
  useCreateLobbyMutation,
} from "./apis/lobbyApi";
