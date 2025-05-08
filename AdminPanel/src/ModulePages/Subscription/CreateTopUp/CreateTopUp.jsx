// CreateWATopUp
import { ExclamationCircleFilled } from "@ant-design/icons";
import { topUpAPI } from "@Shared/APIUrls";
import { useAxiosInstance } from "@Shared/axiosInstance/useAxiosInstance";
import useFormHook from "@Shared/FormHook/useFormHook";
import { NavContext } from "@Shared/NavContexts/nav-contexts";
import { contentStyle, layoutStyle } from "@Styles/LayoutStyles";
import AllInput from "@UIElements/AllInput/AllInput";
import Buttons from "@UIElements/Buttons/Buttons";
import { useNotification } from "@UIElements/CNotification/useNotification";
import HomePageLoader from "@UIElements/HomePageLoader/HomePageLoader";
import { Card, Col, Flex, Layout, Modal, Row } from "antd";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const { Content } = Layout;
const { confirm } = Modal;

const CreateTopUp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const topup_type = location.state.topup_type || "";
  const { mode, topup_id } = useParams();
  const { axiosInstance } = useAxiosInstance();
  const { contextHolder, openNotificationWithIcon } = useNotification();
  const { setHeaderTitle, setIconsLevel } = useContext(NavContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isSavingData, setIsSavingData] = useState(false);

  const status = [
    { label: "Active", value: "ACTIVE", disabled: false },
    { label: "Inactive", value: "INACTIVE", disabled: false },
  ];

  const initialFormState = {
    topup_price: {
      elementType: "priceInput",
      elememtConfig: { placeholder: "Price", arialabel: null },
      validations: { errorM: null, valid: false },
      validators: { required: true },
      touched: false,
      value: "",
      disabled: false,
    },
    topup_sdesc: {
      elementType: "textInput",
      elememtConfig: { placeholder: "Short Description", arialabel: null },
      validations: { errorM: null, valid: false },
      validators: { required: true },
      touched: false,
      value: "",
      disabled: false,
    },
    topup_status: {
      elementType: "titleSelect",
      elememtConfig: { placeholder: "Status", arialabel: null, options: status },
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
    setIconsLevel(1);
    setHeaderTitle(
      `${mode === "create" ? "Create" : mode === "edit" ? "Edit" : "View"} ${topup_type === "AI" ? "AI" : "WA"} Top Up`
    );
    setIsLoading(true);

    if (mode !== "create") {
      getTopUpDetails();
    } else {
      setIsLoading(false);
    }
  }, [mode]);

  const getTopUpDetails = () => {
    setIsLoading(true);
    axiosInstance({
      url: topUpAPI + "/" + topup_id,
      method: "GET",
    })
      .then((topUpResponse) => {
        setFetchedDataInForm(topUpResponse?.data);
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

  const goBack = () => {
    navigate(`/subscription-layout/${topup_type === "AI" ? "ai" : "wa"}-top-up`);
  };

  const onClickCreateTopUp = () => {
    confirm({
      title: mode == "edit" ? "Do you want to update this top up?" : "Are you sure to create this top up?",
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
      const url = mode === "edit" ? `${topUpAPI}/${topup_id}` : topUpAPI;
      const method = mode === "edit" ? "PATCH" : "POST";

      let topUps = getValuesFromFormState();
      topUps.topup_type = topup_type;

      axiosInstance({
        url,
        method,
        data: topUps,
      })
        .then(() => {
          openNotificationWithIcon("success", null, `Successfully ${mode == "edit" ? "updated" : "created"} data!`, 4);
          setTimeout(() => {
            setIsSavingData(false);
            navigate(`/subscription-layout/${topup_type === "AI" ? "ai" : "wa"}-top-up`);
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

  const onClickEditTopUp = () => {
    navigate("/create-top-up/edit/" + topup_id, { state: { topup_type } });
  };

  return (
    <Layout style={layoutStyle}>
      <Content style={contentStyle}>
        {contextHolder}
        <Card
          bordered={false}
          bodyStyle={{ padding: "0" }}
          style={{
            height: "72px",
            width: "100%",
            marginBottom: "100px",
            backgroundColor: "#FFFFFF",
            borderRadius: "6px 6px 0px 0px",
            padding: "8px 16px 8px 16px",
            border: "1px solid #ADADAD",
            gap: "8px",
            position: "fixed",
            top: 75,
            left: 80,
            right: 0,
            margin: "auto",
            paddingLeft: "30px",
            paddingRight: "100px",
            paddingTop: "15px",
          }}
        >
          <Flex horizontal="true" justify="space-between" align="center">
            <Buttons
              btntyp="cancel-btn"
              btntext={"Back"}
              w={88}
              onClickFunc={goBack}
              btnColor={"#FFFFFF"}
              disabled={false}
            />

            {mode == "create" || mode == "edit" ? (
              <Buttons
                btntyp="colored-btn"
                btntext={mode == "create" ? "Create" : "Save"}
                w={88}
                onClickFunc={() => {
                  onClickCreateTopUp();
                }}
                btnColor={"#04D357"}
                disabled={isFormValid == false || isSavingData}
              />
            ) : (
              <Buttons
                btntyp="cancel-btn"
                btntext={"Edit"}
                w={88}
                onClickFunc={onClickEditTopUp}
                btnColor={"#4BA3E2"}
                disabled={false}
              />
            )}
          </Flex>
        </Card>
        <Card bordered={false} bodyStyle={{ padding: "0" }} style={{ height: "85%", width: "100%", marginTop: "70px" }}>
          {isLoading == true ? (
            <Row justify="center" style={{ height: "auto", width: "100%", paddingTop: "0px", paddingBottom: "30px" }}>
              <HomePageLoader />
            </Row>
          ) : (
            <Row gutter={[16, 0]} style={{ width: "94%", margin: "auto", paddingTop: "30px", paddingBottom: "30px" }}>
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
                        if (formElement.config.elementType == "titleSelect") {
                          inputChangedHandler(event, formElement.id, event);
                        } else if (formElement.config.elementType == "priceInput") {
                          inputChangedHandler(event, formElement.id, event);
                        } else {
                          inputChangedHandler(event, formElement.id);
                        }
                      }}
                      isRequired={formElement?.config?.validators?.required}
                      disabled={mode == "view" ? true : false}
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

export default CreateTopUp;
