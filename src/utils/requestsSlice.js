import { createSlice } from "@reduxjs/toolkit";

const requestsSlice = createSlice({
	name: "requests",
	initialState: null,
	reducers: {
		addRequests: (state, action) => action.payload,
		removeRequets: () => null,
	},
});

export const { addRequests, removeRequets } = requestsSlice.actions;

export default requestsSlice.reducer;
