import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import UserCard from "./UserCard";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";

const Feed = () => {
	const feed = useSelector((store) => store.feed);
	const dispatch = useDispatch();
	const getFeed = async () => {
		if (feed) return;
		try {
			const res = await axios.get(BASE_URL + "/user/feed", {
				withCredentials: true,
			});

			dispatch(addFeed(res.data.data));
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		getFeed();
	}, []);

	console.log(feed);

	if (!feed || feed.length === 0)
		return <p className="text-sm">No new user found!</p>;

	return (
		feed &&
		feed.length > 0 && (
			<div className="flex justify-center">
				<UserCard user={feed[0]} />
			</div>
		)
	);
};

export default Feed;
