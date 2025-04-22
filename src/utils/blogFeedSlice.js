import { createSlice } from "@reduxjs/toolkit";

const blogFeedSlice = createSlice({
	name: "blogFeed",
	initialState: null,
	reducers: {
		addBlogFeed: (state, action) => action.payload,
	},
});

export const { addBlogFeed } = blogFeedSlice.actions;
export default blogFeedSlice.reducer;
