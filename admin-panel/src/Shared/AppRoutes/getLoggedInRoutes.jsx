//getLoggedInRoutes
import React from "react";
import { Route } from "react-router-dom";
import HomeLayout from "@Layouts/HomeLayout/HomeLayout";
import PageNotFound from "@ModulePages/NotFoundNoAuth/PageNotFound";

import PaymentLayout from "@ModulePages/Payment/PaymentLayout";
import ViewPayment from "@ModulePages/Payment/ViewPayment";

import Payment from "@ModulePages/Payment/Payment";


export const getLoggedInRoutes = () => {
  return (
    <Route path="/" element={<HomeLayout />}>
      <Route path="/payment-layout" element={<PaymentLayout />}>
        <Route index exact element={<Payment />} />
        <Route path="payment" exact element={<Payment />} />
      </Route>
     
   
      <Route path="paymentDetails/:mode/:id" exact element={<ViewPayment />} />

      <Route path="*" element={<PageNotFound />} />
    </Route>
  );
};
