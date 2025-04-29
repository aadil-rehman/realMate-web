import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import BlogsTableRow from "./BlogsTableRow";
import Loader from "./Loader";

const UserBlogList = ({ userId }) => {
	const [userBlogFeed, setUserBlogFeed] = useState(null);
	const getUserBlogList = async () => {
		try {
			const res = await axios.get(BASE_URL + `/blog/list/${userId}`, {
				withCredentials: true,
			});
			console.log(res);
			setUserBlogFeed(res?.data?.data);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		getUserBlogList();
	}, []);

	if (!userBlogFeed) return <Loader />;
	return (
		<div className="w-[50vw] mx-auto">
			<ul className="list bg-base-200 rounded-box shadow-md mt-2">
				{userBlogFeed.length === 0 && (
					<li className="list-none text-center p-5 text-lg font-bold">
						No Blogs Found
					</li>
				)}
				{userBlogFeed.map((blog) => (
					<BlogsTableRow key={blog._id} blog={blog} />
				))}
			</ul>
		</div>
	);
};

export default UserBlogList;
