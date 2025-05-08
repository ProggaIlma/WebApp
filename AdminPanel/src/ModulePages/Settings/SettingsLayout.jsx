//MonScCntLayout
import { NavContext } from "@Shared/NavContexts/nav-contexts";
import { layoutStyle } from "@Styles/LayoutStyles";
import { ConfigProvider, Layout, Menu } from "antd";
import { useContext, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const { Sider, Content } = Layout;

const SettingsLayout = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { setIconsLevel, setSettingsBarLevel } = useContext(NavContext);
  const [windowSize, setWindowSize] = useState([window.innerWidth, window.innerHeight]);

  useEffect(() => {
    setIconsLevel(3);
    
  }, []);
  
  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const navigatePrds = (routePath) => {
    navigate(routePath);
  };

  const menuItems = [
   
    {
      name: "General",
      level: 3,
      title: "General",
      routePath: "/settings/general",
    },
    {
      name: "Discount",
      level: 3,
      title: "Discount",
      routePath: "/settings/discount",
    },
    {
      name: "BotSetting",
      level: 3,
      title: "Bot Setting",
      routePath: "/settings/bot_setting",
    },
  ];
  const locationList = {
    "/settings": 0,
    "/settings/general": 0,
    "/settings/discount": 1,
    "/settings/bot_setting": 2,
   
  };
  return (
    <Layout style={layoutStyle}>
      <Sider
        width="15%"
        style={{
          textAlign: "center",
          height: `${windowSize[1] - 72}px`,
          color: "#fff",
          backgroundColor: "#FFFFFF",
          overflow: "scroll",
          padding: "0px",
        }}
      >
        <ConfigProvider theme={{ token: { colorPrimary: "#8A7CFF", borderRadius: 0, padding: 0, margin: 0 } }}>
          <Menu 
            theme="light"
            mode="inline"
            defaultSelectedKeys={[`${locationList[pathname]}`]}
            defaultOpenKeys={[`${locationList[pathname]}`]}
            items={menuItems.map((item, index) => ({
              key: index,
              label: item.title,
              onClick: () => navigatePrds(item.routePath),
              style: { 
                fontWeight: 600, 
                borderRadius: 13, 
                textAlign: "left", 
                paddingRight: "20px" 
              }
            }))}
          />
        </ConfigProvider>
      </Sider>
      <Content
        style={{
          textAlign: "left",
          height: `${windowSize[1] - 72}px`,
          color: "#fff",
          backgroundColor: "transparent",
          overflow: "scroll",
          padding: 20,
        }}
      >
        <Outlet />
      </Content>
    </Layout>
  );
};

export default SettingsLayout;
