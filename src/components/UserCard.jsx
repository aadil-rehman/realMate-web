import React from "react";

const UserCard = (props) => {
	const { firstName, lastName, age, gender, about, photoUrl } = props.user;
	return (
		<div className="card bg-base-300 w-88 shadow-sm h-[75vh] my-10">
			<figure>
				<img src={photoUrl} alt="Shoes" />
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
						<button className="btn btn-primary">Ignore</button>
						<button className="btn btn-secondary">Interested</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default UserCard;
