import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "@Shared/AuthContexts/auth-context";
import { Layout, theme, ConfigProvider, Flex, } from "antd";
import HomePageHeader from "./comps/HomePageHeader";
import ZuAILogo from "@Assets/ZuAILogo.svg";
import SideNavIcoBtn from "./comps/SideNavIcoBtn";
import { MasterSideNavLinks } from "./comps/SideNavUtils";
import { useNavigate, Outlet } from "react-router-dom";
const { Sider, Content } = Layout;
import "./HomeLayout.css";
//jiioji
const HomeLayout = () => {
  const auth = useContext(AuthContext);
  const [windowSize, setWindowSize] = useState([window.innerWidth, window.innerHeight]);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  useEffect(() => {

    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);


  const OpenDrawerOrNavigate = (item) => {
    if (item === "/settings") {
      setOpen(!open);
    } else {
      setOpen(false);
      navigate(item);
    }
  };

  const onClose = () => {
    setOpen(false);
  };

  const onLogOut = async () => {
    try {
      auth.logout();
      navigate("/login", { replace: true });
    } catch (error) { }
  };


  return (
    <ConfigProvider theme={{ components: { Sider: { colorPrimary: "#5DADE2", algorithm: true } } }}>
      <Layout className="homebody">
        <ConfigProvider theme={{ token: { motion: false } }}>

        </ConfigProvider>
        <Sider trigger={null} collapsible collapsed={true} style={{ margin: "0px", padding: 0, background: "#201B37", alignItems: "center" }}>
          <Flex
            gap="middle"
            vertical
            style={{ alignItems: "center", height: "100vh", width: "100%", }}
          >
            <img src={ZuAILogo} className="side_logo" alt="ZUAI" />
            {MasterSideNavLinks.map((el, index) => (
              <SideNavIcoBtn el={el} key={index} index={index} OpenDrawerOrNavigate={OpenDrawerOrNavigate} />
            ))}
          </Flex>
        </Sider>

        <Layout style={{ height: "100%", padding: 0, margin: 0, width: "100%" }}>

          <HomePageHeader

            onLogOut={onLogOut}
          />
          <Content
            style={{
              padding: 0,
              margin: 0,
              background: "#fbfbfb",
              overflowY: "scroll",
              height: `${windowSize[1] - 72}px`,
              width: "100%",
            }}
          >
            <Outlet style={{ width: "100%" }} />

          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default HomeLayout;
