import { NavContext } from "@/Shared/NavContexts/nav-contexts";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { botSettingAPI, generalSettingAPI } from "@Shared/APIUrls";
import { useAxiosInstance } from "@Shared/axiosInstance/useAxiosInstance";
import useFormHook from "@Shared/FormHook/useFormHook";
import { layoutStyle } from "@Styles/LayoutStyles";
import AllInput from "@UIElements/AllInput/AllInput";
import Buttons from "@UIElements/Buttons/Buttons";
import { useNotification } from "@UIElements/CNotification/useNotification";
import HomePageLoader from "@UIElements/HomePageLoader/HomePageLoader";
import { Card, Col, Flex, Layout, Modal, Row } from "antd";
import { useContext, useEffect, useState } from "react";
import SingleUploadForFile from "@UIElements/SingleUploadForFile/SingleUploadForFile";

const { Content } = Layout;
const { confirm } = Modal;

const BotSetting = () => {

  const { axiosInstance } = useAxiosInstance();
  const { contextHolder, openNotificationWithIcon } = useNotification();
  const { setHeaderTitle, setIconsLevel } = useContext(NavContext);
  const [mode, setMode] = useState("view");
  const [isLoading, setIsLoading] = useState(false);
  const [isSavingData, setIsSavingData] = useState(false);
  const [isNotify, setIsNotify] = useState(false);

  useEffect(() => {
    axiosInstance.get(botSettingAPI).then(res => {
      const data = res.data?.data;
      setBotFiles({
        bot_header_url: data?.bot_header_url || null,
        bot_js_url: data?.bot_js_url || null,
        bot_css_url: data?.bot_css_url || null,
        bot_html_url: data?.bot_html_url || null
      });
    });
  }, []);

  const [botFiles, setBotFiles] = useState({
    bot_header_url: null,
    bot_js_url: null,
    bot_css_url: null,
    bot_html_url: null
  });

  const handleFileChange = (fieldName, value) => {
    setBotFiles(prev => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const onClickSave = () => {
    confirm({
      title: "Do you want to send notification to all active organizations?",
      icon: <ExclamationCircleFilled />,
      okText: "Yes",
      okType: "primary",
      cancelText: "No",
      mask: false,
      centered: true,
      onOk() {
        setIsNotify(true); 
        onConfirmOrCancel(true);
      },
      onCancel() {
        setIsNotify(false); 
        onConfirmOrCancel(false);
      },
    });
  };

  const onConfirmOrCancel = (shouldNotify) => {
    setIsSavingData(true);

    axiosInstance({
      url: botSettingAPI,
      method: "PATCH", 
      data: {
        ...botFiles,
        isNotify: shouldNotify, 
      },
    })
      .then(() => {
        openNotificationWithIcon("success", null, "Successfully Saved data!", 4);
        setTimeout(() => {
          setIsSavingData(false);
          setMode("view"); 
        }, 3000);
      })
      .catch((error) => {
        openNotificationWithIcon(
          "error",
          null,
          error?.response?.data?.errors?.[0] ?? "Something went wrong on the server",
          6
        );
        setIsSavingData(false);
      });
  };

  const onClickEditSettings = () => {
    setMode("edit");
  };


  return (
    <Layout style={layoutStyle}>
      <Content>
        {contextHolder}
        <Card
          bordered={false}
          style={{
            height: "72px",
            width: "100%",
            margin: "-20px -25px",
            backgroundColor: "#FFFFFF",
            borderRadius: "6px 6px 0px 0px",
            border: "1px solid #ADADAD",
          }}
        >
          <Flex horizontal="true" justify="end" align="right">
            {mode == "edit" ? (
              <Buttons
                btntyp="colored-btn"
                btntext={"Save"}
                w={88}
                onClickFunc={() => {
                  onClickSave();
                }}
                btnColor={"#04D357"}
                disabled={isSavingData || isLoading}
              />
            ) : (
              <Buttons
                btntyp="cancel-btn"
                btntext={"Edit"}
                w={88}
                onClickFunc={onClickEditSettings}
                btnColor={"#4BA3E2"}
                disabled={false}
              />
            )}
          </Flex>
        </Card>
        <Card bordered={false} bodyStyle={{ padding: "0" }} style={{ height: "85%", width: "100%", marginTop: "50px" }}>
          {isLoading == true ? (
            <Row justify="center" style={{ height: "70vh", width: "100%", paddingTop: "0px", paddingBottom: "30px" }}>
              <HomePageLoader />
            </Row>
          ) : (
            <Row
              justify="left"
              gutter={[16, 0]}
              style={{
                height: "48vh",
                width: "94%",
                margin: "auto",
                paddingTop: "30px",
                paddingBottom: "30px",
              }}
            >
            
              <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12} key={"header-url"}>
                <SingleUploadForFile
                    fileURL={botFiles.bot_header_url}
                    setFileURL={(url) => handleFileChange("bot_header_url", url)}
                    title={"Header URL"}
                    isRequired={false}
                    mode={mode}
                    allowedFileType="js"
                  />
                </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12} key={"js-url"}>
                <SingleUploadForFile
                    fileURL={botFiles.bot_js_url}
                    setFileURL={(url) => handleFileChange("bot_js_url", url)}
                    title={"JS URL"}
                    isRequired={false}
                    mode={mode}
                    allowedFileType="js"
                  />
                </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12} key={"bot_css_url"} >
                <SingleUploadForFile
                  fileURL={botFiles.bot_css_url}
                  setFileURL={(url) => handleFileChange("bot_css_url", url)}
                  title={"CSS URL"}
                  isRequired={false}
                  mode={mode}
                  allowedFileType="css"
                />
                </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12} key={"bot_html_url"} >
                <SingleUploadForFile
                  fileURL={botFiles.bot_html_url}
                  setFileURL={(url) => handleFileChange("bot_html_url", url)}
                  title={"HTML URL"}
                  isRequired={false}
                  mode={mode}
                  allowedFileType="html"
                />
                </Col>
             
            </Row>
          )}
        </Card>
        </Content>
    </Layout>
  );
};

export default BotSetting;
