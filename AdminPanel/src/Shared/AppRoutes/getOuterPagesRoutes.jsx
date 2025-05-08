//getOuterPagesRoutes
import React from "react";
import { Route } from "react-router-dom";
import OuterPagesLayout from "@Layouts/AuthPageLayout/AuthPageLayout";
const Login = React.lazy(() => import("@AuthPages/Login"));
const ForgotPassword = React.lazy(() => import("@AuthPages/ForgotPassword"));
const ResetPassword = React.lazy(() => import("@AuthPages/ResetPassword"));

export const getOuterPagesRoutes = () => {
    return (
        <Route path="/" element={<OuterPagesLayout />}>
            <Route index exact element={<Login />} />
            <Route path="forgot-password" exact element={<ForgotPassword />} />
            <Route path="password/:mode/:id" element={<ResetPassword />} />
            <Route path="*" element={<Login />} />
        </Route>
    );
};