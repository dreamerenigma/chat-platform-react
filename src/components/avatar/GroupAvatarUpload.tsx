import { useSelector } from "react-redux"
import { RootState } from "../../store"
import { CDN_URL } from "../../utils/constants";
import defaultAvatar from '../../__assets__/default_avatar.jpg';
import { FileInput } from "../../utils/styles/inputs/Textarea";
import { Dispatch, FC, SetStateAction, useRef, useState } from "react";
import { InputChangeEvent } from "../../utils/types";
import { AvatarUploadContainer } from "../../utils/styles";

type Props = {
   setFile: Dispatch<SetStateAction<File | undefined>>
};

export const GroupAvatarUpload: FC<Props> = ({ setFile }) => {
   const fileInputRef = useRef<HTMLInputElement>(null);
   const [source, setSource] = useState(''); 
   const { selectedGroupContextMenu } = useSelector(
      (state: RootState) => state.groups
   );

   const getGroupAvatar = () => {
      return selectedGroupContextMenu && selectedGroupContextMenu.avatar
         ? CDN_URL.BASE.concat(selectedGroupContextMenu.avatar)
         : defaultAvatar;
   };

   const onFileChange = (e: InputChangeEvent) => {
      const file = e.target.files?.item(0);
      if (file) {
         setSource(URL.createObjectURL(file));
         setFile(file);
      }
   }; 

   const onAvatarClick = () => fileInputRef.current?.click();

   return (
      <>
         <AvatarUploadContainer 
            onClick={onAvatarClick}
            url={source || getGroupAvatar()}
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
