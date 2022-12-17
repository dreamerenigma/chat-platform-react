import { FriendListContainer } from "../../utils/styles/friends"
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { FriendListItem } from "./FriendListItem";

export const FriendsList = () => {
	const friends =  useSelector((state: RootState) => state.friends.friends);
	
	return (
		<FriendListContainer>
			{friends.map((friend) => (
				<FriendListItem key={friend.id} friend={friend} />
			))}
		</FriendListContainer>
	);
};
