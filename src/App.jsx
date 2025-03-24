import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./NavBar";
import AppLayout from "./AppLayout";
import Login from "./Login";

function App() {
	return (
		<>
			<BrowserRouter basename="/">
				<Routes>
					<Route path="/" element={<AppLayout />}>
						<Route path="login" element={<Login />} />
						<Route path="test" element={<div>test</div>} />
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
