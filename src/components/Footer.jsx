import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<footer className="footer sm:footer-horizontal footer-center bg-base-300 text-base-content px-4 py-2 fixed bottom-0 w-full">
			<aside>
				<p>
					Copyright © {new Date().getFullYear()} - All rights reserved by
					RealMate Pvt. Ltd.
				</p>
			</aside>
			<div className="flex gap-4">
				<Link to="/termsofservice" className="link link-hover text-xs">
					Terms of Service
				</Link>
				<Link to="/privacy-policy" className="link link-hover text-xs">
					Privacy Policy
				</Link>
			</div>
		</footer>
	);
};

export default Footer;
