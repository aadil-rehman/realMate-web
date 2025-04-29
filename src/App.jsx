import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./utils/store";
import Login from "./components/Login";
import AppLayout from "./components/AppLayout";
import Feed from "./components/Feed";
import Profile from "./components/Profile";
import Connections from "./components/Connections";
import ConnectionRequests from "./components/ConnectionRequests";
import LandingPage from "./components/LandingPage";
import Signup from "./components/Signup";
import Blog from "./components/Blog";
import MyBlogs from "./components/MyBlogs";
import CreateBlog from "./components/CreateBlog";
import EditBlog from "./components/EditBlog";
import TermsOfService from "./components/TermsOfService";
import Privacy from "./components/Privacy";
import CancellationAndRefundPolicy from "./components/CancellationAndRefundPolicy";
import ShippingAndDelivery from "./components/ShippingAndDelivery";
import ContactUs from "./components/ContactUs";
import HomePage from "./components/HomePage";
import Chat from "./components/Chat";
import ChatBoxHome from "./components/ChatBoxHome";
import ChatBox from "./components/ChatBox";
import UserProfile from "./components/UserProfile";

function App() {
	return (
		<>
			<Provider store={store}>
				<BrowserRouter basename="/">
					<Routes>
						<Route path="/app" element={<AppLayout />}>
							<Route path="/app/profile" element={<Profile />} />
							<Route path="/app/feed" element={<Feed />} />
							<Route path="/app/connections" element={<Connections />} />
							<Route path="/app/requests" element={<ConnectionRequests />} />
							<Route path="/app/blog/view/:blogId" element={<Blog />} />
							<Route path="/app/myblogs" element={<MyBlogs />} />
							<Route path="/app/blog/create" element={<CreateBlog />} />
							<Route path="/app/blog/edit/:blogId" element={<EditBlog />} />
							<Route path="/app/chat" element={<Chat />}>
								<Route path="/app/chat" element={<ChatBoxHome />} />
								<Route path="/app/chat/:targetUserId" element={<ChatBox />} />
							</Route>
							<Route
								path="/app/user-profile/:userId"
								element={<UserProfile />}
							/>
						</Route>

						<Route path="/" element={<HomePage />}>
							<Route path="/" element={<LandingPage />} />
							<Route path="/termsofservice" element={<TermsOfService />} />
							<Route path="/privacy-policy" element={<Privacy />} />
							<Route
								path="/cancellation-refund"
								element={<CancellationAndRefundPolicy />}
							/>
							<Route
								path="/shipping-delivery"
								element={<ShippingAndDelivery />}
							/>
							<Route path="/contact-us" element={<ContactUs />} />
							<Route path="/login" element={<Login />} />
							<Route path="/signup" element={<Signup />} />
						</Route>
					</Routes>
				</BrowserRouter>
			</Provider>
		</>
	);
}

export default App;
