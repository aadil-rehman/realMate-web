import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import UserCard from "./UserCard";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import FeedBlogs from "./FeedBlogs";
import { UserIcon } from "@heroicons/react/24/outline";
import Loader from "./Loader";

const Feed = () => {
	const [isLoading, setIsLoading] = useState(false);
	const feed = useSelector((store) => store.feed);

	const dispatch = useDispatch();
	const getFeed = async () => {
		if (feed && feed.length > 0) return;
		setIsLoading(true);
		try {
			const res = await axios.get(BASE_URL + "/user/feed", {
				withCredentials: true,
			});

			dispatch(addFeed(res.data.data));
			setIsLoading(false);
		} catch (err) {
			console.error(err);
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getFeed();
	}, []);

	return (
		<div className="grid grid-cols-3 w-[70vw] mx-auto mt-30 gap-6 ">
			<div className="col-span-2 border-r-1 border-r-cyan-800/70 pr-6 h-[65vh]">
				<FeedBlogs />
			</div>

			<div className="col-span-1 w-60">
				{!feed || isLoading ? (
					<Loader />
				) : feed.length > 0 ? (
					<>
						<p className=" text-center pb-2 text-xs opacity-60 tracking-wide mb-2">
							Connect with real ones
						</p>
						<UserCard user={feed[0]} />
					</>
				) : (
					<div className="flex flex-col justify-center items-center gap-2 mt-32">
						<UserIcon className="h-16 w-16 text-gray-500" />
						<p className="text-sm opacity-65 text-center">No new user found!</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default Feed;
