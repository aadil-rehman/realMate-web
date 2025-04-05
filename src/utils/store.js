import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import requestsReducer from "./requestsSlice";
import connectionsReducer from "./connectionsSlice";

const store = configureStore({
	reducer: {
		user: userReducer,
		feed: feedReducer,
		connections: connectionsReducer,
		requests: requestsReducer,
	},
});

export default store;
