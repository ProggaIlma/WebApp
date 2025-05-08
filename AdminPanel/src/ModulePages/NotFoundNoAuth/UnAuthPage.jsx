//UnAuthPage

import React, { useContext, useEffect } from 'react';
import { NavContext } from '@Shared/NavContexts/nav-contexts';
import { Typography, Col, Row } from 'antd';
import UnAuthImg from '@Assets/uis/UnAuthImg.png';
const { Title } = Typography;
import "./PageNotFound.css";
const UnAuthPage = ({ level }) => {
  const { setIconsLevel, setHeaderTitle } = useContext(NavContext);
  useEffect(() => {
    setIconsLevel(level);
    setHeaderTitle('Not Accessible');
  }, [])
  return (
    <Row justify="space-around" align="middle" style={{ height: "100%" }}>
      <Col >
        <div style={{ width: '100%', height: "100%", }}>
          <Row justify="space-around" align="middle" style={{ height: "auto", width: "100%" }}>
            {/* <Title style={{ margin: "auto", paddingBottom: "10px", fontSize: "36px", color: "#000000", fontWeight: 600 }}>Forbidden 403</Title> */}
            <img className="un_auth_img" src={UnAuthImg} />
          </Row>
          <Row justify="space-around" align="middle" style={{ height: "auto", width: "80%", margin: "auto" }}>
            <Title level={2} style={{ margin: "auto", paddingBottom: "10px", fontSize: "20px", color: "#5F6A6A", fontWeight: 600, textAlign: "center" }}>You are receiving this error because you do not have sufficient access rights to access this page. Please kindly contact your administrator for assistance</Title>
          </Row>
        </div>
      </Col>
    </Row>
  );
};

export default UnAuthPage;
