import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useParams, useSearchParams } from "react-router-dom";
import { ConversationPanel } from "../components/conversation/ConversationPanel";
import { ConversationSidebar } from "../components/conversation/ConversationSidebar";
import { AppDispatch } from "../store";
import { fetchConversationsThunk } from "../store/conversationSlice";
import { getConversations } from "../utils/api";
import { Page } from "../utils/styles";
import { ConversationType } from "../utils/types";

export const ConversationPage = () => {
	const { id } = useParams();
	const [conversations, setConversations] = useState<ConversationType[]>([]);
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		dispatch(fetchConversationsThunk())
	}, []);

	return (
		<Page>
			<ConversationSidebar conversations={conversations} />
				{!id && <ConversationPanel />}
			<Outlet />
		</Page>
	);
};