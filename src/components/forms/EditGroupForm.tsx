import { Form } from "react-router-dom"
import { 
   InputContainer, 
   InputLabel, 
   InputField, 
   Button, 
} from "../../utils/styles"
import { GroupAvatarUpload } from "../avatar/GroupAvatarUpload";

export const EditGroupForm = () => {
   return (
      <Form>
         <GroupAvatarUpload />
         <InputContainer backgroundColor="#161616">
            <InputLabel htmlFor="groupName">Group Name</InputLabel>
            <InputField id="groupName" />
         </InputContainer>
         <Button style={{ margin: '10px 0' }}>Save</Button>
      </Form>
   );
};
