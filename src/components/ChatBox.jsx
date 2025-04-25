import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { createSocketConnection } from "../utils/socket";

const ChatBox = () => {
	const [newMessage, setNewMessage] = useState("");
	const [messages, setMessages] = useState([]);
	const { targetUserId } = useParams();

	const user = useSelector((store) => store.user);

	const userId = user?._id;
	const firstName = user?.firstName;

	useEffect(() => {
		if (!userId) return;
		const socket = createSocketConnection();

		//as soon as the page loaded, the socket is made and joinChat event is emitted
		socket.emit("joinChat", {
			userId,
			targetUserId,
			firstName,
		});

		socket.on("messageReceived", ({ firstName, text }) => {
			console.log(firstName + " " + text);
			setMessages((messages) => [...messages, { firstName, text }]);
		});

		socket.on("connect_error", (err) => {
			console.error("Connection error:", err);
		});

		return () => {
			socket.disconnect();
		};
	}, [userId, targetUserId]);

	const handleSendMessage = () => {
		const socket = createSocketConnection();
		socket.emit("sendMessage", {
			firstName,
			userId,
			targetUserId,
			text: newMessage,
		});
		setNewMessage("");
	};

	return (
		<div className="border-1 flex flex-col justify-between border-cyan-900 h-[60vh]">
			<h1 className="px-4 py-2 border-b border-cyan-900">Chat </h1>
			<div className="flex-1 overflow-y-auto">
				{messages.map((msg, index) => (
					<div className="p-4" key={index}>
						<div className="chat chat-start">
							<div className="chat-image avatar">
								<div className="w-7 rounded-full">
									<img
										alt="Tailwind CSS chat bubble component"
										src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
									/>
								</div>
							</div>
							<div className="chat-header">
								{msg.firstName}
								<time className="text-xs opacity-50">12:45</time>
							</div>
							<div className="chat-bubble text-sm">{msg.text}</div>
							<div className="chat-footer opacity-50">Delivered</div>
						</div>
					</div>
				))}
			</div>
			<div className="p-1.5 flex items-center gap-1 relative">
				<input
					type="text"
					placeholder="Message..."
					value={newMessage}
					className="text-xs px-2 pr-7 py-2 bg-base-200 w-full border-1 border-cyan-900 rounded-lg"
					onChange={(e) => setNewMessage(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === "Enter" && !e.shiftKey) {
							e.preventDefault(); // prevent newline if using textarea
							handleSendMessage();
						}
					}}
				/>
				<PaperAirplaneIcon
					className="w-6 h-6 absolute top-3 right-2 cursor-pointer opacity-90 hover:opacity-100"
					onClick={handleSendMessage}
				/>
			</div>
		</div>
	);
};

export default ChatBox;
