import { createSlice } from "@reduxjs/toolkit";

const myBlogFeedSlice = createSlice({
	name: "myBlogfeed",
	initialState: null,
	reducers: {
		addMyBlogFeed: (state, action) => action.payload,
	},
});

export const { addMyBlogFeed } = myBlogFeedSlice.actions;
export default myBlogFeedSlice.reducer;
