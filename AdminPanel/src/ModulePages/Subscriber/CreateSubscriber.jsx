import { NavContext } from "@Shared/NavContexts/nav-contexts";
import { contentStyle, layoutStyle } from "@Styles/LayoutStyles";
import AllInput from "@UIElements/AllInput/AllInput";
import Buttons from "@UIElements/Buttons/Buttons";
import HomePageLoader from "@UIElements/HomePageLoader/HomePageLoader";
import { Card, Col, Flex, Layout, Modal, Radio, Row } from "antd";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UsersTable from "./UsersTable";
import PaymentsTable from "./PaymentsTable";
import {
  subscriberInfoUrl,
  subscriberUrl,
  subscriptionPlanURL,
} from "@Shared/APIUrls";
import { useAxiosInstance } from "@Shared/axiosInstance/useAxiosInstance";
import { useNotification } from "@UIElements/CNotification/useNotification";
import dayjs from "dayjs";
import useFormHook from "@Shared/FormHook/useFormHook";
import { ExclamationCircleFilled } from "@ant-design/icons";

const { Content, Sider } = Layout;
const { confirm } = Modal;

const CreateSubscriber = () => {
  const navigate = useNavigate();
  const { mode, id } = useParams();
  const { axiosInstance } = useAxiosInstance();
  const { setHeaderTitle } = useContext(NavContext);
  const { contextHolder, openNotificationWithIcon } = useNotification();
  const [userName, setUserName] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSavingData, setIsSavingData] = useState(false);
  const [subscriptionPlans, setSubscriptionPlans] = useState(null);
  const [orgStatus, setOrgStatus] = useState(null);

  const orgChannels = [
    { label: "Whatsapp", value: "WHATSAPP" },
    { label: "Voicechat", value: "VOICECHAT" },
    { label: "Webchat", value: "WEBCHAT" },
  ];

  const [tab, setTab] = useState("users");

  useEffect(() => {
    setHeaderTitle(
      mode === "create"
        ? "Create Subscriber"
        : mode === "edit"
        ? "Edit Subscriber"
        : "View Subscriber"
    );
  }, [mode]);

  const tabs = [
    { label: "Users", value: "users" },
    { label: "Payments", value: "payments" },
  ];
  const status = [
    { label: "Active", value: "ACTIVE", disabled: false },
    { label: "Pending", value: "PENDING", disabled: false },
    { label: "Rejected", value: "REJECTED", disabled: false },
    { label: "Inactive", value: "INACTIVE", disabled: false },
    { label: "Cancelled", value: "CANCELED", disabled: false },
    { label: "Invited", value: "INVITED", disabled: false },
  ];
  const subscriptionType = [
    { label: "Monthly", value: "MONTHLY", disabled: false },
    { label: "Yearly", value: "YEARLY", disabled: false },
  ];

  const initialCreateFormState = {
    org_name: {
      elementType: "textInput",
      elememtConfig: { placeholder: "Subscriber Name", arialabel: null },
      validations: { errorM: null, valid: false },
      validators: { required: true },
      touched: false,
      value: "",
      disabled: false,
    },
    subs_plan_id: {
      elementType: "titleSelect",
      elememtConfig: {
        placeholder: "Subscription Plan",
        arialabel: null,
        options: subscriptionPlans,
      },
      validations: { errorM: null, valid: false },
      validators: { required: true },
      touched: false,
      value: null,
      disabled: false,
    },
    subs_plan_type: {
      elementType: "titleSelect",
      elememtConfig: {
        placeholder: "Subscription Type",
        arialabel: null,
        options: subscriptionType,
      },
      validations: { errorM: null, valid: false },
      validators: { required: true },
      touched: false,
      value: null,
      disabled: false,
    },
    org_sub_whatsapp_wallet_amount: {
      elementType: "numberInput",
      elememtConfig: {
        placeholder: "WhatsApp Wallet Balance",
        arialabel: null,
      },
      validations: { errorM: null, valid: true },
      validators: { required: false },
      touched: false,
      value: null,
      disabled: false,
    },
    org_sub_ai_wallet_amount: {
      elementType: "numberInput",
      elememtConfig: { placeholder: "AI Wallet Balance", arialabel: null },
      validations: { errorM: null, valid: true },
      validators: { required: false },
      touched: false,
      value: null,
      disabled: false,
    },
    org_mem_username: {
      elementType: "textInput",
      elememtConfig: { placeholder: "User Name", arialabel: null },
      validations: { errorM: null, valid: false },
      validators: { required: true },
      touched: false,
      value: "",
      disabled: false,
    },
    org_mem_email: {
      elementType: "textInput",
      elememtConfig: { placeholder: "Email", arialabel: null },
      validations: { errorM: null, valid: false },
      validators: { required: true, isEmail: true },
      touched: false,
      value: "",
      disabled: false,
    },
    org_sub_activation_start_date: {
      elementType: "datepicker",
      elememtConfig: {
        placeholder: "Subscription / Trial Start Date",
        arialabel: null,
      },
      validations: { errorM: null, valid: true },
      validators: { required: false },
      touched: false,
      value: null,
      disabled: false,
    },
    org_sub_activation_end_date: {
      elementType: "datepicker",
      elememtConfig: {
        placeholder: "Subscription / Trial End Date",
        arialabel: null,
      },
      validations: { errorM: null, valid: true },
      validators: { required: false },
      touched: false,
      value: null,
      disabled: false,
    },
    org_channels: {
      elementType: "multiChipSelect",
      elememtConfig: {
        placeholder: "Org Channels",
        arialabel: null,
        options: orgChannels,
      },
      validations: { errorM: null, valid: true },
      validators: { required: false },
      touched: false,
      value: [],
      disabled: false,
    },
  };
  const initialFormState = {
    org_name: {
      elementType: "textInput",
      elememtConfig: { placeholder: "Subscriber Name", arialabel: null },
      validations: { errorM: null, valid: false },
      validators: { required: true },
      touched: false,
      value: "",
      disabled: false,
    },
    subs_plan_id: {
      elementType: "titleSelect",
      elememtConfig: {
        placeholder: "Subscription Plan",
        arialabel: null,
        options: subscriptionPlans,
      },
      validations: { errorM: null, valid: false },
      validators: { required: true },
      touched: false,
      value: null,
      disabled: false,
    },
    subs_plan_type: {
      elementType: "titleSelect",
      elememtConfig: {
        placeholder: "Subscription Type",
        arialabel: null,
        options: subscriptionType,
      },
      validations: { errorM: null, valid: false },
      validators: { required: true },
      touched: false,
      value: null,
      disabled: false,
    },
    org_status: {
      elementType: "titleSelect",
      elememtConfig: {
        placeholder: "Subscriber Status",
        arialabel: null,
        options: status,
      },
      validations: { errorM: null, valid: false },
      validators: { required: true },
      touched: false,
      value: null,
      disabled: false,
    },
    org_sub_whatsapp_wallet_amount: {
      elementType: "numberInput",
      elememtConfig: {
        placeholder: "WhatsApp Wallet Balance",
        arialabel: null,
      },
      validations: { errorM: null, valid: true },
      validators: { required: false },
      touched: false,
      value: null,
      disabled: false,
    },
    org_sub_ai_wallet_amount: {
      elementType: "numberInput",
      elememtConfig: { placeholder: "AI Wallet Balance", arialabel: null },
      validations: { errorM: null, valid: true },
      validators: { required: false },
      touched: false,
      value: null,
      disabled: false,
    },
    total_active_users: {
      elementType: "numberInput",
      elememtConfig: { placeholder: "Total Active Users", arialabel: null },
      validations: { errorM: null, valid: true },
      validators: { required: false },
      touched: false,
      value: null,
      disabled: false,
    },
    org_sub_wallet_amount: {
      elementType: "numberInput",
      elememtConfig: { placeholder: "Outstanding Payment", arialabel: null },
      validations: { errorM: null, valid: true },
      validators: { required: false },
      touched: false,
      value: null,
      disabled: false,
    },
    org_sub_activation_start_date: {
      elementType: "datepicker",
      elememtConfig: {
        placeholder: "Subscription / Trial Start Date",
        arialabel: null,
      },
      validations: { errorM: null, valid: true },
      validators: { required: false },
      touched: false,
      value: null,
      disabled: false,
    },
    org_sub_activation_end_date: {
      elementType: "datepicker",
      elememtConfig: {
        placeholder: "Subscription / Trial End Date",
        arialabel: null,
      },
      validations: { errorM: null, valid: true },
      validators: { required: false },
      touched: false,
      value: null,
      disabled: false,
    },
    org_channels: {
      elementType: "multiChipSelect",
      elememtConfig: {
        placeholder: "Org Channels",
        arialabel: null,
        options: orgChannels,
      },
      validations: { errorM: null, valid: true },
      validators: { required: false },
      touched: false,
      value: [],
      disabled: false,
    },
  };
  const {
    isFormValid,
    formElementArray,
    inputChangedHandler,
    setIsFormValid,
    setFormValues,
    getValuesFromFormState,
    setFetchedDataInForm,
  } = useFormHook(
    mode === "create" ? initialCreateFormState : initialFormState
  );

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const requests = [
        axiosInstance({
          url: subscriptionPlanURL,
          method: "GET",
          params: {
            order_by: "updatedAt",
            order: "DESC",
            page: 1,
            pageSize: 1000,
          },
        }),
      ];
      if (mode !== "create") {
        requests.push(
          axiosInstance({
            url: `${subscriberInfoUrl}/${id}`,
            method: "GET",
          })
        );
      }
      const [subscriptionPlanRes, subscriberInfoRes] = await Promise.all(
        requests
      );
      if (subscriptionPlanRes?.data?.data?.data) {
        const subsPlans = subscriptionPlanRes.data?.data?.data.map((item) => ({
          label: item.subs_plan_name,
          value: item.subs_plan_id,
        }));
        setSubscriptionPlans(subsPlans);
        setFormValues((prevState) => ({
          ...prevState,
          subs_plan_id: {
            ...prevState.subs_plan_id,
            elememtConfig: {
              ...prevState.subs_plan_id.elememtConfig,
              options: subsPlans,
            },
          },
        }));
      }
      if (subscriberInfoRes?.data) {
        setOrgStatus(subscriberInfoRes.data?.orgInfo?.org_status);
        setUserName(subscriberInfoRes.data?.orgMem?.org_mem_username);
        const fetchedData = {
          ...subscriberInfoRes.data.orgInfo,
          ...subscriberInfoRes.data.orgInfo?.OrgSub,
          ...subscriberInfoRes.data.orgMem,
          ...subscriberInfoRes.data.orgInfo?.org_channels,
        };
        fetchedData.org_sub_activation_start_date =
          fetchedData.org_sub_activation_start_date
            ? dayjs(fetchedData.org_sub_activation_start_date)
            : fetchedData.org_sub_activation_start_date;
        fetchedData.org_sub_activation_end_date =
          fetchedData.org_sub_activation_end_date
            ? dayjs(fetchedData.org_sub_activation_end_date)
            : fetchedData.org_sub_activation_end_date;
        setFetchedDataInForm(fetchedData);
        setIsFormValid(true);
      }
      setIsLoading(false);
    } catch (error) {
      openNotificationWithIcon(
        "error",
        null,
        error.response?.data?.message || "Something went wrong in server"
      );
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getActivationStartDate = (date) => {
    return date ? new Date(date) : new Date();
  };

  const getActivationEndDate = (type, date) => {
    if (date) return new Date(date);
    else {
      const currentDate = new Date();
      return type === "MONTHLY"
        ? new Date(new Date(currentDate).setDate(currentDate.getDate() + 30))
        : new Date(new Date(currentDate).setDate(currentDate.getDate() + 365));
    }
  };
  const onClickCreateSubscriber = () => {
    confirm({
      title:
        mode === "edit"
          ? "Do you want to update this subscriber?"
          : "Are you sure to create this subscriber?",
      icon: <ExclamationCircleFilled />,
      okText: "Yes",
      okType: "primary",
      cancelText: "No",
      centered: true,
      onOk() {
        onConfirmOrCancel(true);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  const onConfirmOrCancel = async (data) => {
    if (data === true) {
      const url = mode === "create" ? subscriberUrl : `${subscriberUrl}/${id}`;
      const method = mode === "create" ? "POST" : "PATCH";
      const formValues = getValuesFromFormState();
      let subscriberData =
        mode === "create"
          ? getCreateSubscriberData(formValues)
          : getUpdateSubscriberData(formValues);

      setIsSavingData(true);
      try {
        await axiosInstance({ url, method, data: subscriberData });
        openNotificationWithIcon(
          "success",
          null,
          `Successfully ${mode === "edit" ? "updated" : "created"} subscriber`,
          4
        );
        setTimeout(() => {
          setIsSavingData(false);
          navigate(`/subscriber`);
        }, 3000);
      } catch (error) {
        const errorMessage =
          error?.response?.data?.errors?.join(", ") ||
          error?.response?.data?.message ||
          "Something went wrong in server";
        openNotificationWithIcon("error", null, errorMessage, 6);
        setIsSavingData(false);
      }
    }
  };

  const getCreateSubscriberData = (formValues) => ({
    org_data: {
      org_name: formValues.org_name,
      org_channels: formValues.org_channels,
    },
    org_mem_data: {
      org_mem_username: formValues.org_mem_username,
      org_mem_email: formValues.org_mem_email,
      org_mem_auth_type: null,
      org_mem_role_type: "MASTER_ADMIN",
      org_mem_password: null,
    },
    org_sub_data: {
      subs_plan_id: 3,
      subs_plan_type: formValues.subs_plan_type,
      org_sub_whatsapp_wallet_amount: formValues.org_sub_whatsapp_wallet_amount,
      org_sub_ai_wallet_amount: formValues.org_sub_ai_wallet_amount,
      org_sub_activation_start_date: getActivationStartDate(
        formValues.org_sub_activation_start_date
      ),
      org_sub_activation_end_date: getActivationEndDate(
        formValues.subs_plan_type,
        formValues.org_sub_activation_end_date
      ),
    },
  });
  const getUpdateSubscriberData = (formValues) => ({
    org_data: {
      org_name: formValues.org_name,
      org_status: formValues.org_status,
      org_channels: formValues.org_channels,
    },
    org_mem_data: {
      org_mem_username: userName,
    },
    org_sub_data: {
      subs_plan_id: formValues.subs_plan_id,
      org_sub_status: "ACTIVE",
      subs_plan_type: formValues.subs_plan_type,
      org_sub_whatsapp_wallet_amount: formValues.org_sub_whatsapp_wallet_amount,
      org_sub_ai_wallet_amount: formValues.org_sub_ai_wallet_amount,
      org_sub_wallet_amount: formValues.org_sub_wallet_amount,
      org_sub_activation_start_date: getActivationStartDate(
        formValues.org_sub_activation_start_date
      ),
      org_sub_activation_end_date: getActivationEndDate(
        formValues.subs_plan_type,
        formValues.org_sub_activation_end_date
      ),
    },
  });

  return (
    <Layout style={layoutStyle}>
      {contextHolder}
      <Sider
        width="0%"
        style={{
          textAlign: "center",
          height: `${window.innerHeight - 72}px`,
          overflow: "scroll",
          padding: "0px",
        }}
      />
      <Content style={contentStyle}>
        <div
          style={{
            margin: "-20px",
            backgroundColor: "#FFF",
            padding: "16px 24px",
            borderTop: "1px solid #ADADAD",
            borderBottom: "1px solid #ADADAD",
            borderRadius: "0px 0px 8px 8px",
          }}>
          <Flex justify="space-between" align="center">
            <Buttons
              w={88}
              btntext="Back"
              btntyp={"cancel-btn"}
              onClickFunc={() => navigate("/subscriber")}
            />

            {mode === "create" || mode === "edit" ? (
              <Buttons
                disabled={!isFormValid || isSavingData}
                onClickFunc={onClickCreateSubscriber}
                w={88}
                btntext={mode === "create" ? "Create" : "Save"}
                btntyp={"colored-btn"}
                btnColor="#8A7CFF"
              />
            ) : (
              <Buttons
                btntyp="cancel-btn"
                btntext={"Edit"}
                w={88}
                onClickFunc={() => navigate(`/create-subscriber/edit/${id}`)}
                btnColor={"#4BA3E2"}
                disabled={false}
              />
            )}
          </Flex>
        </div>
        <Card style={{ marginTop: "44px", width: "100%", height: "auto" }}>
          {isLoading ? (
            <Row
              style={{
                height: "auto",
                width: "100%",
                paddingTop: "0px",
                paddingBottom: "30px",
              }}>
              <HomePageLoader />
            </Row>
          ) : (
            <Row
              gutter={[24, 16]}
              style={{
                margin: "auto",
                paddingTop: "30px",
                paddingBottom: "30px",
              }}>
              {formElementArray.map((formElement, index) => {
                const isDisabled = () => {
                  if (mode === "view") return true;
                  if (formElement.id === "total_active_users") return true;
                  if (formElement.id === "org_status") {
                    return orgStatus === "PENDING" || orgStatus === "INVITED";
                  }
                  return false;
                };
                return (
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
                          if (
                            formElement.config.elementType == "titleSelect" ||
                            formElement.config.elementType == "datepicker" ||
                            formElement.config.elementType == "numberInput" ||
                            formElement.config.elementType == "multiChipSelect"
                          ) {
                            inputChangedHandler(event, formElement.id, event);
                          } else {
                            inputChangedHandler(event, formElement.id);
                          }
                        }}
                        isRequired={formElement?.config?.validators?.required}
                        disabled={isDisabled()}
                      />
                    }
                  </Col>
                );
              })}
            </Row>
          )}

          {(mode === "view" || mode === "edit") && (
            <Row
              gutter={[0, 0]}
              style={{ margin: "auto", width: "100%", overflow: "hidden" }}>
              <Radio.Group
                value={tab}
                onChange={(e) => setTab(e.target.value)}
                style={{ height: "40px" }}>
                {tabs.map((el, index) => {
                  return (
                    <Radio.Button
                      className={
                        tab === el.value || undefined
                          ? "selected_filter_btn"
                          : "not_selected_filter_btn"
                      }
                      key={index}
                      value={el.value}>
                      {el.label}
                    </Radio.Button>
                  );
                })}
              </Radio.Group>
              {tab === "users" ? (
                <UsersTable org_id={id} />
              ) : (
                <PaymentsTable org_id={id} />
              )}
            </Row>
          )}
        </Card>
      </Content>
    </Layout>
  );
};
export default CreateSubscriber;
