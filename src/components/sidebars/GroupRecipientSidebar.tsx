import { 
	GroupRecipientSidebarHeader, 
	GroupRecipientSidebarItem, 
	GroupRecipientSidebarItemContainer, 
	GroupRecipientSidebarStyle, 
	MessageItemAvatar
} from "../../utils/styles";
import { PeopleGroup } from 'akar-icons';
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { selectGroupById } from "../../store/groupSlice";
import { useParams } from "react-router-dom";

export const GroupRecipientsSidebar = () => {
	const { id } = useParams();
	const group = useSelector((state: RootState) => 
		selectGroupById(state, parseInt(id!))
	);

	return (
		<GroupRecipientSidebarStyle>
			<GroupRecipientSidebarHeader>
				<span>Participants</span>
				<PeopleGroup />
			</GroupRecipientSidebarHeader>
			<GroupRecipientSidebarItemContainer>
				{group?.users.map((user) => (
					<GroupRecipientSidebarItem>
						<MessageItemAvatar />
						<span>{user.firstName}</span>
					</GroupRecipientSidebarItem>
				))}
			</GroupRecipientSidebarItemContainer>
		</GroupRecipientSidebarStyle>
	);
};