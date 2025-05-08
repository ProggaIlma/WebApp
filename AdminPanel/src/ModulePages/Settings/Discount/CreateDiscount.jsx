import { ExclamationCircleFilled } from "@ant-design/icons";
import { discountURL, subscriptionPlanURL } from "@Shared/APIUrls";
import { useAxiosInstance } from "@Shared/axiosInstance/useAxiosInstance";
import { NavContext } from "@Shared/NavContexts/nav-contexts";
import { contentStyle, layoutStyle } from "@Styles/LayoutStyles";
import AllInput from "@UIElements/AllInput/AllInput";
import Buttons from "@UIElements/Buttons/Buttons";
import { useNotification } from "@UIElements/CNotification/useNotification";
import HomePageLoader from "@UIElements/HomePageLoader/HomePageLoader";
import { Card, Col, Flex, Layout, Modal, Row } from "antd";
import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useDiscountHook from "./useDiscountHook";
import { startTime, endTime } from "@Shared/Utils/utils";

const { Content } = Layout;
const { confirm } = Modal;

const CreateDiscount = () => {
  const { setHeaderTitle } = useContext(NavContext);
  const { contextHolder, openNotificationWithIcon } = useNotification();
  const { mode, disc_id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isSavingData, setIsSavingData] = useState(false);
  const navigate = useNavigate();
  const { axiosInstance } = useAxiosInstance();
  const [subscriptionPlans, setSubscriptionPlans] = useState(null);

  const discTypes = [
    { label: "Percentage", value: "Percentage", disabled: false },
    { label: "Fixed", value: "Fixed", disabled: false },
  ];

  useEffect(() => {
    setHeaderTitle(
      mode === "create"
        ? "Create Discount"
        : mode === "edit"
        ? "Edit Discount"
        : "View Discount"
    );
  }, [mode]);

  useEffect(() => {
    const fetchedData = async () => {
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
              url: `${discountURL}/${disc_id}`,
              method: "GET",
            })
          );
        }
        const [subscriptionPlanRes, discountDetailRes] = await Promise.all(
          requests
        );

        if (subscriptionPlanRes?.data?.data?.data) {
          const subsPlans = subscriptionPlanRes.data?.data?.data.map(
            (item) => ({
              label: item.subs_plan_name,
              value: Number(item.subs_plan_id),
            })
          );
          setSubscriptionPlans(subsPlans);

          setFormValues((prevState) => ({
            ...prevState,
            disc_applies_to_plan_ids: {
              ...prevState.disc_applies_to_plan_ids,
              elememtConfig: {
                ...prevState.disc_applies_to_plan_ids.elememtConfig,
                options: subsPlans,
              },
            },
          }));
        }

        if (discountDetailRes?.data) {
          const fetchedData = { ...discountDetailRes.data };
          fetchedData.disc_start_date = fetchedData.disc_start_date
            ? dayjs(fetchedData.disc_start_date)
            : fetchedData.disc_start_date;
          fetchedData.disc_start_time = fetchedData.disc_start_time
            ? dayjs(fetchedData.disc_start_time)
            : fetchedData.disc_start_time;
          fetchedData.disc_end_date = fetchedData.disc_end_date
            ? dayjs(fetchedData.disc_end_date)
            : fetchedData.disc_end_date;
          fetchedData.disc_end_time = fetchedData.disc_end_time
            ? dayjs(fetchedData.disc_end_time)
            : fetchedData.disc_end_time;
          setFetchedDataInForm(fetchedData);
          setIsFormValid(true);
        }
        setIsLoading(false);
      } catch (error) {
        openNotificationWithIcon(
          "error",
          null,
          error?.response?.data?.errors?.[0] !== undefined
            ? error.response.data?.errors[0]
            : "Something went wrong in server",
          6
        );
        setIsLoading(false);
      }
    };
    fetchedData();
  }, []);

  const discAppliesTo = [
    { label: "All", value: "ALL", disabled: false },
    { label: "Monthly", value: "MONTHLY", disabled: false },
    { label: "Yearly", value: "YEARLY", disabled: false },
    { label: "Specific", value: "SPECIFIC", disabled: false },
  ];

  const initialFormState = {
    disc_name: {
      elementType: "textInput",
      elememtConfig: { placeholder: "Discount Name", arialabel: null },
      validations: { errorM: null, valid: false },
      validators: { required: true },
      touched: false,
      value: "",
      disabled: false,
    },
    disc_code: {
      elementType: "textInput",
      elememtConfig: { placeholder: "Promo Code", arialabel: null },
      validations: { errorM: null, valid: false },
      validators: { required: true },
      touched: false,
      value: "",
      disabled: false,
    },
    disc_type: {
      elementType: "titleSelect",
      elememtConfig: {
        placeholder: "Discount Type",
        arialabel: null,
        options: discTypes,
      },
      validations: { errorM: null, valid: false },
      validators: { required: true },
      touched: false,
      value: null,
      disabled: false,
    },
    disc_value: {
      elementType: "numberInput",
      elememtConfig: { placeholder: "Discount Value", arialabel: null },
      validations: { errorM: null, valid: false },
      validators: { required: true },
      touched: false,
      value: null,
      disabled: false,
    },
    disc_applies_to: {
      elementType: "titleSelect",
      elememtConfig: {
        placeholder: "Applies To",
        arialabel: null,
        options: discAppliesTo,
      },
      validations: { errorM: null, valid: false },
      validators: { required: true },
      touched: false,
      value: null,
      disabled: false,
    },
    disc_applies_to_plan_ids: {
      elementType: "multiChipSelect",
      elememtConfig: {
        placeholder: "Specify Plan",
        arialabel: null,
        options: subscriptionPlans,
      },
      validations: { errorM: null, valid: true },
      validators: { required: false },
      touched: false,
      value: [],
      disabled: false,
    },
    disc_usage_limit: {
      elementType: "numberInput",
      elememtConfig: { placeholder: "Total Usage Limit", arialabel: null },
      validations: { errorM: null, valid: true },
      validators: { required: false },
      touched: false,
      value: null,
      disabled: false,
    },
    disc_start_date: {
      elementType: "datepicker",
      elememtConfig: { placeholder: "Discount Start Date", arialabel: null },
      validations: { errorM: null, valid: true },
      validators: { required: false },
      touched: false,
      value: "",
      disabled: false,
    },
    disc_start_time: {
      elementType: "timepicker",
      elememtConfig: { placeholder: "Discount Start Time", arialabel: null },
      validations: { errorM: null, valid: true },
      validators: { required: false },
      touched: false,
      value: "",
      disabled: false,
    },
    disc_end_date: {
      elementType: "datepicker",
      elememtConfig: { placeholder: "Discount End Date", arialabel: null },
      validations: { errorM: null, valid: true },
      validators: { required: false },
      touched: false,
      value: "",
      disabled: false,
    },
    disc_end_time: {
      elementType: "timepicker",
      elememtConfig: { placeholder: "Discount End Time", arialabel: null },
      validations: { errorM: null, valid: true },
      validators: { required: false },
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
    setFormValues,
    getValuesFromFormState,
    setFetchedDataInForm,
  } = useDiscountHook(initialFormState);

  const onClickCreateDiscount = () => {
    confirm({
      title:
        mode === "edit"
          ? "Do you want to update this discount?"
          : "Are you sure to create this discount?",
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

  const onConfirmOrCancel = (data) => {
    if (data == true) {
      const url = mode === "edit" ? `${discountURL}/${disc_id}` : discountURL;
      const method = mode === "edit" ? "PATCH" : "POST";

      const discountData = getValuesFromFormState();

      let startDateObj = discountData.disc_start_date
        ? new Date(discountData.disc_start_date)
        : null;
      let startTimeObj = discountData.disc_start_time
        ? new Date(discountData.disc_start_time)
        : null;
      let endDateObj = discountData.disc_end_date
        ? new Date(discountData.disc_end_date)
        : null;
      let endTimeObj = discountData.disc_end_time
        ? new Date(discountData.disc_end_time)
        : null;

      startDateObj = adjustDateWithTime(startDateObj, startTimeObj);
      endDateObj = adjustDateWithTime(endDateObj, endTimeObj);

      const updatedData = {
        ...discountData,
        disc_start_date: startDateObj,
        disc_start_time: startDateObj,
        disc_end_date: endDateObj,
        disc_end_time: endDateObj,
      };

      if (startDateObj && endDateObj && endDateObj <= startDateObj) {
        openNotificationWithIcon(
          "error",
          null,
          "End date should be greater than start date"
        );
        return;
      }
      setIsSavingData(true);
      axiosInstance({
        url,
        method,
        data: updatedData,
      })
        .then(() => {
          openNotificationWithIcon(
            "success",
            null,
            `Successfully ${mode == "edit" ? "updated" : "created"} discount`,
            4
          );
          setTimeout(() => {
            setIsSavingData(false);
            navigate(`/settings/discount`);
          }, 3000);
        })
        .catch((error) => {
          openNotificationWithIcon(
            "error",
            null,
            error?.response?.data?.errors?.[0] !== undefined
              ? error.response.data?.errors[0]
              : "Something went wrong in server",
            6
          );
          setIsSavingData(false);
        });
    }
  };

  const adjustDateWithTime = (dateObj, timeObj) => {
    if (dateObj) {
      if (timeObj) {
        dateObj.setHours(timeObj.getHours());
        dateObj.setMinutes(timeObj.getMinutes());
      } else {
        dateObj = startTime(dateObj);
      }
      return dateObj;
    }
    return null;
  };

  return (
    <Layout style={layoutStyle}>
      {contextHolder}
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
              onClickFunc={() => navigate("/settings/discount")}
            />

            {mode === "create" || mode === "edit" ? (
              <Buttons
                disabled={!isFormValid || isSavingData}
                onClickFunc={onClickCreateDiscount}
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
                onClickFunc={() => navigate(`/create-discount/edit/${disc_id}`)}
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
                        if (
                          formElement.config.elementType == "titleSelect" ||
                          formElement.config.elementType == "datepicker" ||
                          formElement.config.elementType == "timepicker" ||
                          formElement.config.elementType == "numberInput" ||
                          formElement.config.elementType == "multiChipSelect"
                        ) {
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
export default CreateDiscount;
