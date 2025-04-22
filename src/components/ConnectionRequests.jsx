import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/requestsSlice";

const ConnectionRequests = () => {
	const dispatch = useDispatch();
	const requests = useSelector((store) => store.requests);
	const [refresh, setRefresh] = useState(false);

	const getRequests = async () => {
		const res = await axios.get(BASE_URL + "/user/request", {
			withCredentials: true,
		});
		dispatch(addRequests(res?.data?.data));
		setRefresh(false);
		console.log(res);
	};
	console.log(requests);
	useEffect(() => {
		getRequests();
	}, [refresh]);

	async function reviewRequest(status, requestId) {
		try {
			const res = await axios.post(
				`${BASE_URL}/request/review/${status}/${requestId}`,
				{},
				{
					withCredentials: true,
				}
			);
			setRefresh(true);
			console.log(res);
		} catch (err) {
			console.error(err);
		}
	}

	return (
		requests && (
			<div className="overflow-y-auto h-[90vh] pt-20">
				<h1 className="text-2xl font-bold text-center my-4">
					Connection Requests
				</h1>

				<div className="flex flex-col justify-center items-center gap-3">
					{requests.length === 0 ? (
						<p className="text-sm">No connection requests found!</p>
					) : (
						requests.map((user) => (
							<UserCard
								user={user}
								reviewRequest={reviewRequest}
								key={user._id}
							/>
						))
					)}
				</div>
			</div>
		)
	);
};

const UserCard = ({ user, reviewRequest }) => {
	const { firstName, lastName, age, gender, about, profileImage } =
		user.fromUserId;
	return (
		<div className="w-1/2 h-32 flex justify-between items-center bg-base-300 rounded-lg gap-4">
			<div className="flex gap-3">
				<img
					alt="Photo"
					src={profileImage.url}
					className="w-24 h-32 rounded-l-lg"
				/>
				<div className="py-2 flex flex-col gap-1">
					<p className="text-xl">{firstName + " " + lastName}</p>
					{age && gender && (
						<p className="text-xs">
							{age + ", " + gender.charAt(0).toUpperCase() + gender.slice(1)}
						</p>
					)}
					<p className="text-xs">{about}</p>
				</div>
			</div>
			<div className="flex flex-col justify-end gap-2 mx-2">
				<button
					className="btn btn-primary btn-sm"
					onClick={() => reviewRequest("rejected", user._id)}
				>
					Reject
				</button>
				<button
					className="btn btn-secondary btn-sm"
					onClick={() => reviewRequest("accepted", user._id)}
				>
					Accept
				</button>
			</div>
		</div>
	);
};

export default ConnectionRequests;
