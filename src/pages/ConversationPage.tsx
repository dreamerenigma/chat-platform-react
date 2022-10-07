import { useEffect, useState } from "react";
import { Outlet, useParams, useSearchParams } from "react-router-dom";
import { ConversationPanel } from "../components/conversation/ConversationPanel";
import { ConversationSidebar } from "../components/conversation/ConversationSidebar";
import { getConversations } from "../utils/api";
import { Page } from "../utils/styles";
import { ConversationType } from "../utils/types";

export const ConversationPage = () => {
	const { id } = useParams();
	const [conversations, setConversations] = useState<ConversationType[]>([]);
	
	useEffect(() => {
		getConversations()
			.then(({ data }) => {
				setConversations(data);
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<Page>
			<ConversationSidebar conversations={conversations} />
				{!id && <ConversationPanel />}
			<Outlet />
		</Page>
	);
};