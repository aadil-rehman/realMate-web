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

function App() {
	return (
		<>
			<Provider store={store}>
				<BrowserRouter basename="/">
					<Routes>
						<Route path="/" element={<LandingPage />} />
						<Route path="/app" element={<AppLayout />}>
							<Route path="/app/profile" element={<Profile />} />
							<Route path="/app/feed" element={<Feed />} />
							<Route path="/app/connections" element={<Connections />} />
							<Route path="/app/requests" element={<ConnectionRequests />} />
						</Route>
						<Route path="/login" element={<Login />} />
						<Route path="/signup" element={<Signup />} />
					</Routes>
				</BrowserRouter>
			</Provider>
		</>
	);
}

export default App;
