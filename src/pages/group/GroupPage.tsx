import { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import { ConversationPanel } from "../../components/conversation/ConversationPanel";
import { ConversationSidebar } from "../../components/conversation/ConversationSidebar";
import { AppDispatch } from "../../store";
import { addGroup, fetchGroupsThunk } from "../../store/groupSlice";
import { updateType } from "../../store/selectedSlice";
import { SocketContext } from "../../utils/context/SocketContent";
import { Group, GroupMessageEventPayload } from "../../utils/types";
import { addGroupMessage } from '../../store/groupMessageSlice';

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

		return () => {
			socket.off('onGroupMessage');
			socket.off('onGroupCreate');
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
