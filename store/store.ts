import { configureStore, combineReducers } from "@reduxjs/toolkit";

import usersSlice from "./slices/user.slice";

const rootReducer = combineReducers({
	users: usersSlice,
});

export const store = configureStore({
	reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
