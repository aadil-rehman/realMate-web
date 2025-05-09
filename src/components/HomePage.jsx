import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const HomePage = () => {
	return (
		<div>
			<NavBar />
			<Outlet />
			<Footer />
		</div>
	);
};

export default HomePage;
