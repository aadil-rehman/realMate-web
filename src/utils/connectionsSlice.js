import { createSlice } from "@reduxjs/toolkit";

const connectionsSlice = createSlice({
	name: "connections",
	initialState: null,
	reducers: {
		addConnection: (state, action) => action.payload,
		removeConnection: () => null,
	},
});

export const { addConnection, removeConnection } = connectionsSlice.actions;

export default connectionsSlice.reducer;
