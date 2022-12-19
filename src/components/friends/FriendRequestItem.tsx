import { FC, useContext } from "react";
import { FriendRequsetItemContainer } from "../../utils/styles/friends";
import { FriendRequest } from "../../utils/types";
import { AuthContext } from "../../utils/context/AuthContext";

type Props = {
	friendRequest: FriendRequest;
};

export const FriendRequestItem: FC<Props> = ({ friendRequest }) => {
	const { user } = useContext(AuthContext);
	return (
		<FriendRequsetItemContainer>
			<div className="avatar"></div>
			<div>
				{user?.id === friendRequest.sender.id ? (
					<div>Outgoing request to {friendRequest.receiver.email}</div>
				) : (
					<div>Incoming request to {friendRequest.sender.email}</div>
				)}
			</div>
		</FriendRequsetItemContainer>
	);
};
