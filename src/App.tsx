import React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import { AuthenticationPage } from './pages/AuthenticationPage';

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<AuthenticationPage />}></Route>
				<Route
					path="conversations"
					element={
						<div>
						<div>Conversation</div>
						<Outlet />
					</div>
				}
			>
					<Route path=":id" element={<div>Conversation ID Page</div>} />
				</Route>
			</Routes>
		</>
	);
}

export default App;