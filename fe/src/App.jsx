import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import HomeLayout from "./Layouts/HomeLayout/HomeLayout"
import "./App.css";
// theeming
import { createTheme, ThemeProvider } from "@mui/material/styles";
import  appTheme  from "./Theme/theme";
import { CartProvider } from "./shared/CartContext/CartCtx";
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
     <Routes>
     <Route path="/" element={<HomeLayout />}>
        <Route>{getOuterPagesRoutes()}</Route>
        </Route></Routes>
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
      <CartProvider>
        
          <BrowserRouter>{routesz}</BrowserRouter>
     </CartProvider>
    </ThemeProvider>
  );
}

export default App;
