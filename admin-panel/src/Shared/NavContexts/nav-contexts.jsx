//nav-contexts.js

import React, { createContext } from "react";
export const NavContext = createContext();
import { useNav } from "./nav-hook";
const NavContextProvider = (props) => {
  const {
    iconsLevel, setIconsLevel,
    settingsBarLevel, setSettingsBarLevel,
    headerTitle, setHeaderTitle,
    setSBarIcoLvlFrmSRoutes
  } = useNav(props);
  return (
    <NavContext.Provider
      value={{
        iconsLevel: iconsLevel, setIconsLevel: setIconsLevel,
        settingsBarLevel: settingsBarLevel, setSettingsBarLevel: setSettingsBarLevel,
        setSBarIcoLvlFrmSRoutes: setSBarIcoLvlFrmSRoutes,
        headerTitle: headerTitle, setHeaderTitle: setHeaderTitle
      }}
    >
      {props.children}
    </NavContext.Provider>
  );
};

export default NavContextProvider;
