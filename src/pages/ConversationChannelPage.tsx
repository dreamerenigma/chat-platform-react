import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { MessagePanel } from "../components/messages/MessagePanel";
import { AppDispatch, RootState } from "../store";
import { updateConversation } from "../store/conversationSlice";
import { addMessage, fetchMessagesThunk } from "../store/messageSlice";
import { AuthContext } from "../utils/context/AuthContext";
import { SocketContext } from "../utils/context/SocketContent";
import { ConversationChannelPageStyle } from "../utils/styles";
import { MessageEventPayload, MessageType } from "../utils/types";

export const ConversationChannelPage = () => {
	const { user } = useContext(AuthContext);
	const socket = useContext(SocketContext);
	const { id } = useParams();
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		const conversationId = parseInt(id!);
		dispatch(fetchMessagesThunk(conversationId));
	}, [id]);

	useEffect(() => {
		socket.emit('onClientConnect', {
			conversationId: parseInt(id!), 
		});
		socket.on('onMessage', (payload: MessageEventPayload) => {
			console.log('Message Received');
			const { conversation, message } = payload;
			console.log(conversation, message);
			dispatch(addMessage(payload));
			dispatch(updateConversation(conversation));
		});
		return () => {
			socket.off('connected');
			socket.off('onMessage');
		}
	}, [id]);

	const sendTypingStatus = () => {
		console.log('You are typing');
		socket.emit('onUserTyping', { conversationId: id});
	};

	return (
		<ConversationChannelPageStyle>
			<MessagePanel sendTypingStatus={sendTypingStatus}></MessagePanel>
		</ConversationChannelPageStyle>
	);
};