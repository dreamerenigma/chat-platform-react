import { FC, useContext } from "react";
import { FriendListItemContainer } from "../../utils/styles/friends"
import { Friend } from "../../utils/types";
import { AuthContext } from "../../utils/context/AuthContext";

type Props = {
	friend: Friend;
};

export const FriendListItem: FC<Props> = ({ friend }) => {
	const { user } = useContext(AuthContext)
	return (
		<FriendListItemContainer>
			<div className="avatar"></div>
			<div>
				{user?.id === friend.sender.id
					? friend.receiver.email
					: friend.sender.email}
			</div>
		</FriendListItemContainer>
	);
};
