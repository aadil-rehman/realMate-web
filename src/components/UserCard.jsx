import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = (props) => {
	const { firstName, lastName, age, gender, about } = props.user;
	const dispatch = useDispatch();

	async function handleSendRequest(status, id) {
		const res = await axios.post(
			BASE_URL + `/request/send/${status}/${id}`,
			{},
			{ withCredentials: true }
		);
		console.log(res);
		dispatch(removeUserFromFeed(id));
	}
	return (
		<div
			className={` ${
				props.loggedInUserCard ? "w-96 h-[75vh] my-20" : ""
			} card bg-base-300  shadow-sm  `}
		>
			<figure>
				<img src={props?.user?.profileImage?.url} alt="profile Ia" />
			</figure>
			<div className="card-body">
				<h2 className="card-title">{firstName + " " + lastName}</h2>
				<p>
					{age &&
						gender &&
						age + ", " + gender.charAt(0).toUpperCase() + gender.slice(1)}
				</p>
				<p>{about}</p>
				{!props.loggedInUserCard && (
					<div className="card-actions justify-center my-4">
						<button
							className="btn btn-primary"
							onClick={() => handleSendRequest("ignored", props?.user?._id)}
						>
							Ignore
						</button>
						<button
							className="btn btn-secondary"
							onClick={() => handleSendRequest("interested", props?.user?._id)}
						>
							Interested
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default UserCard;
