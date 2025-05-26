import React, { Fragment, useState } from 'react';
import { Typography, Row, Button, Spin } from 'antd';
import { useNavigate } from "react-router-dom";
import useAuthFormHook from '@Shared/FormHook/useAuthFormHook';
import AuthInput from '@UIElements/AuthInput/AuthInput';
import { useNotification } from '@UIElements/CNotification/useNotification';
import { LoadingOutlined } from '@ant-design/icons';
import { useAxiosInstance } from '@Shared/axiosInstance/useAxiosInstance';
import { resetPasswordReqURL } from '@Shared/APIUrls';
const { Title, Link } = Typography;
import "./AuthCss.css";
const ForgotPassword = () => {
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
        }
    };
    const { axiosInstance } = useAxiosInstance();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [linkIsSent, setLinkIsSent] = useState(false);
    const { formElementArray, inputChangedHandler, getValuesFromFormState, isFormValid } = useAuthFormHook(initialFormState);
    const { api, contextHolder, openNotificationWithIcon } = useNotification();
    const [theEmail, setTheEmail] = useState(null);

    const submitForgotPassword = () => {
        setIsLoading(true);
        let data = getValuesFromFormState();
        setTheEmail(data.tz_admin_email)
        axiosInstance({
            url: resetPasswordReqURL,
            method: "POST",
            data: data
        }).then((response) => {
            setIsLoading(false);
            setLinkIsSent(true);
        }).catch((error) => {
            setIsLoading(false);
            openNotificationWithIcon('error', null, error?.response?.data?.errors[0] || "Something went wrong in server")
        });
    }
    return (
        <Fragment>
            {contextHolder}
            {
                linkIsSent == true ?
                    <Fragment>
                        <Row justify="center" align="top" style={{ height: "auto", width: "100%", textAlign: "center" }}>
                            <Title style={{ marginTop: "-10px", fontSize: "35px", fontWeight: 800 }}>
                                Forget Password
                            </Title>
                            <Title style={{ marginTop: "15px", fontSize: "16px", fontWeight: 400, margin: "auto", width: "80%", }}>
                                A link to reset password have been sent to {theEmail}
                            </Title>
                            <Title style={{ paddingTop: "15px", fontSize: "16px", fontWeight: 400, margin: "auto", width: "80%", }}>
                                If you are unable to find the link, kindly check Spam/Junk Box of your mailbox
                            </Title>
                        </Row>
                        <Row justify="center" align="top" style={{ height: "auto", width: "100%", marginTop: "20px" }}>
                            <Row justify="center" align="top" style={{ marginBottom: "10px", width: "80%" }}>
                                <Button type="primary" className='loginBtn' disabled={false}
                                    onClick={() => navigate('/login')}>Back to login</Button>
                            </Row>

                        </Row>
                    </Fragment> :
                    <Fragment>
                        <Row justify="center" align="top" style={{ height: "auto", width: "100%", textAlign: "center" }}>
                            <Title style={{ marginTop: "-10px", fontSize: "35px", fontWeight: 800 }}>
                                Forget Password
                            </Title>
                            <Title style={{ marginTop: "-10px", fontSize: "16px", fontWeight: 400, margin: "auto", width: "80%", }}>
                                The system will send a link to reset password if the account exist
                            </Title>
                        </Row>
                        <Row justify="center" align="top" style={{ height: "auto", width: "100%", marginTop: "20px" }}>
                            {formElementArray.map((formElement) => (
                                <Row justify="center" align="top" style={{ marginBottom: "10px", width: "100%" }}>
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
                                <Button type="primary" className='loginBtn' disabled={isFormValid == false || isLoading == true}
                                    onClick={() => submitForgotPassword()}>Send Link</Button>
                            </Row>
                            <Row justify="center" align="top" style={{ height: "auto", width: "100%", }}>
                                <Link onClick={() => {
                                    navigate("/login");
                                }} style={{ fontSize: "16px", fontWeight: 400, textDecoration: "underline", color: "#122A4E" }}>
                                    Back to login
                                </Link>
                            </Row>
                        </Row>
                    </Fragment>
            }
        </Fragment>);
}

export default ForgotPassword;
