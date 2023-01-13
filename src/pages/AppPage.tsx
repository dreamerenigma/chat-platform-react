import { Outlet, useNavigate } from "react-router-dom";
import { UserSidebar } from "../components/sidebars/UserSidebar"
import { useContext, useEffect } from "react";
import { SocketContext } from "../utils/context/SocketContext";
import { AppDispatch, RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import {
	addFriendRequest,
	removeFriendRequest,
} from "../store/friends/friendsSlice";
import { LayoutPage } from "../utils/styles";
import { useToast } from "../utils/hooks/useToast";
import { AcceptFriendRequestResponse, FriendRequest, SelectableTheme } from "../utils/types";
import { IoMdPersonAdd } from 'react-icons/io';
import { BsFillPersonCheckFill } from 'react-icons/bs';
import { fetchFriendRequestThunk } from "../store/friends/friendsThunk";
import { AuthContext } from "../utils/context/AuthContext";
import { DarkTheme, LightTheme } from "../utils/themes";
import { ThemeProvider } from "styled-components";

export const AppPage = () => {
	const { user } = useContext(AuthContext);
	const socket = useContext(SocketContext);
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
	const { info } = useToast({ theme: 'dark' });
	const storageTheme = localStorage.getItem('theme') as SelectableTheme; 
	const { theme } = useSelector((state: RootState) => state.settings);
	useEffect(() => {
		dispatch(fetchFriendRequestThunk());
	}, [dispatch]);

	useEffect(() => {
		socket.on('onFriendRequestReceived', (payload: FriendRequest) => {
			console.log('onFriendRequestReceived');
			console.log(payload);
			dispatch(addFriendRequest(payload));
			info(`Incoming Friend Request from ${payload.sender.firstName}`, {
				position: 'bottom-left',
				icon: IoMdPersonAdd,
				onClick: () => navigate('/friends/requests'),
			});
		});

		socket.on('onFriendRequestCancelled', (payload: FriendRequest) => {
			console.log('onFriendRequestCancelled');
			console.log(payload);
			dispatch(removeFriendRequest(payload));
		});

		socket.on(
			'onFriendRequestAccepted',
			(payload: AcceptFriendRequestResponse) => {
				console.log('onFriendRequestAccepted');
				dispatch(removeFriendRequest(payload.friendRequest));
				socket.emit('getOnlineFriends');
				info(
					`${payload.friendRequest.receiver.firstName} accepted your friend request`,
					{
						position: 'bottom-left',
						icon: BsFillPersonCheckFill,
						onClick: () => navigate('/friends'),
					}
				);
			}
		);

		socket.on('onFriendRequestRejected', (payload: FriendRequest) => {
			console.log('onFriendRequestRejected');
			dispatch(removeFriendRequest(payload));
		});

		return () => {
			console.log('Removing all event listeners');
			socket.off('onFriendRequestCancelled');
			socket.off('onFriendRequestRejected');
			socket.off('onFriendRequestReceived');
			socket.off('onFriendRequestAccepted');
		};
	}, [socket]);

	return (
		<ThemeProvider 
			theme={
				storageTheme 
					? (theme === 'dark' 
						? DarkTheme 
						: LightTheme)
					: theme === 'dark'
					? DarkTheme
					: LightTheme
			}
		>
			<LayoutPage>
				<UserSidebar />
				<Outlet />
			</LayoutPage>
		</ThemeProvider>
	);
};
