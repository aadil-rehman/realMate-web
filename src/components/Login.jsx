import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";

const Login = () => {
	const [emailId, setEmailId] = useState("aadil@gmail.com");
	const [password, setPassword] = useState("Aadil@123");
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const handleLogin = async () => {
		try {
			const res = await axios.post(
				BASE_URL + "/login",
				{
					emailId,
					password,
				},
				{ withCredentials: true }
			);
			dispatch(addUser(res.data.data));
			navigate("/");
		} catch (err) {
			console.error("ERROR: " + err);
		}
	};

	return (
		<div className="flex justify-center my-20">
			<div className="card card-border bg-base-300 w-96 ">
				<div className="card-body">
					<h2 className="card-title flex justify-center">Login</h2>
					<input
						type="text"
						value={emailId}
						onChange={(e) => setEmailId(e.target.value)}
						placeholder="Email"
						className="input"
					/>
					<input
						type="text"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Password"
						className="input"
					/>
					<div className="card-actions justify-center">
						<button className="btn btn-primary" onClick={handleLogin}>
							Login
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
