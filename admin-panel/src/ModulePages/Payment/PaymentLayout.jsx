//MonScCntLayout
import { NavContext } from "@Shared/NavContexts/nav-contexts";
import { layoutStyle } from "@Styles/LayoutStyles";
import { ConfigProvider, Layout, Menu } from "antd";
import { useContext, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const { Sider, Content } = Layout;

const PaymentLayout = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { setIconsLevel, setSettingsBarLevel } = useContext(NavContext);
  const [windowSize, setWindowSize] = useState([window.innerWidth, window.innerHeight]);
  useEffect(() => {
    setIconsLevel(2);
    setSettingsBarLevel(0);
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

  const prdList = [
    {
      name: "Payment",
      level: 0,
      title: "Payment",
      routePath: "/payment-layout/payment",
    }
  ];
  const locationList = {
    "/payment-layout/payment": 0
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
          <Menu theme="light" mode="inline" defaultSelectedKeys={[`${locationList[pathname]}`]} defaultOpenKeys={[`${locationList[pathname]}`]}>
            {prdList.map((item, index) => {
              return (
                <Menu.Item
                  style={{ fontWeight: 600, borderRadius: 13, textAlign: "left", paddingRight: "20px" }}
                  key={index}
                  onClick={() => navigatePrds(item.routePath)}
                >
                  {item.title}
                </Menu.Item>
              );
            })}
          </Menu>
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

export default PaymentLayout;
