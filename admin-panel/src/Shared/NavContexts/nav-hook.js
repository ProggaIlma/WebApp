import { useState } from "react";
export const useNav = () => {
  const [iconsLevel, setIconsLevel] = useState(0);
  const [settingsBarLevel, setSettingsBarLevel] = useState(0);
  const [headerTitle, setHeaderTitle] = useState('Subscriber');

  const setSBarIcoLvlFrmSRoutes = (inIconsLevel, inSidebarLevel) => {
    setIconsLevel(inIconsLevel);
    setSettingsBarLevel(inSidebarLevel);
  }
  return {
    iconsLevel, setIconsLevel,
    settingsBarLevel, setSettingsBarLevel,
    headerTitle, setHeaderTitle,
    setSBarIcoLvlFrmSRoutes
  };
};
