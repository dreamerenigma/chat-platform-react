import { Route, Routes } from 'react-router-dom';
import { ConversationChannelPage } from './pages/ConversationChannelPage';
import { ConversationPage } from './pages/ConversationPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';

function App() {
	return (
		<>
			<Routes>
				<Route path="/register" element={<RegisterPage />}></Route>
				<Route path="/login" element={<LoginPage />}></Route>
				<Route path="conversations" element={<ConversationPage />}>
					<Route path=":id" element={<ConversationChannelPage />} />
				</Route>
			</Routes>
		</>
	);
}

export default App;