import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addConnection } from "../utils/connectionsSlice";

import { Outlet, useNavigate, useParams } from "react-router-dom";

const Chat = () => {
	return (
		<div className="grid grid-cols-3 gap-6 mt-32 w-[55vw] mx-auto">
			<div className="col-span-1">
				<SideBar />
			</div>
			<div className="col-span-2">
				<Outlet />
			</div>
		</div>
	);
};

const SideBar = () => {
	const dispatch = useDispatch();
	const connections = useSelector((store) => store.connections);
	const navigate = useNavigate();

	const { targetUserId } = useParams();

	const getConnections = async () => {
		if (connections) return;
		const res = await axios.get(BASE_URL + "/user/connections", {
			withCredentials: true,
		});
		// console.log(res?.data?.data);
		dispatch(addConnection(res?.data?.data));
	};

	console.log(connections);
	useEffect(() => {
		getConnections();
	}, []);

	const handleUserClick = (userId) => {
		navigate(`/app/chat/${userId}`);
	};
	return (
		connections && (
			<div className="border-1 flex flex-col border-cyan-900 p-2 h-[60vh] gap-2 cursor-pointer">
				<p className="px-2 text-sm border-b border-b-cyan-900/80 py-1 pb-2 opacity-65 cursor-auto">
					Catch up with your crew
				</p>
				{connections.map((user) => (
					<div
						className={`flex gap-2 rounded-lg hover:bg-base-300 px-2 py-1.5 ${
							targetUserId === user._id ? "bg-base-300" : ""
						} `}
						onClick={() => handleUserClick(user._id)}
						key={user._id}
					>
						<span>
							<img
								alt="User photo"
								src={user?.profileImage?.url}
								className="w-7 h-7 rounded-full"
							/>
						</span>
						<p key={user._id}>{user.firstName + " " + user.lastName}</p>
					</div>
				))}{" "}
			</div>
		)
	);
};

export default Chat;
