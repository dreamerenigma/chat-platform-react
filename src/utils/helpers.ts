import { 
	ArrowCycle, 
	ChatDots, 
	Gear, 
	Person 
} from "akar-icons";

import { 
	Conversation, 
	ConversationMessage, 
	User, 
	UserSidebarRouteType 
} from "./types";

export const getRecipientFromConversation = (
	conversation?: Conversation,
	user?: User
) => {
	return user?.id === conversation?.creator.id
		? conversation?.recipient
		: conversation?.creator;
};

export const getUserSidebarIcon = (id: UserSidebarRouteType) => {
	switch (id) {
		case 'conversations':
			return ChatDots;
		case 'friends':
			return Person;
		case 'connections':
			return ArrowCycle;
		case 'settings':
			return Gear;
		default:
			return ChatDots;
	}
};