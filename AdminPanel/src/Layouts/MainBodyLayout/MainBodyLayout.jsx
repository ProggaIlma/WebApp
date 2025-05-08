import React from "react";
import { Outlet } from "react-router-dom";
const MainBodyLayout = () => {
  return (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  );
};

export default MainBodyLayout;
