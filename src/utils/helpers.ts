import { 
	ArrowCycle, 
	ChatDots, 
	Crown, 
	Minus, 
	Person, 
	PersonCross,
	Gear,
	
} from "akar-icons";
import { 
	IoMdVideocam,
	IoIosPerson, 
	IoIosNotifications, 
	IoIosLock, 
	IoMdColorPalette,
} from 'react-icons/io'; 
import { 
	Conversation, 
	Friend, 
	FriendRequest, 
	FriendRequestDetailsType, 
	Group,
	SettingsSidebarRouteType,
	User, 
	UserContextMenuActionType,
	UserSidebarRouteType, 
} from "./types";
import { IoMdInfinite } from "react-icons/io";

export const getRecipientFromConversation = (
	conversation?: Conversation,
	user?: User
) => {
	return user?.id === conversation?.creator.id
		? conversation?.recipient
		: conversation?.creator;
};

export const getUserContextMenuIcon = (type: UserContextMenuActionType) => {
	switch (type) {
		case 'kick':
			return { icon: PersonCross, color: '#ff0000' };
		case 'transfer_owner':
			return { icon: Crown, color: '#FFB800' };
		default: 
			return { icon: Minus, color: '#7c7c7c' };
	}
};

export const isGroupOwner = (user?: User, group?: Group) => 
	user?.id === group?.owner.id;

	export const getUserSidebarIcon = (id: string) => {
		switch (id) {
			case 'conversations':
				return ChatDots;
			case 'friends':
				return Person;
			case 'connections':
				return ArrowCycle;
			case 'settings':
				return Gear;
			case 'calls':
				return IoMdVideocam;
			default: 
				return ChatDots;
		}
	};

export const getSettingsSidebarIcon = (id: SettingsSidebarRouteType) => {
	switch(id) {
		case 'profile':
			return IoIosPerson;
		case 'security':
			return IoIosLock;
		case 'notifications':
			return IoIosNotifications;	
		case 'integrations':
			return IoMdInfinite;
		case 'apperance':
			return IoMdColorPalette;
	}
};

export const getFriendRequestDetails = (
	{ receiver, sender }: FriendRequest,
	user?: User
): FriendRequestDetailsType => 
	user?.id === receiver.id
		?	{
				status: 'incoming Friend Request',
				displayName: `{sender.firstName} {sender.lastName}`,
				user: sender,
				incoming: true,
			}
		:	{
				status: 'Outgoing Friend Request',
				displayName: `${receiver.firstName} ${receiver.lastName}`, 
				user: receiver,
				incoming: false,
			};

export const getUserFriendInstance = (
	authenticatedUser: User, 
	selectedFriend: Friend,
) =>
	authenticatedUser?.id === selectedFriend?.sender.id
		? selectedFriend?.receiver
		: selectedFriend?.sender;