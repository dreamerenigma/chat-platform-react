import { useEffect } from "react";
import { FriendsList } from "../../components/friends/FriendsList";
import { fetchFriendsThunk } from "../../store/friends/friendsThunk";
import { AppDispatch } from '../../store';
import { useDispatch } from "react-redux";

export const FriendsPage = () => {
	const dispatch = useDispatch<AppDispatch>();
	useEffect(() => {
		dispatch(fetchFriendsThunk());
	}, [dispatch]);

	return <FriendsList />;
};
