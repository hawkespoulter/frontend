import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { canastaApi } from "./apis/canastaApi";

export const store = configureStore({
  reducer: {
    [canastaApi.reducerPath]: canastaApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(canastaApi.middleware);
  },
});

setupListeners(store.dispatch);

export {
  useFetchUsersQuery,
} from "./apis/canastaApi";
