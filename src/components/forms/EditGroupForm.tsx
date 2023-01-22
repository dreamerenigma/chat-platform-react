import { Form } from "react-router-dom"
import { 
   InputContainer, 
   InputLabel, 
   InputField,
   ButtonContainer,
   Button, 
} from "../../utils/styles"
import { GroupAvatarUpload } from "../avatar/GroupAvatarUpload";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { FormEvent } from "../../utils/types";
import { 
   setIsSavingChanges, 
   setShowEditGroupModal, 
   updateGroupDetailsThunk, 
} from "../../store/groupSlice";
import { useToast } from "../../utils/hooks/useToast";
import { MoonLoader } from "react-spinners";

export const EditGroupForm = () => {
   const { selectedGroupContextMenu:  group, isSavingChanges } = useSelector(
      (state: RootState) => state.groups
   );
   const dispatch = useDispatch<AppDispatch>();
   const formRef = useRef<HTMLDivElement>(null);
   const [file, setFile] = useState<File>();
   const [newGroupTitle, setNewGroupName] = useState(group?.title || '');
   const { success, error } = useToast({ theme: 'dark' }); 
   const [groupName, setGroupName] = useState(group?.title || '');
   const isStateChanged = () => file || group?.title !== groupName;

   const onSubmit = (e: FormEvent) => {
      e.preventDefault();
      if (!group) throw new Error('Group Undefined');
      const formData = new FormData();
      file && formData.append('avatar', file);
      newGroupTitle && 
         group.title !== newGroupTitle &&
         formData.append('title', newGroupTitle);
      dispatch(setIsSavingChanges(true));
      dispatch(updateGroupDetailsThunk({ id: group.id, data: formData }))
      .then(() => {
         dispatch(setShowEditGroupModal(false));
         success('Group Details Updated!');
      })
      .catch((err) => {
         console.log(err);
         error('Error Saving Changes. Try again.')
      })
      .finally(() => dispatch(setIsSavingChanges(false)));
   };

   return (
      <Form onSubmit={onSubmit}>
         <GroupAvatarUpload setFile={setFile} />
         <InputContainer backgroundColor="#161616">
            <InputLabel htmlFor="groupName">Group Name</InputLabel>
            <InputField 
               id="groupName" 
               value={groupName}
               onChange={(e) => setGroupName(e.target.value)}
               disabled={isSavingChanges}
            />
         </InputContainer>
         <Button
            style={{ margin: '10px 0' }}
            disabled={!isStateChanged() || isSavingChanges}
         >
            Save
         </Button>
      </Form>
   );
};
