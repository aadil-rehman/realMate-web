import { io } from "socket.io-client";
import { BASE_URL } from "./constants";

function getCookie(name) {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) return parts.pop().split(";").shift();
	return null; // if cookie doesn't exist
}

console.log(getCookie("token"));

export const createSocketConnection = () => {
	if (location.hostname === "localhost") {
		return io(BASE_URL, {
			auth: {
				token: getCookie("token"),
			},
		});
	} else {
		return io("/", {
			path: "/api/socket.io",
			auth: {
				token: getCookie("token"),
			},
		});
	}
};
