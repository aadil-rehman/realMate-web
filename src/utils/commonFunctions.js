export const shortenString = (str, maxLength) => {
	if (!str) return "";
	return str.length > maxLength ? str.slice(0, maxLength) + "..." : str;
};

export const formatTime = (dateString) => {
	const date = new Date(dateString);

	const hours = date.getHours();
	const minutes = date.getMinutes();

	const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
		.toString()
		.padStart(2, "0")}`;

	return formattedTime;
};
