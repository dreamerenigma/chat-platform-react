import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { FriendListContainer } from "../../utils/styles/friends"
import { FriendListItem } from "./FriendListItem";
import { Friend } from '../../utils/types'; 

export const FriendList = () => {
	const { friends, onlineFriends, offlineFriends } = useSelector(
		(state: RootState) => state.friends
	);

	return (
		<FriendListContainer>
			{onlineFriends.length > 0 && <span>Online ({onlineFriends.length})</span>}
			{onlineFriends.map((friend) => (
				<FriendListItem key={friend.id} friend={friend} />
			))}
			{offlineFriends.length > 0 && <span>Offline ({onlineFriends.length})</span>}
			{onlineFriends.map((friend) => (
				<FriendListItem key={friend.id} friend={friend} />
			))}
		</FriendListContainer>
	);
};
