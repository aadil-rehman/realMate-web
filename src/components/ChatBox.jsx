import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";

import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { createSocketConnection } from "../utils/socket";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import Loader from "./Loader";

const ChatBox = () => {
	const [newMessage, setNewMessage] = useState("");
	const [messages, setMessages] = useState([]);
	const { targetUserId } = useParams();
	const [isLoading, setIsLoading] = useState(false);

	const user = useSelector((store) => store.user);

	const bottomRef = useRef();

	const userId = user?._id;
	const firstName = user?.firstName;
	const lastName = user?.lastName;

	const fetchChats = async () => {
		setIsLoading(true);
		try {
			const chat = await axios.get(BASE_URL + `/chat/${targetUserId}`, {
				withCredentials: true,
			});

			const chatMessages = chat?.data?.data?.messages.map((msg) => {
				const { senderId, text } = msg;
				return {
					firstName: senderId?.firstName,
					lastName: senderId?.lastName,
					profileImage: senderId?.profileImage,
					text,
				};
			});

			setMessages(chatMessages);
			setIsLoading(false);
		} catch (err) {
			setIsLoading(false);
			console.error(err);
		}
	};

	useEffect(() => {
		if (!userId) return;
		const socket = createSocketConnection();

		//as soon as the page loaded, the socket is made and joinChat event is emitted
		socket.emit("joinChat", {
			userId,
			targetUserId,
			firstName,
		});

		socket.on(
			"messageReceived",
			({ firstName, lastName, profileImage, text }) => {
				console.log(firstName + " " + text);
				setMessages((messages) => [
					...messages,
					{ firstName, lastName, profileImage, text },
				]);
			}
		);

		socket.on("connect_error", (err) => {
			console.error("Connection error:", err);
		});

		return () => {
			socket.disconnect();
		};
	}, [userId, targetUserId]);

	useEffect(() => {
		fetchChats();
	}, [targetUserId]);

	useEffect(() => {
		if (bottomRef.current) {
			bottomRef.current.scrollIntoView({ behavior: "smooth" }); //to keep chat scroll to down automatically when new mssg comes
		}
	}, [messages]);

	const handleSendMessage = () => {
		const socket = createSocketConnection();
		socket.emit("sendMessage", {
			firstName,
			lastName,
			profileImage: user?.profileImage,
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
				{isLoading ? (
					<Loader />
				) : (
					messages?.map((msg, index) => (
						<div className="px-2 py-2" key={index}>
							<div
								className={`chat py-0 ${
									user?.firstName === msg?.firstName ? "chat-end" : "chat-start"
								}`}
							>
								<div className="chat-image avatar">
									<div className="w-7 rounded-full">
										<img alt="User profile" src={msg?.profileImage?.url} />
									</div>
								</div>
								<div className="chat-header">
									{msg?.firstName + " " + msg?.lastName}
									<time className="text-xs opacity-50">12:45</time>
								</div>
								<div className="chat-bubble text-sm">{msg.text}</div>
							</div>
						</div>
					))
				)}
				<div ref={bottomRef} />
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
