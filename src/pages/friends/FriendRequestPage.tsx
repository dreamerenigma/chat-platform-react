import { useDispatch } from 'react-redux';
import { FriendRequestList } from '../../components/friends/FriendRequestList';
import { AppDispatch } from '../../store';

export const FriendRequestPage = () => {
	const dispatch = useDispatch<AppDispatch>();
	
	return <FriendRequestList />;
};
