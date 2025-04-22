import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { updateUser } from "../utils/userSlice";
import ImageUpload from "./ImageUpload";

const EditProfile = ({ user }) => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [age, setAge] = useState("");
	const [gender, setGender] = useState("");
	const [about, setAbout] = useState("");
	const [profileImage, setProfileImage] = useState(null);
	const [showToast, setShowToast] = useState(false);
	const [error, setError] = useState("");

	const dispatch = useDispatch();

	useEffect(() => {
		if (user) {
			setProfileImage(user?.profileImage || null);
			setFirstName(user?.firstName || "");
			setLastName(user?.lastName || "");
			setAge(user?.age);
			setGender(user?.gender || "");
			setAbout(user?.about || "");
		}
	}, [user]);
	const handleUpdate = async () => {
		setError("");
		try {
			const updatedData = {};

			if (firstName !== user.firstName) updatedData.firstName = firstName;
			if (lastName !== user.lastName) updatedData.lastName = lastName;
			if (age !== user.age) updatedData.age = age;
			if (gender !== user.gender) updatedData.gender = gender;
			if (about !== user.about) updatedData.about = about;

			if (
				profileImage &&
				JSON.stringify(profileImage) !== JSON.stringify(user.profileImage)
			) {
				updatedData.profileImage = profileImage;
			}

			if (Object.keys(updatedData).length === 0) {
				setError("No changes detected.");
				return;
			}
			const res = await axios.patch(BASE_URL + "/profile/edit", updatedData, {
				withCredentials: true,
			});
			dispatch(updateUser(res?.data?.data));

			setShowToast(true);
			setTimeout(() => setShowToast(false), 3000);
		} catch (err) {
			setError(err.response.data);
			console.error(err);
		}
	};

	return (
		<>
			<div className="flex justify-center my-20">
				<div className="card card-border bg-base-300 w-96 h-[75vh]">
					<div className="card-body">
						<div className="flex flex-col gap-2">
							<FormRow
								name="firstName"
								fieldValue={firstName}
								setFieldValue={setFirstName}
								label="First Name:"
								placeholder="Enter First Name"
							/>
							<FormRow
								name="lastName"
								fieldValue={lastName}
								setFieldValue={setLastName}
								label="Last Name:"
								placeholder="Enter Last Name"
							/>
							<FormRow
								name="age"
								fieldValue={age}
								setFieldValue={setAge}
								label="Age:"
								placeholder="Enter Your Age"
							/>
							<div className="flex justify-between items-center gap-4">
								<label htmlFor="about" className="text-xs">
									Gender:
								</label>
								<select
									className="p-2 border w-64 rounded-sm focus:ring focus:ring-blue-300 mt-1 border-slate-500/70 bg-base-100 opacity-70 focus:opacity-95"
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
							</div>
							<ImageUpload
								image={profileImage}
								setImage={setProfileImage}
								cloudinary_folder="profile"
							/>
							<label htmlFor="about" className="text-xs">
								About:
							</label>
							<textarea
								className="textarea opacity-70 w-full focus:opacity-95 border-2 rounded-lg bg-base-50"
								placeholder="About"
								value={about}
								onChange={(e) => setAbout(e.target.value)}
							></textarea>
							<div className="card-actions justify-center">
								<button
									className="btn btn-secondary mt-2 h-auto py-1"
									onClick={handleUpdate}
								>
									Save
								</button>
							</div>
							{error && <div className="text-error text-xs">{error}</div>}
						</div>
					</div>
				</div>
			</div>
			{showToast && (
				<div className="fixed top-10 left-1/2 transform -translate-x-1/2 z-50 shadow-xl">
					<div className="alert alert-success">
						<span>Profile updated successfully</span>
					</div>
				</div>
			)}
		</>
	);
};

function FormRow({ fieldValue, setFieldValue, name, label, placeholder }) {
	return (
		<div className="flex justify-between items-center gap-4">
			<label htmlFor={name} className="text-xs">
				{label}
			</label>
			<input
				id={name}
				type="text"
				placeholder={placeholder}
				value={fieldValue}
				onChange={(e) => setFieldValue(e.target.value)}
				className="input w-64"
			/>
		</div>
	);
}

export default EditProfile;
