import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import SideDrawer from "./SideDrawer";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";

const NavBar = () => {
	const user = useSelector((store) => store.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
			dispatch(removeUser());
			navigate("/login");
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div className="flex navbar bg-base-300 shadow-sm justify-between fixed top-0 w-full z-50">
			<div className="flex">
				<SideDrawer />
				<Link to="/" className="btn btn-ghost text-xl">
					🧑‍💻 RealMate
				</Link>
			</div>
			<div className="flex gap-2">
				{user && (
					<>
						<p className="flex items-center">Welcome, {user.firstName}</p>
						<div className="dropdown dropdown-end mx-2">
							<div
								tabIndex={0}
								role="button"
								className="btn btn-ghost btn-circle avatar"
							>
								<div className="w-10 rounded-full">
									<img alt="user photo" src={user.photoUrl} />
								</div>
							</div>
							<ul
								tabIndex={0}
								className="menu menu-sm dropdown-content bg-base-300 rounded-box z-50 mt-3 w-48 p-2 shadow"
							>
								<li>
									<Link to="/profile" className="justify-between">
										Profile
										<span className="badge">New</span>
									</Link>
								</li>
								<li>
									<Link className="justify-between">Setting</Link>
								</li>
								<li>
									<Link onClick={handleLogout}>
										Logout{" "}
										<ArrowRightStartOnRectangleIcon className="h-5 w-5 text-gray-200" />
									</Link>
								</li>
							</ul>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default NavBar;
