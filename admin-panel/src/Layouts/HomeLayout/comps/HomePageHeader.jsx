//HomePageHeader
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "@Shared/AuthContexts/auth-context";
import { NavContext } from "@Shared/NavContexts/nav-contexts";
import { Layout, theme, Flex, Typography, Space, Avatar, Popover, Badge, Button } from "antd";
import { UserOutlined, LogoutOutlined, BellOutlined } from "@ant-design/icons";
import "./SideNavIcoBtn.css";
import Dropdown from "antd/es/dropdown/dropdown";
import NotificationPopup from "@ModulePages/Notification/NotificationPopup";
import { useAxiosInstance } from "@Shared/axiosInstance/useAxiosInstance";
import { unreadNotificationCountAPI } from "@Shared/APIUrls";

const { Header } = Layout;
const { Title, Text } = Typography;

const HomePageHeader = ({ onLogOut }) => {
  const auth = useContext(AuthContext);
  const { headerTitle } = useContext(NavContext);
  const { axiosInstance } = useAxiosInstance();
  const [notificationCount, setNotificationCount] = useState(0);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const items = [
    {
      label: (
        <a onClick={() => onLogOut}>
          <Space>
            <LogoutOutlined />
            Logout
          </Space>
        </a>
      ),
      key: "1",
    },
  ];

  const menuProps = { items, onClick: onLogOut };

  // Notification popover ///
  const [nOpen, setNOpen] = useState(false);
  const nHide = () => {
    setNOpen(false);
  };

  const handleNOpenChange = (newNOpen) => {
    setNOpen(newNOpen);
  };
  // Notification popover ///

  useEffect(() => {
    fetchNotificationCount();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      fetchNotificationCount();
    }, 120000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const fetchNotificationCount = () => {
    axiosInstance({
      url: unreadNotificationCountAPI,
      method: "GET",
    })
      .then((res) => {
        setNotificationCount(res?.data?.data?.count);
      })
      .catch((error) => {});
  };

  return (
    <Header style={{ padding: 0, background: colorBgContainer, height: "72px" }}>
      <Flex
        style={{
          width: "100%",
          height: "72px",
          paddingLeft: "25px",
          paddingRight: "25px",
        }}
        justify="space-between"
        align="center"
      >
        <Title level={2}>{headerTitle}</Title>
        <Flex
          style={{
            width: "auto",
            height: "100%",
            paddingLeft: "25px",
            paddingRight: "10px",
          }}
          justify="space-between"
          align="center"
        >
          <Space>
            <Popover
              content={
                <NotificationPopup
                  nHide={nHide}
                  nOpen={nOpen}
                  notificationCount={notificationCount}
                  setNotificationCount={setNotificationCount}
                  handleNOpenChange={handleNOpenChange}
                />
              }
              title=""
              trigger="click"
              open={nOpen}
              onOpenChange={handleNOpenChange}
              arrow={false}
              fresh
              placement="bottomRight"
              style={{ marginTop: "20px", paddingTop: "20px" }}
            >
              <Badge count={notificationCount}>
                <Button shape="circle" icon={<BellOutlined />} onClick={() => setNOpen(!nOpen)} />
              </Badge>
            </Popover>
            <Dropdown placement="bottomRight" trigger={["click"]} menu={menuProps}>
              <div style={{ cursor: "pointer", lineHeight: "0px" }}>
                <Text
                  style={{
                    color: "#8A7CFF",
                    fontWeight: "600",
                    fontSize: "16px",
                    marginLeft: "5px",
                    marginRight: "5px",
                  }}
                >
                  {auth.user?.tz_admin_username}
                </Text>
                <Avatar size="large" icon={<UserOutlined />} />
              </div>
            </Dropdown>
          </Space>
        </Flex>
      </Flex>
    </Header>
  );
};

export default HomePageHeader;
