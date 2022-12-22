import { useContext, useEffect } from "react";
import { fetchFriendsThunk } from "../../store/friends/friendsThunk";
import { AppDispatch } from '../../store';
import { useDispatch } from "react-redux";
import { FriendList } from "../../components/friends/FriendList";
import { SocketContext } from "../../utils/context/SocketContent";
import { Friend } from "../../utils/types";
import { setOfflineFriends, setOnlineFriends } from "../../store/friends/friendsSlice";

export const FriendsPage = () => {
	const dispatch = useDispatch<AppDispatch>();
	const socket = useContext(SocketContext);

	useEffect(() => {
		dispatch(fetchFriendsThunk());
	}, [dispatch]);

	useEffect(() => {
		socket.emit('getOnlineFriends');
		const interval = setInterval(() => {
			socket.emit('getOnlineFriends');
		}, 10000);

		return () => {
			console.log('clearing interval');
			clearInterval(interval);
			socket.removeAllListeners();
		};
	}, []);

	useEffect(() => {
		socket.on('getOnlineFriends', (friends: Friend[]) => {
			console.log('received online friends');
			console.log(friends);
			dispatch(setOnlineFriends(friends));
			dispatch(setOfflineFriends());
		}); 
	}, []);
	
	return <FriendList />;
};
