import { Outlet } from "react-router-dom";
import { UserSidebar } from "../components/sidebars/UserSidebar"
import { LayoutPage } from "../utils/styles";
import { useContext, useEffect } from "react";
import { SocketContext } from "../utils/context/SocketContent";
import { AcceptFriendRequestResponse, FriendRequest } from "../utils/types";
import { AppDispatch } from "../store";
import { useDispatch } from "react-redux";
import { addFriendRequest, removeFriendRequest } from "../store/friends/friendsSlice";

export const AppPage = () => {
	const socket = useContext(SocketContext);
	const dispatch = useDispatch<AppDispatch>();
	useEffect(() => {
		socket.on('onFriendRequestReceived', (payload: FriendRequest) => {
			console.log('onFriendRequestReceived');
			console.log(payload);
			dispatch(addFriendRequest(payload));
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
			}
		);

		return () => {
			socket.removeAllListeners();
		};
	}, []);

	return (
		<LayoutPage>
			<UserSidebar />
			<Outlet />
		</LayoutPage>
	);
};
