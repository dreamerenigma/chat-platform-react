import { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import { ConversationPanel } from "../../components/conversation/ConversationPanel";
import { AppDispatch } from "../../store";
import { addGroup, fetchGroupsThunk, updateGroup } from "../../store/groupSlice";
import { updateType } from "../../store/selectedSlice";
import { SocketContext } from "../../utils/context/SocketContent";
import { AddGroupUserMessagePayload, Group, GroupMessageEventPayload } from "../../utils/types";
import { addGroupMessage } from '../../store/groupMessageSlice';
import { ConversationSidebar } from "../../components/sidebars/ConversationSidebar";

export const GroupPage = () => {
	const { id } = useParams();
	const dispatch = useDispatch<AppDispatch>();
	const socket = useContext(SocketContext);

	useEffect(() => {
		dispatch(updateType('group'));
		dispatch(fetchGroupsThunk());
	}, []);

	useEffect(() => {
		socket.on('onGroupMessage', (payload: GroupMessageEventPayload) => {
			console.log('Group Message Received');
			const { group, message } = payload;
			console.log(group, message);
			dispatch(addGroupMessage(payload));
		});

		socket.on('onGroupCreate', (payload: Group) => {
			console.log('Group Created...');
			dispatch(addGroup(payload));
		});

		/**
		 * Adds the group for yhe user being added
		 * to the group.
		 */
		socket.on('onGroupUserAdd', (payload) => {
			console.log('onGroupUserAdd');
			console.log(payload);
			dispatch(addGroup(payload));
		});

		/**
		 * Update all other clients in the room
		 * so that they can also see the participant
		 */
		socket.on(
			'onGroupReceivedNewUser',
			(payload: AddGroupUserMessagePayload) => {
				console.log(('Received onGroupReceivedNewUser'))
				dispatch(updateGroup(payload.group));
			}
		);

		return () => {
			socket.off('onGroupMessage');
			socket.off('onGroupCreate');
			socket.off('onGroupUserAdd');
			socket.off('onGroupReceivedNewUser');
		};
	}, [id]);

	return (
		<>
			<ConversationSidebar />
			{!id && <ConversationPanel />}
			<Outlet />
		</>
	);
};
