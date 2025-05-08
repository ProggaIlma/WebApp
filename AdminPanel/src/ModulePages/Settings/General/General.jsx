import { NavContext } from "@/Shared/NavContexts/nav-contexts";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { generalSettingAPI } from "@Shared/APIUrls";
import { useAxiosInstance } from "@Shared/axiosInstance/useAxiosInstance";
import useFormHook from "@Shared/FormHook/useFormHook";
import { layoutStyle } from "@Styles/LayoutStyles";
import AllInput from "@UIElements/AllInput/AllInput";
import Buttons from "@UIElements/Buttons/Buttons";
import { useNotification } from "@UIElements/CNotification/useNotification";
import HomePageLoader from "@UIElements/HomePageLoader/HomePageLoader";
import { Card, Col, Flex, Layout, Modal, Row } from "antd";
import { useContext, useEffect, useState } from "react";

const { Content } = Layout;
const { confirm } = Modal;

const General = () => {
  const { axiosInstance } = useAxiosInstance();
  const { contextHolder, openNotificationWithIcon } = useNotification();
  const { setHeaderTitle, setIconsLevel } = useContext(NavContext);
  const [mode, setMode] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSavingData, setIsSavingData] = useState(false);

  const initialFormState = {
    setting_tax_name: {
      elementType: "textInput",
      elememtConfig: { placeholder: "Tax Name", arialabel: null },
      validations: { errorM: null, valid: false },
      validators: { required: true },
      touched: false,
      value: "",
      disabled: false,
    },
    setting_tax_parcent: {
      elementType: "numberInput",
      elememtConfig: { placeholder: "Tax Percent", arialabel: null },
      validations: { errorM: null, valid: false },
      validators: { required: true },
      touched: false,
      value: "",
      disabled: false,
    },
  };

  const {
    isFormValid,
    formElementArray,
    inputChangedHandler,
    setIsFormValid,
    getValuesFromFormState,
    setFetchedDataInForm,
  } = useFormHook(initialFormState);

  useEffect(() => {
    setHeaderTitle("Settings");
    setIconsLevel(3);
    getSettingsDetails();
  }, []);

  const getSettingsDetails = () => {
    setIsLoading(true);
    axiosInstance({
      url: generalSettingAPI,
      method: "GET",
    })
      .then((response) => {
        setFetchedDataInForm(response?.data);
        setIsFormValid(true);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        openNotificationWithIcon(
          "error",
          null,
          error?.response?.data?.errors[0] !== undefined
            ? error.response.data?.errors[0]
            : "Something went wrong in server",
          6
        );
      });
  };

  const onClickSave = () => {
    confirm({
      title: "Do you want to update this settings?",
      icon: <ExclamationCircleFilled />,
      okText: "Yes",
      okType: "primary",
      cancelText: "No",
      mask: false,
      centered: true,
      onOk() {
        onConfirmOrCancel(true);
      },
      onCancel() {
        onConfirmOrCancel(false);
      },
    });
  };

  const onConfirmOrCancel = (data) => {
    if (data == true) {
      setIsSavingData(true);
      let generalSettings = getValuesFromFormState();

      axiosInstance({
        url: generalSettingAPI,
        method: "PATCH",
        data: generalSettings,
      })
        .then(() => {
          openNotificationWithIcon("success", null, "Successfully updated data!", 4);
          setTimeout(() => {
            setIsSavingData(false);
            setMode("");
          }, 3000);
        })
        .catch((error) => {
          openNotificationWithIcon(
            "error",
            null,
            error?.response?.data?.errors[0] !== undefined
              ? error.response.data?.errors[0]
              : "Something went wrong in server",
            6
          );
          setIsSavingData(false);
        });
    }
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
            // width: "100%",
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
                disabled={isFormValid == false || isSavingData}
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
                height: "68vh",
                width: "94%",
                margin: "auto",
                paddingTop: "30px",
                paddingBottom: "30px",
              }}
            >
              {formElementArray.map((formElement, index) => (
                <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8} key={index}>
                  {
                    <AllInput
                      key={formElement.id}
                      elementType={formElement.config.elementType}
                      elememtConfig={formElement.config.elememtConfig}
                      inputVariable={formElement.config.value}
                      validations={formElement.config.validations}
                      touched={formElement.config.touched}
                      sbVal={formElement.config.ccValue}
                      onChangedInput={(event) => {
                        if (formElement.config.elementType == "numberInput") {
                          inputChangedHandler(event, formElement.id, event);
                        } else {
                          inputChangedHandler(event, formElement.id);
                        }
                      }}
                      isRequired={formElement?.config?.validators?.required}
                      disabled={mode !== "edit" || isSavingData}
                    />
                  }
                </Col>
              ))}
            </Row>
          )}
        </Card>
      </Content>
    </Layout>
  );
};

export default General;
