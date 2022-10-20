import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import { ConversationPanel } from "../components/conversation/ConversationPanel";
import { ConversationSidebar } from "../components/conversation/ConversationSidebar";
import { AppDispatch, RootState } from "../store";
import { addConversation, fetchConversationsThunk, updateConversation } from "../store/conversationSlice";
import { addMessage } from "../store/messageSlice";
import { SocketContext } from "../utils/context/SocketContent";
import { Page } from "../utils/styles";
import { ConversationType, MessageEventPayload } from "../utils/types";

export const ConversationPage = () => {
	const { id } = useParams();
	const [conversations, setConversations] = useState<ConversationType[]>([]);
	const dispatch = useDispatch<AppDispatch>();
	const conversationsState = useSelector(
		(state: RootState) => state.conversation.conversations
	);

	const socket = useContext(SocketContext);

	useEffect(() => {
		console.log('Fetching Conversations in ConversationPage');
		console.log(conversations.find((c)=> c.id === 15));
		dispatch(fetchConversationsThunk());
	}, []);

	useEffect(() => {
		socket.emit('onClientConnect', {
			conversationId: parseInt(id!),
		});
		socket.on('connected', (data) => {
			console.log('Connected to Websocket');
			console.log(data);
		});
		socket.on('onMessage', (payload: MessageEventPayload) => {
			console.log('Message Received');
			const { conversation, message } = payload;
			console.log(conversation, message);
			dispatch(addMessage(payload));
			dispatch(updateConversation(conversation));
		});
		socket.on('onConversation', (payload: ConversationType) => {
			console.log('Received onConversation Event');
			console.log(payload);
			dispatch(addConversation(payload));
		});
		return () => {
			socket.off('connected');
			socket.off('onMessage');
			socket.off('onOnversation');
		};
	}, [id]);

	return (
		<Page>
			<ConversationSidebar conversations={conversations} />
				{!id && <ConversationPanel />}
			<Outlet />
		</Page>
	);
};