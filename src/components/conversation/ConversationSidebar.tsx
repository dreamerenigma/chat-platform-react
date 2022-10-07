import { ConversationSidebarContainer, ConversationSidebarHeader, ConversationSidebarItem, ConversationSidebarStyle } from "../../utils/styles";
import { TbEdit } from 'react-icons/tb';
import { ConversationType } from "../../utils/types";
import { FC, useContext, useState } from "react";
import styles from './index.module.scss';
import { useNavigate } from "react-router-dom";
import { CreateCoversationModal } from "../modals/CreateConversationModal";
import { AuthContext } from "../../utils/context/AuthContext";

type Props = {
	conversations: ConversationType[];
};

export const ConversationSidebar: FC<Props> = ({ conversations }) => {
	const navigate = useNavigate();
	const { user } = useContext(AuthContext);
	const [showModal, setShowModal] = useState(false);

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
					{conversations.map((conversation) => (
						<ConversationSidebarItem onClick={() => navigate(`/conversations/${conversation.id}`)}>
							<div className={styles.conversationAvatar}></div>
							{user?.email}
							{/* <div>
								<span className={styles.conversationName}>
									{conversation.name}
								</span>
								<span className={styles.conversationLastMessage}>
									{conversation.lastMessage}
								</span>
							</div> */}
						</ConversationSidebarItem>
					))}
				</ConversationSidebarContainer>
			</ConversationSidebarStyle>
		</>
	);
};