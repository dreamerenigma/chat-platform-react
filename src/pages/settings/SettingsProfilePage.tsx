import { useState } from 'react';
import { Edit } from 'akar-icons';
import { UserBanner } from '../../components/settings/profile/UserBanner';
import { Page } from '../../utils/styles';
import {
   ProfileAboutSection,
   ProfileAboutSectionHeader,
   ProfileDescriptionField,
   ProfileEditActionBar,
   ProfileSection,
   SettingsProfileUserDetails,
} from '../../utils/styles/settings';
import { Button } from '../../utils/styles/button';

export const SettingsProfilePage = () => {
   const [source] = useState('');
   const [sourceCopy, setSourceCopy] = useState(source);
   const [about, setAbout] = useState('hello world');
   const [editedAbout, setEditedAbout] = useState(about);
   const [isEditing, setIsEditing] = useState(false);

   const isChanged = () => editedAbout !== about || source !== sourceCopy;

   const reset = () => {
      setEditedAbout(about);
      setSourceCopy(source);
   };

   return (
      <Page>
         <UserBanner 
            source={source} 
            sourceCopy={sourceCopy} 
            setSourceCopy={setSourceCopy} 
         />
         <ProfileSection>
            <SettingsProfileUserDetails>
               <div className="avatar"></div>
               <span>@username</span>
            </SettingsProfileUserDetails>
            <ProfileAboutSection>
               <ProfileAboutSectionHeader>
                  <label htmlFor="about">About Me</label>
                  <Edit 
                     strokeWidth={2}
                     size={28} 
                     onClick={() => setIsEditing(!isEditing)}
                  />
               </ProfileAboutSectionHeader>
               <ProfileDescriptionField 
                  maxLength={200} 
                  disabled={!isEditing} 
                  value={editedAbout}
                  onChange={(e) => setAbout(e.target.value)}
               />
            </ProfileAboutSection>
         </ProfileSection>
         {isChanged() && (
            <ProfileEditActionBar>
               <div>
                  <span>You have unsaved changes</span>
               </div>
               <div className="buttons">
                  <Button size="md" variant="secondary" onClick={reset}>
                     Reset
                  </Button>
                  <Button size="md">Save</Button>
               </div>
            </ProfileEditActionBar>
         )}
      </Page>
   );
};
