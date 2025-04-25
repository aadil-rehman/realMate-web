import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ChatBoxHome = () => {
	const connections = useSelector((store) => store.connections);

	return (
		<div className="border-1 flex flex-col justify-center items-center border-cyan-900 h-[60vh]">
			<ChatBubbleLeftRightIcon className="h-16 w-16 text-gray-500" />
			<p className="opacity-70">Chat with your Mate. Chat now!</p>
			<Link
				to={connections?.length ? `/app/chat/${connections[0]._id}` : ""}
				className="mt-8 underline text-secondary/75"
			>
				Start chat now
			</Link>
		</div>
	);
};

export default ChatBoxHome;
