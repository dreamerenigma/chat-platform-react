import { useDispatch } from 'react-redux';
import { FriendRequestList } from '../../components/friends/FriendRequestList';
import { AppDispatch } from '../../store';
import { useEffect } from 'react';
import { fetchFriendsThunk } from '../../store/friends/friendsThunk';

export const FriendRequestPage = () => {
	const dispatch = useDispatch<AppDispatch>();
	
	return <FriendRequestList />;
};