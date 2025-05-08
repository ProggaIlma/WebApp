//getLoggedInRoutes
import React from "react";
import { Route } from "react-router-dom";
import HomeLayout from "@Layouts/HomeLayout/HomeLayout";
import PageNotFound from "@ModulePages/NotFoundNoAuth/PageNotFound";
import ViewSubscription from "@ModulePages/Subscription/ViewSubscription";
import CreateSubscriber from "@ModulePages/Subscriber/CreateSubscriber";
import PaymentLayout from "@ModulePages/Payment/PaymentLayout";
import ViewPayment from "@ModulePages/Payment/ViewPayment";
import SubscriberLayout from "@ModulePages/Subscriber/SubscriberLayout";
import SubscriptionLayout from "@ModulePages/Subscription/SubscriptionLayout";
import Subscription from "@ModulePages/Subscription/Subscription";
import Payment from "@ModulePages/Payment/Payment";
import Subscriber from "@ModulePages/Subscriber/Subscriber";
import WaTopUp from "@ModulePages/Subscription/WaTopUp/WaTopUp";
import AITopUp from "@ModulePages/Subscription/AITopUp/AITopUp";
import CreateTopUp from "@ModulePages/Subscription/CreateTopUp/CreateTopUp";
import General from "@ModulePages/Settings/General/General";
import SettingsLayout from "@ModulePages/Settings/SettingsLayout";
import Discount from "@ModulePages/Settings/Discount/Discount";
import CreateDiscount from "@ModulePages/Settings/Discount/CreateDiscount";
import BotSetting from "@ModulePages/Settings/BotSetting/BotSetting";

export const getLoggedInRoutes = () => {
  return (
    <Route path="/" element={<HomeLayout />}>
      <Route path="/payment-layout" element={<PaymentLayout />}>
        <Route index exact element={<Payment />} />
        <Route path="payment" exact element={<Payment />} />
      </Route>
     
      <Route path="/subscriber" element={<SubscriberLayout />}>
        <Route index exact element={<Subscriber />} />
      </Route>
      <Route path="create-subscriber/:mode/:id" exact element={<CreateSubscriber />} />

      <Route path="subscriptionDetails/:mode/:id" exact element={<ViewSubscription />} />
      <Route path="paymentDetails/:mode/:id" exact element={<ViewPayment />} />

      <Route path="/subscription-layout" element={<SubscriptionLayout />}>
        <Route index exact element={<Subscription />} />
        <Route path="subscription" exact element={<Subscription />} />
        <Route path="wa-top-up" exact element={<WaTopUp />} />
        <Route path="ai-top-up" exact element={<AITopUp />} />
      </Route>
      <Route path="create-top-up/:mode/:topup_id" exact element={<CreateTopUp />} />

       <Route path="/settings" element={<SettingsLayout />}>
        <Route index exact element={<General />} />
        <Route path="general" exact element={<General />} />
        <Route path="discount" element={<Discount />} />
        <Route path="bot_setting" element={<BotSetting />} />
      </Route>
      <Route path="create-discount/:mode/:disc_id" exact element={<CreateDiscount/>}/>
      <Route path="*" element={<PageNotFound />} />
    </Route>
  );
};
