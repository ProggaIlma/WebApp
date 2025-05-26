import React from 'react';
import { Col, Row, Card } from 'antd';
import logo from "@Assets/ZuAILogo.svg";
import { Outlet } from "react-router-dom";
import "./AuthPageLayout.css";
const AuthPageLayout = () => {
    return (
        <Row justify="space-around" align="middle" style={{ backgroundColor: "#201B37", height: "100vh" }}>
            <Col xxl={8} xl={16} lg={16} span={20}>
                <Card
                    className="height-50"
                    bordered={false}
                    style={{
                        backgroundColor: "#ffffff",
                        maxWidth: "490px",
                        minHeight: "500px",
                        margin: "0 auto",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",

                    }}
                >
                    <Row justify="space-around" align="middle" style={{ height: "auto", width: "100%", paddingBottom: 24 }}>
                        <img src={logo} className="logo_size" alt="Mylogo" />
                    </Row>
                    <Row justify="space-around" align="middle" style={{ height: "auto", width: "100%" }}>
                        <Outlet />
                    </Row>
                </Card>
            </Col>
        </Row>
    );
};

export default AuthPageLayout;
