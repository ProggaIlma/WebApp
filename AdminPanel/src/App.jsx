import React, { Suspense, useEffect } from "react";
import { BrowserRouter, Routes } from "react-router-dom";
import { AuthContext } from "@Shared/AuthContexts/auth-context";
import { useAuth } from "@Shared/AuthContexts/auth-hook";
import { ConfigProvider } from "antd";
import { getOuterPagesRoutes } from "@Shared/AppRoutes/getOuterPagesRoutes";
import { getLoggedInRoutes } from "@Shared/AppRoutes/getLoggedInRoutes";
import NavContextProvider from "@Shared/NavContexts/nav-contexts";
import HomePageLoader from "@UIElements/HomePageLoader/HomePageLoader";

import './App.css';
const App = () => {
  const { token, user, setUser, login, logout } = useAuth();

  let routesz;

  if (!token) {
    routesz = (
      <Suspense fallback={<HomePageLoader />}>
        <Routes>{getOuterPagesRoutes()}</Routes>
      </Suspense>
    );
  } else {
    routesz = (
      <NavContextProvider>
        <Routes>
          {getLoggedInRoutes()}
        </Routes>

      </NavContextProvider>
    );
  }



  return (
    <ConfigProvider theme={{ token: { fontFamily: "Lato", colorPrimary: "#8A7CFF" } }}>
      <AuthContext.Provider
        value={{
          token: token,
          user: user,
          login: login,
          logout: logout,
          setUser: setUser
        }}
      >
        <BrowserRouter>{routesz}</BrowserRouter>
      </AuthContext.Provider>
    </ConfigProvider>
  );
}

export default App;