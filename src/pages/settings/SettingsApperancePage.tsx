import { useDispatch } from "react-redux";
import { setTheme } from "../../store/settings/settingsSlice";
import { Page } from "../../utils/styles"
import { SelectableTheme } from "../../utils/types";

export const SettingsApperancePage = () => {
   const dispath = useDispatch();

   const handleThemeChange = (theme: SelectableTheme) => {
      dispath(setTheme(theme));
      localStorage.setTheme('theme', theme);
   };

   return (
      <Page>
         <div>
            <span>Theme</span>
            <form>
               <input
                  type="radio"
                  id="dark"
                  name="theme"
                  onChange={(e) => handleThemeChange('dark')}
               />
               <label htmlFor="dark">Dark</label>
               <input
                  type="radio"
                  id="light"
                  name="theme"
                  onChange={(e) => handleThemeChange('light')}
               />
               <label htmlFor="light">Light</label>
            </form>
         </div>
      </Page>
   );
};
