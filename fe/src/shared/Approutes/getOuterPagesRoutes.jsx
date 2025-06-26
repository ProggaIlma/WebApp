import React from "react";
import { Route } from "react-router-dom";
import ItemDetail from "../../ModulePages/ItemDetail/ItemDetail";
import AllProducts from "../../ModulePages/AllProducts/AllProducts";
import MyAccount from "../../ModulePages/MyAccount/MyAccount";
import Home from "../../ModulePages/Home/Home";
// import OuterPagesLayout from "src/Layouts/OuterPagesLayout/OuterPagesLayout";

export const getOuterPagesRoutes = () => {
  return (
    // <Route path="/" element={<OuterPagesLayout />}>
    //   <Route index exact element={<Login />} />

    //   <Route path="vm-set-password/:id" element={<VMSetPassword />} />
    //   <Route path="update-org-info/:url_id/:org_id" element={<UpdateOrgInfo />} />
    //   <Route path="*" element={<Login />} />
    // </Route>
    <React.Fragment>
      {" "}
      <Route path="itemDetail/:id" exact element={<ItemDetail />} />
      <Route path="all-products" exact element={<AllProducts />} />
      <Route path="home" exact element={<Home />} />
       <Route path="" exact element={<Home />} />
      <Route path="myAccount" element={<MyAccount />} />
    </React.Fragment>
  );
};
