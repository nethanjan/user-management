import { User } from "@/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: {
	users: User[];
	loading: boolean;
	error: string | null;
} = { loading: true, error: null, users: [] };

const usersSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		reset: () => {
			return initialState;
		},
		setUsers: (state, action: PayloadAction<typeof initialState>) => {
			state = action.payload;
			return state;
		},
	},
});

export const { reset, setUsers } = usersSlice.actions;
export default usersSlice.reducer;
