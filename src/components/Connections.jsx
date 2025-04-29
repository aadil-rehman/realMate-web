import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionsSlice";
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const Connections = () => {
	const dispatch = useDispatch();
	const connections = useSelector((store) => store.connections);

	const getConnections = async () => {
		const res = await axios.get(BASE_URL + "/user/connections", {
			withCredentials: true,
		});
		// console.log(res?.data?.data);
		dispatch(addConnection(res?.data?.data));
	};

	useEffect(() => {
		getConnections();
	}, []);
	return (
		connections && (
			<div className="overflow-y-auto h-[90vh] pt-20">
				<h1 className="text-2xl font-bold text-center my-4">Connections</h1>
				<div className="flex flex-col justify-center items-center gap-3 px-2 py-1">
					{connections.length === 0 ? (
						<p className="text-sm">No connections found!</p>
					) : (
						connections.map((user) => <UserCard user={user} key={user._id} />)
					)}
				</div>
			</div>
		)
	);
};

const UserCard = ({ user }) => {
	const { firstName, lastName, age, gender, about, profileImage } = user;
	const navigate = useNavigate();

	const handleChatButtonClick = (userId) => {
		navigate(`/app/chat/${userId}`);
	};

	return (
		<div className="w-1/2 h-32 flex bg-base-300 rounded-lg gap-4">
			<img
				alt="Photo"
				src={profileImage.url}
				className="w-24 h-32 rounded-l-lg"
			/>
			<div className="flex flex-col flex-1 mr-3 mt-2">
				<div className="flex justify-between w-full ">
					<p className="text-xl">{firstName + " " + lastName}</p>
					<span
						className="flex justify-center items-center gap-1 hover:text-secondary cursor-pointer"
						onClick={() => handleChatButtonClick(user._id)}
					>
						<ChatBubbleBottomCenterTextIcon className="h-5 w-5" />
						<p className="mb-1">chat</p>
					</span>
				</div>
				<div className="py-2 flex flex-col gap-1">
					{age && gender && (
						<p className="text-xs">
							{age + ", " + gender.charAt(0).toUpperCase() + gender.slice(1)}
						</p>
					)}
					<p className="text-xs">{about}</p>
				</div>
			</div>
		</div>
	);
};
export default Connections;
