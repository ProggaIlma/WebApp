
import React, { useContext, useEffect } from 'react';
import { NavContext } from '@Shared/NavContexts/nav-contexts';
import { Typography, Col, Row } from 'antd';
const { Title } = Typography;
import "./PageNotFound.css";
const PageNotFound = () => {
  const { setIconsLevel, setHeaderTitle } = useContext(NavContext);
  useEffect(() => {
    setIconsLevel(0);
    setHeaderTitle('Not Found!');
  }, [])
  return (
    <Row justify="space-around" align="middle" style={{ height: "100%" }}>
      <Col >
        <div style={{ width: '100%', height: "100%", }}>
          <Row justify="space-around" align="middle" style={{ height: "auto", width: "100%" }}>
            <Title style={{ margin: "auto", paddingBottom: "10px", fontSize: "36px", color: "#000000", fontWeight: 600 }}>404</Title>
          </Row>
          <Row justify="space-around" align="middle" style={{ height: "auto", width: "100%", margin: "auto" }}>
            <Title level={2} style={{ margin: "auto", paddingBottom: "10px", fontSize: "20px", color: "#5F6A6A", fontWeight: 600, textAlign: "center" }}>The requested page could not be found</Title>
          </Row>
        </div>
      </Col>
    </Row>
  );
};

export default PageNotFound;
