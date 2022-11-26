import {
	GroupRecipientSidebarHeader,
	GroupRecipientSidebarItem,
	GroupRecipientSidebarItemContainer,
	GroupRecipientSidebarStyle,
	MessageItemAvatar,
} from "../../utils/styles";
import { PeopleGroup } from 'akar-icons';
import { AppDispatch, RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { selectGroupById } from "../../store/groupSlice";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../../utils/context/SocketContent";
import { User } from "../../utils/types";
import { setContextMenuLocation, setSelectedUser, toggleContextMenu } from "../../store/groupRecipientsSidebarSlice";
import { SelectedParticipantContextMenu } from "../context-menus/SelectedParticipantContextMenu";

export const GroupRecipientsSidebar = () => {
	const { id: groupId } = useParams();
	const [onlineUsers, setOnlineUsers] = useState<User[]>([]);
	const dispatch = useDispatch<AppDispatch>();
	const socket = useContext(SocketContext);
	const group = useSelector((state: RootState) =>
		selectGroupById(state, parseInt(groupId!))
	);
	const groupSidebarState = useSelector(
		(state: RootState) => state.groupSidebar
	);

	useEffect(() => {
		const handleClick = () => dispatch(toggleContextMenu(false));
		window.addEventListener('click', handleClick);
		return () => window.removeEventListener('click', handleClick);
	}, [groupId]);

	useEffect(() => {
		socket.emit('getOnlineGroupUsers', { groupId });
		const interval = setInterval(() => {
			socket.emit('getOnlineGroupUsers', { groupId });
		}, 5000);
		socket.on('onlineGroupUsersReceived', (payload) => {
			console.log('received onlinegroupUSersReceived event');
			setOnlineUsers(payload.onlineUsers);
		});
		return () => {
			console.log('Clearing Interval for GroupRecipientSidebar');
			clearInterval(interval);
			socket.off('onlineGroupUsersReceived');
		};
	}, [group, groupId]);

	useEffect(() => {
		const handleResize = (e: UIEvent) => dispatch(toggleContextMenu(false));
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	const onUserContextMenu = (
		e: React.MouseEvent<HTMLDivElement, MouseEvent>,
		user: User
	) => {
		e.preventDefault();
		dispatch(toggleContextMenu(true));
		dispatch(setContextMenuLocation({ x: e.pageX, y: e.pageY }));
		dispatch(setSelectedUser(user));
	};

	return (
		<GroupRecipientSidebarStyle>
			<GroupRecipientSidebarHeader>
				<span>Participants</span>
			</GroupRecipientSidebarHeader>
			<GroupRecipientSidebarItemContainer>
				<span>Online Users</span>
				{onlineUsers.map((user) => (
					<GroupRecipientSidebarItem
						onContextMenu={(e) => onUserContextMenu(e, user)}
					>
						<MessageItemAvatar />
						<span>{user.firstName}</span>
					</GroupRecipientSidebarItem>
				))}
				<span>Offline Users</span>
				{group?.users
					.filter(
						(user) =>
							!onlineUsers.find((onlineUser) => onlineUser.id === user.id)
					)
					.map((user) => (
						<GroupRecipientSidebarItem
							onContextMenu={(e) => onUserContextMenu(e, user)}
						>
							<MessageItemAvatar />
							<span>{user.firstName}</span>
						</GroupRecipientSidebarItem>
					))}
				{groupSidebarState.showUserContextMenu && (
					<SelectedParticipantContextMenu points={groupSidebarState.points} />
				)}
			</GroupRecipientSidebarItemContainer>
		</GroupRecipientSidebarStyle>
	);
};
