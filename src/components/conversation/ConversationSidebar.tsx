import { 
	ConversationSidebarContainer,
	ConversationSidebarHeader,
	ConversationSidebarStyle,
} from "../../utils/styles";
import { TbEdit } from 'react-icons/tb';
import { CreateCoversationModal } from "../modals/CreateConversationModal";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { ConversationSelected } from "./ConversationSelected";
import { ConversationSidebarItem } from "./ConversationSidebarItem";
import { GroupSidebarItem } from "../groups/GroupSidebarItem";
import React from "react";

export const ConversationSidebar = () => {
	const [showModal, setShowModal] = React.useState(false);
	const conversations = useSelector(
		(state: RootState) => state.conversation.conversations);
	const groups = useSelector((state: RootState) => state.groups.groups);
	
	const selectedConversationType = useSelector(
		(state: RootState) => state.selectedConversationType.type
	);

	return (
		<>
			{showModal && <CreateCoversationModal setShowModal={setShowModal} />}
			<ConversationSidebarStyle>
				<ConversationSidebarHeader>
					<h1>Conversations</h1>
					<div onClick={() => setShowModal(!showModal)}>
						<TbEdit size={40} />
					</div>
				</ConversationSidebarHeader>
				<ConversationSidebarContainer>
					<ConversationSelected></ConversationSelected>
					<section>
						{selectedConversationType === 'private' 
							? conversations.map((conversation) => (
								<ConversationSidebarItem 
									key={conversation.id}
									conversation={conversation}
								/>
							)) : groups.map((group) => (
							<GroupSidebarItem key={group.id} group={group} />
						))}
					</section>
				</ConversationSidebarContainer>
			</ConversationSidebarStyle>
		</>
	);
};