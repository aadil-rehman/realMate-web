import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addMyBlogFeed } from "../utils/myBlogFeedSlice";
import BlogsTableRow from "./BlogsTableRow";
import Loader from "./Loader";

const MyBlogs = () => {
	const dispatch = useDispatch();
	const myBlogfeed = useSelector((store) => store.myBlogfeed);

	const getMyFeed = async () => {
		if (myBlogfeed) return;
		try {
			const res = await axios.get(BASE_URL + "/blog/list", {
				withCredentials: true,
			});
			dispatch(addMyBlogFeed(res?.data?.data));
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		getMyFeed();
	}, []);

	if (!myBlogfeed) return <Loader />;
	return (
		<div className="w-[50vw] mx-auto">
			<ul className="list bg-base-200 rounded-box shadow-md mt-24">
				{myBlogfeed.length === 0 && (
					<li className="list-none text-center p-5 text-lg font-bold">
						No Blogs Found
					</li>
				)}
				{myBlogfeed.map((blog) => (
					<BlogsTableRow key={blog._id} blog={blog} myblog={true} />
				))}
			</ul>
		</div>
	);
};

export default MyBlogs;
