import React, { useState, useContext } from 'react';
import { Typography, Row, Button, Spin } from 'antd';
import { useNavigate } from "react-router-dom";
import useAuthFormHook from '@Shared/FormHook/useAuthFormHook';
import AuthInput from '@UIElements/AuthInput/AuthInput';
import { useNotification } from '@UIElements/CNotification/useNotification';
import { LoadingOutlined } from '@ant-design/icons';
import { useAxiosInstance } from '@Shared/axiosInstance/useAxiosInstance';
import { AuthContext } from '@Shared/AuthContexts/auth-context';
import { loginURL } from '@Shared/APIUrls';
const { Title, Link } = Typography;
import "./AuthCss.css";
import Buttons from '@UIElements/Buttons/Buttons';

const Login = () => {
    const initialFormState = {
        tz_admin_email: {
            elementType: "textInput",
            elememtConfig: {
                placeholder: "Email address",
                arialabel: "Email",
            },
            validations: {
                errorM: null,
                valid: false,
            },
            validators: {
                required: true,
                isEmail: true,
            },
            touched: false,
            value: "",
        },
        tz_admin_password: {
            elementType: "passwordInput",
            elememtConfig: {
                placeholder: "Password",
                arialabel: "Password",
            },
            validations: {
                errorM: null,
                valid: false,
            },
            validators: {
                required: true
            },
            touched: false,
            value: "",
        },
    };
    const auth = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const { axiosInstance } = useAxiosInstance();
    const navigate = useNavigate();
    const { formElementArray, inputChangedHandler, getValuesFromFormState, isFormValid } = useAuthFormHook(initialFormState);
    const { api, contextHolder, openNotificationWithIcon } = useNotification();

    const loginUser = () => {
        setIsLoading(true);
        let data = getValuesFromFormState();
        axiosInstance({
            url: loginURL,
            method: "POST",
            data: { ...data }
        }).then((response) => {
            setIsLoading(false);
            auth.login(response?.data?.token, response?.data?.tzadmn, response?.data?.expiresIn);
            navigate("/", { replace: true });
        }).catch((error) => {
            setIsLoading(false);
            openNotificationWithIcon('error', null, error?.response?.data?.errors[0] || "Something went wrong in server")
        });
    }
    return (
        <React.Fragment>
            {contextHolder}
            <Row justify="center" align="top" style={{ height: "auto", width: "100%", }}>
                <Title style={{ marginTop: "-10px", fontSize: "35px", fontWeight: 800 }}>
                    System Login
                </Title>
            </Row>
            <Row justify="center" align="top" style={{ height: "auto", width: "100%" }}>
                {formElementArray.map((formElement, index) => (
                    <Row justify="center" align="top" key={index} style={{ marginBottom: "10px", width: "100%" }}>
                        <AuthInput
                            key={formElement.id}
                            elementType={formElement.config.elementType}
                            elememtConfig={formElement.config.elememtConfig}
                            inputVariable={formElement.config.value}
                            validations={formElement.config.validations}
                            touched={formElement.config.touched}
                            onChangedInput={(event) => { inputChangedHandler(event, formElement.id) }}
                        />
                    </Row>
                ))}
                {
                    isLoading == true ? <Row justify="center" align="top" style={{ marginBottom: "10px", width: "80%" }}>
                        <Spin indicator={<LoadingOutlined style={{ fontSize: 32, color: "#122a4e" }} spin />} />
                    </Row> : null
                }

                <Row justify="center" align="top" style={{ marginBottom: "10px", width: "80%" }}>
                    <Button type='primary' className='loginBtn' disabled={isFormValid == false || isLoading == true}
                        onClick={() => loginUser()}>Log In</Button>

                </Row>
            </Row>
            <Row justify="center" align="top" style={{ height: "auto", width: "100%", }}>
                <Link onClick={() => { navigate("/forgot-password"); }}
                    style={{ fontSize: "16px", fontWeight: 400, textDecoration: "underline", color: "#122A4E" }}>
                    Forgot Password
                </Link>
            </Row>
        </React.Fragment>);
}

export default Login;
