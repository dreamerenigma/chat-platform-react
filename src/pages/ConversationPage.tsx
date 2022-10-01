import { Outlet, useParams, useSearchParams } from "react-router-dom";
import { ConversationPanel } from "../components/conversation/ConversationPanel";
import { ConversationSidebar } from "../components/conversation/ConversationSidebar";
import { Page } from "../utils/styles";

export const ConversationPage = () => {
	const { id } = useParams();
	return (
		<Page>
			<ConversationSidebar />
				{!id && <ConversationPanel />}
			<Outlet />
		</Page>
	);
};