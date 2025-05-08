//ResetPassword
import React, { useState } from 'react';
import { Typography, Row, Button, Spin } from 'antd';
import { useNavigate, useParams } from "react-router-dom";
import useResetPasswordForm from './useResetPasswordForm';
import AuthInput from '@UIElements/AuthInput/AuthInput';
import { useNotification } from '@UIElements/CNotification/useNotification';
import { LoadingOutlined } from '@ant-design/icons';
import { setPasswordURL } from '@Shared/APIUrls';
import { useAxiosInstance } from '@Shared/axiosInstance/useAxiosInstance';
const { Title } = Typography;
import "./AuthCss.css";
const ResetPassword = () => {
    const initialFormState = {
        newPassWord: {
            elementType: "passwordInput",
            elememtConfig: {
                placeholder: "Enter New Password",
                arialabel: "Password",
            },
            validations: {
                errorM: null,
                valid: false,
            },
            validators: {
                required: true,
                minLength: 8,
                oneUppercase: true,
                oneLowercase: true,
                oneSpecial: true,
            },
            touched: false,
            value: "",
        },
        confirmPassWord: {
            elementType: "passwordInput",
            elememtConfig: {
                placeholder: "Confirm New Password",
                arialabel: "Password",
            },
            validations: {
                errorM: null,
                valid: false,
            },
            validators: {
                required: true,
            },
            touched: false,
            value: "",
        },
    };
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { axiosInstance } = useAxiosInstance();
    const { mode, id } = useParams();
    const {
        isFormValid,
        formElementArray,
        inputChangedHandler,
        resetFormValues, getValuesFromFormState } = useResetPasswordForm(initialFormState);
    const { api, contextHolder, openNotificationWithIcon } = useNotification();
    const [passwordSuccess, setPasswordSuccess] = useState(false);

    const submitPasswordForm = () => {
        setIsLoading(true);
        let data = getValuesFromFormState();
        axiosInstance({
            url: setPasswordURL,
            method: "POST",
            data: { passcode_code: id, tz_admin_password: data.confirmPassWord }
        }).then((response) => {
            resetFormValues();
            setIsLoading(false);
            openNotificationWithIcon('success', null, "Successfully updated the password! Please login!")
            setPasswordSuccess(true)
            setTimeout(() => {
                navigate("/login", { replace: true });
            }, 4000);
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
                    {mode == "set-password" ? "Set Password" : "Reset Password"}
                </Title>
            </Row>
            {
                passwordSuccess == true ?
                    <Row justify="center" align="top" style={{ height: "auto", width: "100%", textAlign:"center" }}>

                        <Title style={{ marginTop: "15px", fontSize: "16px", fontWeight: 400, margin: "auto", width: "80%", marginBottom: "40px" }}>
                            {`Your password has been ${mode == "set-password" ? "set" : "changed"} successfully`}
                        </Title>
                        <Row justify="center" align="top" style={{ height: "auto", width: "100%", marginTop: "20px" }}>
                            <Row justify="center" align="top" style={{ marginBottom: "10px", width: "80%" }}>
                                <Button type="primary" className='loginBtn' disabled={false}
                                    onClick={() => navigate('/login')}>Back to login</Button>
                            </Row>

                        </Row>
                    </Row> :
                    <Row justify="center" align="top" style={{ height: "auto", width: "100%" }}>
                        {formElementArray.map((formElement, index) => (
                            <Row justify="center" align="top" style={{ marginBottom: "10px", width: "100%" }}>
                                <AuthInput
                                    key={formElement.id}
                                    elementType={formElement.config.elementType}
                                    elememtConfig={formElement.config.elememtConfig}
                                    inputVariable={formElement.config.value}
                                    validations={formElement.config.validations}
                                    touched={formElement.config.touched}
                                    onChangedInput={(event) => {
                                        index == 0 ? inputChangedHandler(event, formElement.id, formElementArray[0].config.value) :
                                            inputChangedHandler(event, formElement.id, formElementArray[1].config.value)

                                    }}
                                />
                            </Row>
                        ))}
                        {
                            isLoading == true ? <Row justify="center" align="top" style={{ marginBottom: "10px", width: "80%" }}>
                                <Spin indicator={<LoadingOutlined style={{ fontSize: 32, color: "#122a4e" }} spin />} />
                            </Row> : null
                        }
                        <Row justify="center" align="top" style={{ marginBottom: "10px", width: "80%" }}>
                            <Button type="primary" className='loginBtn' disabled={isFormValid == false || isLoading == true}
                                onClick={() => submitPasswordForm()}>
                                {mode == "set-password" ? "Set Password" : "Reset Password"}
                            </Button>
                        </Row>
                    </Row>
            }

        </React.Fragment>);
}

export default ResetPassword;
