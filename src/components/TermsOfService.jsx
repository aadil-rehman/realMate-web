import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";

const TermsOfService = () => {
	return (
		<>
			<NavBar />
			<div className="p-6 max-w-4xl mx-auto text-sm leading-relaxed mt-20">
				<h1 className="text-2xl font-bold mb-4">Terms of Service</h1>
				<p>
					Welcome to RealMate. By using our platform, you agree to abide by the
					following terms and conditions:
				</p>

				<h2 className="mt-4 font-semibold">1. Acceptance of Terms</h2>
				<p>
					By accessing or using RealMate, you agree to be bound by these Terms
					of Service.
				</p>

				<h2 className="mt-4 font-semibold">2. User Conduct</h2>
				<p>
					You agree not to post any offensive, vulgar, or misleading content.
					RealMate reserves the right to remove such content and/or suspend
					accounts.
				</p>

				<h2 className="mt-4 font-semibold">3. Content Ownership</h2>
				<p>
					Users retain ownership of the content they post. However, by posting
					on RealMate, you grant us a non-exclusive license to display and share
					that content within the platform.
				</p>

				<h2 className="mt-4 font-semibold">4. Safety and Authenticity</h2>
				<p>
					RealMate strives to ensure user authenticity. We prohibit fake
					profiles and take safety seriously. Users should report suspicious
					activity immediately.
				</p>

				<h2 className="mt-4 font-semibold">5. Modifications</h2>
				<p>
					We may update these terms occasionally. Continued use of RealMate
					constitutes your acceptance of any changes.
				</p>

				<p className="mt-6">
					If you have questions, contact us at support@realmate.com.
				</p>
			</div>
			<Footer />
		</>
	);
};

export default TermsOfService;
