import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<footer className="flex justify-between items-center bg-base-300 text-base-content px-4 py-2 fixed bottom-0 w-full text-sm">
			<div className="flex flex-col gap-1">
				<div className="flex gap-4">
					<Link to="/termsofservice" className="link link-hover text-[10px]">
						Terms of Service
					</Link>
					<Link to="/privacy-policy" className="link link-hover text-[10px]">
						Privacy Policy
					</Link>
				</div>
				<div className="flex gap-4">
					<Link to="/shipping-delivery" className="link link-hover text-[10px]">
						Shipping and Delivery
					</Link>
					<Link to="/contact-us" className="link link-hover text-[10px]">
						Contact us
					</Link>
				</div>
				<Link to="/cancellation-refund" className="link link-hover text-[10px]">
					Cancellation and Refund Policy
				</Link>
			</div>
			<p className="whitespace-nowrap">
				Copyright © {new Date().getFullYear()} - All rights reserved by RealMate
				Pvt. Ltd.
			</p>
		</footer>
	);
};

export default Footer;
