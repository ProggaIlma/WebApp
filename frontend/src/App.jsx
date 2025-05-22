import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import "./App.css";
// theeming
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { appTheme } from "./Theme/theme";
// auth

// import NavContextProvider from "./Shared/NavContexts/nav-contexts";
// pages
// import PageNotFound from "./ModulePages/PageNotFound/PageNotFound";
// import HomeLayout from "src/Layouts/HomeLayout/HomeLayout";
import { getLoggedInRoutes } from "./shared/Approutes/getLoggedInRoutes";
import { getOuterPagesRoutes } from "./shared/Approutes/getOuterPagesRoutes";
// import HomePageLoader from "./UIElements/HomePageLoader/HomePageLoader";

function App() {


  let routesz;
  if (true) {
    routesz = (
    //   <Suspense fallback={<HomePageLoader />}>
     <Route path="/" element={<HomeLayout />}>
        <Routes>{getOuterPagesRoutes()}</Routes></Route>
    //   </Suspense>
    );
  } else {
    routesz = (
    //   <NavContextProvider permissions={user.permissions}>
        
          <Routes>
            <Route path="/" element={<HomeLayout />}>
              {getLoggedInRoutes()}
              <Route path="*" element={<PageNotFound />} />
            </Route>
          </Routes>
      
    //   </NavContextProvider>
    );
  }
  return (
    <ThemeProvider theme={createTheme(appTheme)}>
      <CssBaseline />
      
        
          <BrowserRouter>{routesz}</BrowserRouter>
     
    </ThemeProvider>
  );
}

export default App;
