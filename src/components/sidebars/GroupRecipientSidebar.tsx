import { 
	GroupRecipientSidebarHeader, 
	GroupRecipientSidebarItem, 
	GroupRecipientSidebarItemContainer, 
	GroupRecipientSidebarStyle, 
	MessageItemAvatar,
} from "../../utils/styles";
import { PeopleGroup } from 'akar-icons';
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { selectGroupById } from "../../store/groupSlice";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { socket } from "../../utils/context/SocketContent";

export const GroupRecipientsSidebar = () => {
	const { id: groupId } = useParams();
	const group = useSelector((state: RootState) => 
		selectGroupById(state, parseInt(groupId!))
	);

	useEffect(() => {
		const interval = setInterval(() => {
			console.log(`Pining Group ${groupId}`);
			socket.emit('getOnlineGroupUsers', { groupId });
		}, 20000);
		return () => {
			console.log('Clearing Interval for GroupRecipientSidebar');
			clearInterval(interval);
		};
	}, [groupId]);

	return (
		<GroupRecipientSidebarStyle>
			<GroupRecipientSidebarHeader>
				<span>Participants</span>
				<PeopleGroup />
			</GroupRecipientSidebarHeader>
			<GroupRecipientSidebarItemContainer>
				<span>Online Users</span>
				{onlineUsers.map((user) => (
					<GroupRecipientSidebarItem>
						<MessageItemAvatar />
						<span>{user.firstName}</span>
					</GroupRecipientSidebarItem>
				))}
				<span>Offline Users</span>
				{offlineUsers.map((user) => (
					<GroupRecipientSidebarItem>
						<MessageItemAvatar />
						<span>{user.firstName}</span>
					</GroupRecipientSidebarItem>
				))}
			</GroupRecipientSidebarItemContainer>
		</GroupRecipientSidebarStyle>
	);
};
