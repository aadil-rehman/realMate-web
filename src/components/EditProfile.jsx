import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { updateUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
	const [firstName, setFirstName] = useState(user?.firstName || "");
	const [lastName, setLastName] = useState(user?.lastName || "");
	const [age, setAge] = useState(user?.age || "");
	const [gender, setGender] = useState(user?.gender || "");
	const [about, setAbout] = useState(user?.about || "");
	const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
	const [showToast, setShowToast] = useState(false);
	const [error, setError] = useState("");

	const dispatch = useDispatch();
	const handleUpdate = async () => {
		setError("");
		try {
			const updatedData = {
				firstName,
				lastName,
				age,
				gender,
				about,
				photoUrl,
			};

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
				<div className="card card-border bg-base-300 w-88 h-[75vh]">
					<div className="card-body">
						<div className="flex flex-col gap-2">
							<FormRow
								name="firstName"
								fieldValue={firstName}
								setFieldValue={setFirstName}
								label="First Name:"
							/>
							<FormRow
								name="lastName"
								fieldValue={lastName}
								setFieldValue={setLastName}
								label="Last Name:"
							/>
							<FormRow
								name="age"
								fieldValue={age}
								setFieldValue={setAge}
								label="Age:"
							/>
							<label htmlFor="about" className="text-xs">
								Gender:
							</label>
							<select
								className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300 mt-1 bg-base-100 opacity-70 focus:opacity-95"
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
							<FormRow
								name="photoUrl"
								fieldValue={photoUrl}
								setFieldValue={setPhotoUrl}
								label="Photo URL:"
							/>
							<label htmlFor="about" className="text-xs">
								About:
							</label>
							<textarea
								className="textarea opacity-70 focus:opacity-95 border-2 rounded-lg bg-base-50"
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

function FormRow({ fieldValue, setFieldValue, name, label }) {
	return (
		<div>
			<label htmlFor={name} className="text-xs">
				{label}
			</label>
			<input
				id={name}
				type="text"
				value={fieldValue}
				onChange={(e) => setFieldValue(e.target.value)}
				className="w-full p-2 text-xs border rounded-lg focus:ring focus:ring-blue-300 mt-1 bg-base-100 opacity-70 focus:opacity-95"
			/>
		</div>
	);
}

export default EditProfile;
