import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import requestsReducer from "./requestsSlice";
import connectionsReducer from "./connectionsSlice";
import blogFeedReducer from "./blogFeedSlice";
import myBlogFeedReducer from "./myBlogFeedSlice";

const store = configureStore({
	reducer: {
		user: userReducer,
		feed: feedReducer,
		connections: connectionsReducer,
		requests: requestsReducer,
		blogFeed: blogFeedReducer,
		myBlogfeed: myBlogFeedReducer,
	},
});

export default store;
