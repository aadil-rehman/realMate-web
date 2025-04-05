import React from "react";
import { Link } from "react-router-dom";
import { HomeIcon } from "@heroicons/react/24/outline";
import { UserGroupIcon } from "@heroicons/react/24/outline";
import { UserPlusIcon } from "@heroicons/react/24/outline";
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";

const SideDrawer = () => {
	const closeDrawer = () => {
		document.getElementById("my-drawer").checked = false;
	};

	return (
		<div className="drawer">
			<input id="my-drawer" type="checkbox" className="drawer-toggle" />
			<label htmlFor="my-drawer" className="btn btn-ghost drawer-button">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M4 6h16M4 12h16m-7 6h7"
					/>
				</svg>
			</label>
			<div className="drawer-side mt-16 z-20">
				<label
					htmlFor="my-drawer"
					aria-label="close sidebar"
					className="drawer-overlay"
				></label>
				<ul className="menu bg-base-300 text-base-content min-h-full w-48 p-4">
					<li>
						<Link to="/" onClick={closeDrawer} className="text-gray-300">
							<HomeIcon className="h-5 w-5 " />
							Home
						</Link>
					</li>
					<li>
						<Link
							to="/connections"
							onClick={closeDrawer}
							className="text-gray-300"
						>
							<UserGroupIcon className="h-5 w-5" />
							Connections
						</Link>
					</li>
					<li>
						<Link
							to="/requests"
							onClick={closeDrawer}
							className="text-gray-300"
						>
							<UserPlusIcon className="h-5 w-5" />
							Requests
						</Link>
					</li>
					<li>
						<Link onClick={closeDrawer} className="text-gray-300">
							<ChatBubbleBottomCenterTextIcon className="h-5 w-5" />
							Messages
						</Link>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default SideDrawer;
