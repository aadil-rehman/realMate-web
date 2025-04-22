const ContactUs = () => {
	return (
		<div className="p-6 max-w-4xl mx-auto text-sm leading-relaxed mt-20">
			<h1 className="text-2xl font-bold mb-4">Contact Us</h1>
			<p>We’d love to hear from you!</p>
			<p className="mt-2">
				Email:{" "}
				<a href="mailto:support@realmate.com" className="text-blue-600">
					support@realmate.com
				</a>
			</p>
			<p>Phone: +91 7065830366</p>
			<p className="mt-2">Working Hours: Mon–Fri, 10am – 6pm IST</p>
		</div>
	);
};

export default ContactUs;
