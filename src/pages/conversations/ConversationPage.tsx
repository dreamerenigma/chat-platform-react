import { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import { ConversationPanel } from "../../components/conversation/ConversationPanel";
import { ConversationSidebar } from "../../components/conversation/ConversationSidebar";
import { AppDispatch } from "../../store";
import { 
	addConversation, 
	fetchConversationsThunk, 
	updateConversation,
} from "../../store/conversationSlice";
import { addMessage, deleteMessage } from "../../store/messageSlice";
import { updateType } from "../../store/selectedSlice";
import { SocketContext } from "../../utils/context/SocketContent";
import { Page } from "../../utils/styles";
import { Conversation, MessageEventPayload } from "../../utils/types";

export const ConversationPage = () => {
	const { id } = useParams();
	const dispatch = useDispatch<AppDispatch>();
	const socket = useContext(SocketContext);

	useEffect(() => {
		dispatch(updateType('private'));
		dispatch(fetchConversationsThunk());
	}, []);

	useEffect(() => {
		socket.on('onMessage', (payload: MessageEventPayload) => {
			console.log('Message Received');
			const { conversation, message } = payload;
			console.log(conversation, message);
			dispatch(addMessage(payload));
			dispatch(updateConversation(conversation));
		});
		socket.on('onConversation', (payload: Conversation) => {
			console.log('Received onConversation Event');
			console.log(payload);
			dispatch(addConversation(payload));
		});
		socket.on('onMessageDelete', (payload) => {
			console.log('Message Deleted');
			console.log(payload);
			dispatch(deleteMessage(payload));
		});
		return () => {
			socket.off('connected');
			socket.off('onMessage');
			socket.off('onConversation');
			socket.off('onMessageDelete');
		};
	}, [id]);

	return (
		<Page>
			<ConversationSidebar />
				{!id && <ConversationPanel />}
			<Outlet />
		</Page>
	);
};