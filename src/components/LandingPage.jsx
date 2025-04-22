import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import NavBar from "./NavBar";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";

const LandingPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = useSelector((store) => store.user);

	const fetchUser = async () => {
		if (user) return;
		try {
			const res = await axios.get(BASE_URL + "/profile/view", {
				withCredentials: true,
			});
			dispatch(addUser(res?.data));
		} catch (err) {
			if (err.status === 401) {
				navigate("/login");
			}
			console.error(err);
		}
	};

	useEffect(() => {
		fetchUser();
	}, []);
	return (
		<>
			<NavBar />
			<LandingPageContent user={user} />
			<Footer />
		</>
	);
};

function LandingPageContent({ user }) {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen pt-20 pb-20 bg-base-100 text-base-content">
			<section className="text-center max-w-2xl px-4">
				<h1 className="text-4xl sm:text-5xl font-bold mb-6">
					Welcome to <span className="text-primary">RealMate</span>
				</h1>
				<p className="text-lg opacity-80 mb-8">
					Where real connections begin. Chat, share posts, and grow meaningful
					friendships in a safe and positive space.
				</p>
				<div className="flex justify-center gap-4">
					<Link
						to={user ? "/app/connect" : "/login"}
						className="btn btn-primary"
					>
						Connect
					</Link>
					<Link
						to={user ? "/blog/create" : "/login"}
						className="btn btn-outline"
					>
						Create Blog
					</Link>
				</div>
			</section>

			<section className="grid md:grid-cols-3 gap-6 mt-16 px-6 max-w-6xl w-full">
				<div className="p-6 bg-base-200 rounded-2xl shadow hover:scale-105 transition-transform duration-300">
					<h2 className="text-xl font-semibold mb-2">Connect</h2>
					<p className="opacity-70">
						Discover and connect with like-minded people around the world.
					</p>
				</div>
				<div className="p-6 bg-base-200 rounded-2xl shadow hover:scale-105 transition-transform duration-300">
					<h2 className="text-xl font-semibold mb-2">Chat</h2>
					<p className="opacity-70">
						Private, secure, and meaningful conversations with your connections.
					</p>
				</div>
				<div className="p-6 bg-base-200 rounded-2xl shadow hover:scale-105 transition-transform duration-300">
					<h2 className="text-xl font-semibold mb-2">Share</h2>
					<p className="opacity-70">
						Post your thoughts, updates, and blogs — and let your friends engage
						with them.
					</p>
				</div>
			</section>
		</div>
	);
}

export default LandingPage;
