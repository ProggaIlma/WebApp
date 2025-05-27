//getLoggedInRoutes
import React from "react";
import { Route } from "react-router-dom";
import HomeLayout from "@Layouts/HomeLayout/HomeLayout";
import PageNotFound from "@ModulePages/NotFoundNoAuth/PageNotFound";

import ProductLayout from "@ModulePages/Product/ProductLayout";
import ViewProduct from "@ModulePages/Product/ViewProduct";

import Product from "@ModulePages/Product/Product";


export const getLoggedInRoutes = () => {
  return (
    <Route path="/" element={<HomeLayout />}>
      <Route path="/product-layout" element={<ProductLayout />}>
        <Route index exact element={<Product />} />
        <Route path="product" exact element={<Product />} />
      </Route>
     
   
      <Route path="productDetails/:mode/:id" exact element={<ViewProduct />} />

      <Route path="*" element={<PageNotFound />} />
    </Route>
  );
};
