import { useDispatch } from "react-redux";
import { Page } from "../../utils/styles"
import { setTheme } from "../../store/settings/settingsSlice";
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
                  onChange={(e) => dispath(setTheme('dark'))}
               />
               <label htmlFor="dark">Dark</label>
               <input
                  type="radio"
                  id="light"
                  name="theme"
                  onChange={(e) => dispath(setTheme('light'))}
               />
               <label htmlFor="light">Light</label>
            </form>
         </div>
      </Page>
   );
};
