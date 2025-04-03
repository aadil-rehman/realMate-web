import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./utils/store";
import Login from "./components/Login";
import AppLayout from "./components/AppLayout";
import Feed from "./components/Feed";
import Profile from "./components/Profile";
import Connections from "./components/Connections";
import ConnectionRequests from "./components/ConnectionRequests";

function App() {
	return (
		<>
			<Provider store={store}>
				<BrowserRouter basename="/">
					<Routes>
						<Route path="/" element={<AppLayout />}>
							<Route path="login" element={<Login />} />
							<Route path="/profile" element={<Profile />} />
							<Route path="/" element={<Feed />} />
							<Route path="/connections" element={<Connections />} />
							<Route path="/requests" element={<ConnectionRequests />} />
						</Route>
					</Routes>
				</BrowserRouter>
			</Provider>
		</>
	);
}

export default App;
