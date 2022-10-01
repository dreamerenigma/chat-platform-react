import { Outlet, useParams, useSearchParams } from "react-router-dom";
import { ConversationPanel } from "../components/conversation/ConversationPanel";
import { ConversationSidebar } from "../components/conversation/ConversationSidebar";
import { Page } from "../utils/styles";
import mockConversations from '../__mocks__/conversations';

export const ConversationPage = () => {
	const { id } = useParams();
	console.log(id); 
	return (
		<Page>
			<ConversationSidebar conversations={mockConversations} />
				{!id && <ConversationPanel />}
			<Outlet />
		</Page>
	);
};