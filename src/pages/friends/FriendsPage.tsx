import { useEffect } from "react";
import { fetchFriendsThunk } from "../../store/friends/friendsThunk";
import { AppDispatch } from '../../store';
import { useDispatch } from "react-redux";
import { FriendList } from "../../components/friends/FriendsList";

export const FriendsPage = () => {
	const dispatch = useDispatch<AppDispatch>();
	useEffect(() => {
		dispatch(fetchFriendsThunk());
	}, [dispatch]);

	return <FriendList />;
};
