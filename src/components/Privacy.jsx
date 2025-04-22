import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";

const Privacy = () => {
	return (
		<div className="p-6 max-w-4xl mx-auto text-sm leading-relaxed mt-20">
			<h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
			<p>
				This Privacy Policy outlines how RealMate collects, uses, and protects
				your data.
			</p>

			<h2 className="mt-4 font-semibold">1. Data Collection</h2>
			<p>
				We collect basic profile information, blogs, and interactions like
				likes/comments to enhance your experience.
			</p>

			<h2 className="mt-4 font-semibold">2. Use of Information</h2>
			<p>
				Your data is used to personalize your feed, recommend connections, and
				improve platform functionality.
			</p>

			<h2 className="mt-4 font-semibold">3. Cookies</h2>
			<p>
				We use cookies to keep you logged in and improve your browsing
				experience. You may disable cookies in your browser settings.
			</p>

			<h2 className="mt-4 font-semibold">4. Data Sharing</h2>
			<p>
				We do not sell your data. Some non-personal data may be shared with
				partners for analytics and improvement purposes.
			</p>

			<h2 className="mt-4 font-semibold">5. Account Security</h2>
			<p>
				Keep your login information secure. RealMate is not responsible for
				unauthorized access due to user negligence.
			</p>

			<h2 className="mt-4 font-semibold">6. Contact</h2>
			<p>
				If you have questions or concerns about your privacy, please contact us
				at privacy@realmate.com.
			</p>
		</div>
	);
};

export default Privacy;
