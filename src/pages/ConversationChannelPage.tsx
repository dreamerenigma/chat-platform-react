import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { MessagePanel } from "../components/messages/MessagePanel";
import { AppDispatch, RootState } from "../store";
import { fetchMessagesThunk } from "../store/conversationSlice";
import { AuthContext } from "../utils/context/AuthContext";
import { SocketContext } from "../utils/context/SocketContent";
import { ConversationChannelPageStyle } from "../utils/styles";
import { MessageEventPayload, MessageType } from "../utils/types";

export const ConversationChannelPage = () => {
	const { user } = useContext(AuthContext);
	const socket = useContext(SocketContext);
	const [messages, setMessages] = useState<MessageType[]>([]);
	const { id } = useParams();
	const dispatch = useDispatch<AppDispatch>();
	const conversations = useSelector(
		(state: RootState) => state.conversation.conversations
	);

	useEffect(() => {
		const conversationId = parseInt(id!);
		console.log(conversations.find((c)=> c.id === 15));
		dispatch(fetchMessagesThunk(conversationId));
	}, []);

	useEffect(() => {
		socket.on('connected', () => console.log('Connected'));
		socket.on('onMessage', (payload: MessageEventPayload) => {
			console.log('Message Received');
			const { conversation, ...message } = payload;
			setMessages((prev) => [message, ...prev]);
		});
		return () => {
			socket.off('connected');
			socket.off('onMessage');
		}
	}, []);

	return (
		<ConversationChannelPageStyle>
			<MessagePanel messages={messages}></MessagePanel>
		</ConversationChannelPageStyle>
	);
};