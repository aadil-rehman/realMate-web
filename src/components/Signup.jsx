import React, { useState } from "react";
import { Link } from "react-router-dom";
import ImageUpload from "./ImageUpload";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Signup = () => {
	const [emailId, setEmailId] = useState("");
	const [password, setPassword] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [age, setAge] = useState(null);
	const [gender, setGender] = useState("");
	const [about, setAbout] = useState("");
	const [profileImage, setProfileImage] = useState(null);

	const handleSignup = async () => {
		try {
			const res = await axios.post(BASE_URL + `/signup`, {
				firstName,
				lastName,
				emailId,
				password,
				...(age ? { age } : {}),
				...(gender ? { gender } : {}),
				...(about ? { about } : {}),
				...(profileImage && Object.keys(profileImage).length
					? { profileImage }
					: {}),
			});
			if (res?.data?.status === 1) {
				window.location.href = "/login";
			} else {
				alert("Error creating account");
			}
		} catch (err) {
			console.error("Error" + err);
		}
	};

	return (
		<div className="flex justify-center my-20">
			<div className="card card-border bg-base-300 w-96 ">
				<div className="text-center">
					<Link
						to="/"
						className="btn btn-ghost text-xl mt-2 pb-1 border-b-1 border-b-slate-600"
					>
						🧑‍💻 RealMate
					</Link>
				</div>
				<div className="card-body">
					<h2 className="card-title flex justify-center">
						Create your account
					</h2>

					<ImageUpload
						image={profileImage}
						setImage={setProfileImage}
						cloudinary_folder="profile"
					/>
					<input
						type="text"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						placeholder="First Name"
						className="input w-full"
					/>
					<input
						type="text"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
						placeholder="Last Name"
						className="input w-full"
					/>

					<input
						type="text"
						value={emailId}
						onChange={(e) => setEmailId(e.target.value)}
						placeholder="Email"
						className="input w-full"
					/>
					<input
						type="text"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="New Password"
						className="input w-full"
					/>
					<input
						type="text"
						value={age}
						onChange={(e) => setAge(e.target.value)}
						placeholder="Age"
						className="input w-full"
					/>
					<select
						className="w-full p-2 border border-slate-400/70 rounded-sm bg-base-100 focus:ring focus:ring-blue-300 mt-1 opacity-60 focus:opacity-95"
						value={gender}
						onChange={(e) => setGender(e.target.value)}
					>
						<option value="" disabled>
							Select Gender
						</option>
						<option value="male">Male</option>
						<option value="female">Female</option>
						<option value="other">Other</option>
					</select>
					<input
						type="text"
						value={about}
						onChange={(e) => setAbout(e.target.value)}
						placeholder="About"
						className="input w-full"
					/>

					<div className="card-actions justify-center">
						<button
							className="btn btn-primary btn-sm mt-2 text-sm"
							onClick={handleSignup}
						>
							Sign up
						</button>
					</div>
					<p className="text-xs text-center mt-2">
						Already have an account?{" "}
						<a href="/login" className="text-blue-500">
							Sign in
						</a>{" "}
					</p>
				</div>
			</div>
		</div>
	);
};

export default Signup;
