import React, { useEffect, useState } from "react";
import MyBlogs from "./MyBlogs";
import UserBlogList from "./UserBlogList";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const UserProfile = () => {
	const { userId } = useParams();
	const [user, setUser] = useState(null);

	const fetchUserData = async () => {
		if (user) return;
		try {
			const res = await axios.get(BASE_URL + `/user/profile/${userId}`, {
				withCredentials: true,
			});
			console.log(res);
			setUser(res?.data);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		fetchUserData();
	}, []);
	console.log(user);
	return (
		<div className="mt-30 grid grid-cols-4 grid-rows-4 w-[70vw] gap-4 mx-auto h-[75vh]">
			<div className="col-span-4 row-span-1 bg-base-200 relative">
				<img
					src="https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1350&q=80"
					alt="cover"
					className="w-full h-full object-cover rounded-lg"
				/>
			</div>
			<div className="row-span-3 col-span-1 bg-base-200 relative">
				<img
					src={user?.profileImage?.url}
					alt="user-profile"
					className="w-28 h-28 rounded-full absolute top-[-60px] left-1/2 transform -translate-x-1/2 border-1 p-1 bg-base-100"
				/>
			</div>
			<div className="col-span-3 row-span-3 bg-base-200">
				{user && (
					<h1 className="px-2 py-1 pl-4 text-sm text-gray-300/75">
						Blogs of {user?.firstName + " " + user?.lastName}
					</h1>
				)}
				<UserBlogList userId={userId} />
			</div>
		</div>
	);
};

export default UserProfile;
