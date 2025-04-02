import React from "react";
import EditProfile from "./EditProfile";
import { useSelector } from "react-redux";
import UserCard from "./UserCard";

const Profile = () => {
	const user = useSelector((store) => store.user);

	return (
		user && (
			<div className="flex justify-center gap-5">
				<EditProfile user={user} />
				<UserCard user={user} loggedInUserCard={true} />
			</div>
		)
	);
};

export default Profile;
