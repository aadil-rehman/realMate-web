import React, { useEffect } from "react";
import BlogsTableRow from "./BlogsTableRow";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { addBlogFeed } from "../utils/blogFeedSlice";
import { DocumentMagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Loader from "./Loader";

const FeedBlogs = () => {
	const dispatch = useDispatch();
	const blogFeed = useSelector((store) => store.blogFeed);

	const getFeed = async () => {
		if (blogFeed) return;
		try {
			const res = await axios.get(BASE_URL + "/blog/feed", {
				withCredentials: true,
			});
			dispatch(addBlogFeed(res?.data?.data));
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		getFeed();
	}, []);

	if (!blogFeed) return <Loader />;
	return (
		<div className="mx-auto overflow-y-auto h-full scrollbar-hidden">
			<ul className="list bg-base-100 rounded-box gap-1">
				{blogFeed?.length === 0 && (
					<div className="flex flex-col justify-center items-center gap-2 mt-32">
						<DocumentMagnifyingGlassIcon className="h-16 w-16 text-gray-500" />
						<p className="text-sm list-none text-center opacity-65">
							No Blogs Found
						</p>
					</div>
				)}
				{blogFeed?.length > 0 && (
					<p className=" text-center pb-2 text-xs opacity-60 tracking-wide mb-2">
						Catch up on what everyone’s talking about
					</p>
				)}
				{blogFeed?.map((blog) => (
					<div key={blog._id}>
						{blog.authorId && <BlogsTableRow key={blog._id} blog={blog} />}
					</div>
				))}
			</ul>
		</div>
	);
};

export default FeedBlogs;
