import { FC } from "react";
import { ContextMenuEvent, Group, User } from "../../../utils/types";
import { GroupRecipientSidebarItem } from "../../../utils/styles";
import { Crown } from "akar-icons";
import { UserAvatar } from "../../users/UserAvatar";

type Props = {
   users: User[];
   group?: Group;
   onUserContextMenu: (e: ContextMenuEvent, user: User) => void;
};

export const OnlineGroupRecipients: FC<Props> = ({
   users,
   group,
   onUserContextMenu,
}) => {
   const formatStatusMessage = ({ presence }: User) => {
      if (!presence || !presence.statusMessage) return null;
      const { statusMessage } = presence;
      return statusMessage.length > 30
         ? statusMessage.slice(0, 30).concat('...')
         : statusMessage;
   };

   return(
      <>
      {users.map((user) => (
         <GroupRecipientSidebarItem
            online={true}
            onContextMenu={(e) => onUserContextMenu(e, user)}
         >
            <div className="left">
               <UserAvatar user={user} />
               <div className="recipientDetails">
                  <span>{user.firstName}</span>
                  <span className="status">{user.presence?.statusMessage}</span>
               </div>
            </div>
            {user.id === group?.owner.id && <Crown color="#ffbf00" />}
         </GroupRecipientSidebarItem>
      ))}
   </>
   )
};
