import { useSelector } from "react-redux"
import { RootState } from "../../store"
import { CDN_URL } from "../../utils/constants";
import defaultAvatar from '../../__assets__/default_avatar.jpg';
import { FileInput } from "../../utils/styles/inputs/Textarea";
import { useRef } from "react";
import { InputChangeEvent } from "../../utils/types";
import { AvatarUploadContainer } from "../../utils/styles";

export const GroupAvatarUpload = () => {
   const fileInputRef = useRef<HTMLInputElement>(null);
   const { selectedGroupContextMenu } = useSelector(
      (state: RootState) => state.groups
   );

   const getGroupAvatar = () => {
      return selectedGroupContextMenu && selectedGroupContextMenu.avatar
         ? CDN_URL.BASE.concat(selectedGroupContextMenu.avatar)
         : defaultAvatar;
   };

   const onFileChange = (e: InputChangeEvent) => {};

   const onAvatarClick = () => fileInputRef.current?.click();

   return (
      <>
         <AvatarUploadContainer 
            onClick={onAvatarClick}
            url={getGroupAvatar()}
         ></AvatarUploadContainer>
         <FileInput 
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={onFileChange}
         />
      </>
   );
};
