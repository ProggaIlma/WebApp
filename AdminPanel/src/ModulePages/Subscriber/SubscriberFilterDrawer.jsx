import { FilterOutlined } from "@ant-design/icons";
import useFormHook from "@Shared/FormHook/useFormHook";
import Buttons from "@UIElements/Buttons/Buttons";
import AllInput from "@UIElements/AllInput/AllInput";
import { Button, Col, Drawer, Flex, Row } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import { endTime, startTime } from "@Shared/Utils/utils";
import { useAxiosInstance } from "@Shared/axiosInstance/useAxiosInstance";
import { subscriptionPlansUrl } from "@Shared/APIUrls";
import { useNotification } from "@UIElements/CNotification/useNotification";

const SubscriberFilterDrawer = ({ setFilterBy, setFilterStatus }) => {
    const { contextHolder, openNotificationWithIcon } = useNotification();
    const { axiosInstance } = useAxiosInstance();
    const [open, setOpen] = useState(false);
    const [planList, setPlanList] = useState([]);
    const [isFormLoading, setIsFormLoading] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };
    const status = [
        { label: "Active", value: "ACTIVE", disabled: false },
        { label: "Pending", value: "PENDING", disabled: false },
        { label: "Rejected", value: "REJECTED", disabled: false },
        { label: "Inactive", value: "INACTIVE", disabled: false },
        { label: "Cancelled", value: "CANCELLED", disabled: false },
        { label: "Invited", value: "INVITED", disabled: false },
    ];
    const initialFormState = {
        subs_plan_id: {
            elementType: "titleSelect",
            elememtConfig: { placeholder: "Subscription Plan", arialabel: null, options: planList },
            validations: { errorM: null, valid: true },
            validators: { required: false },
            touched: false,
            value: null,
            disabled: false,
        },
        subscription_expiry_from: {
            elementType: "datepicker",
            elememtConfig: { placeholder: "Subscription Expiry From", arialabel: null },
            validations: { errorM: null, valid: true },
            validators: { required: false },
            touched: false,
            value: "",
            disabled: false,
        },
        subscription_expiry_to: {
            elementType: "datepicker",
            elememtConfig: { placeholder: "Subscription Expiry To", arialabel: null },
            validations: { errorM: null, valid: true },
            validators: { required: false },
            touched: false,
            value: "",
            disabled: false,
        },
        org_status: {
            elementType: "titleSelect",
            elememtConfig: { placeholder: "Subscriber Status", arialabel: null, options: status },
            validations: { errorM: null, valid: true },
            validators: { required: false },
            touched: false,
            value: null,
            disabled: false,
        },
    };

    const {
        isFormValid,
        formElementArray,
        setFormValues,
        inputChangedHandler,
        getNonEmptyValuesFromFormState,
        resetFormValues,
    } = useFormHook(initialFormState);
    const getPlanList = () => {
        setIsFormLoading(true);
        axiosInstance({
            url: subscriptionPlansUrl,
            method: "GET",
        })
            .then((res) => {
                const plans = res.data?.map((el) => ({
                    label: el.subs_plan_name,
                    value: el.subs_plan_id,
                    disabled: false,
                }));
                setPlanList(plans);
                const updatedForm = { ...initialFormState };
                updatedForm.subs_plan_id.elememtConfig.options = plans;
                setFormValues(updatedForm);
                setIsFormLoading(false);
            })
            .catch((error) => {
                openNotificationWithIcon(
                    "error",
                    null,
                    error?.response?.data?.errors?.[0] || "Something went wrong in server"
                );
                setIsFormLoading(false);
            });
    };
    useEffect(() => {
        getPlanList();
    }, []);

    const onApplyFilter = () => {
        const filterValues = getNonEmptyValuesFromFormState();
        if (filterValues.subscription_expiry_from) {
            const startDate = startTime(filterValues.subscription_expiry_from);
            filterValues.subscription_expiry_from = startDate;
        }
        if (filterValues.subscription_expiry_to) {
            const endDate = endTime(filterValues.subscription_expiry_to);
            filterValues.subscription_expiry_to = endDate;
        }
        if (filterValues.org_status) {
            setFilterStatus(undefined);
        }
        setFilterBy(filterValues);
        onClose();
    };

    const onResetFilter = () => {
        resetFormValues();
        setFilterBy(null);
        onClose();
    };

    return (
        <Fragment>
            {contextHolder}
            <Button onClick={showDrawer} icon={<FilterOutlined />} style={{ width: 120 }}>
                Filter
            </Button>
            <Drawer title="Filter" onClose={onClose} open={open} width={500}>
                <Flex vertical style={{ height: "100%" }} gap={24}>
                    <div style={{ flex: 1 }}>
                        {!isFormLoading ? (
                            <Row gutter={[15, 12]}>
                                {formElementArray.slice(0, 1).map((formElement, index) => (
                                    <Col span={24} key={index}>
                                        <AllInput
                                            key={formElement.id}
                                            elementType={formElement.config.elementType}
                                            elememtConfig={formElement.config.elememtConfig}
                                            inputVariable={formElement.config.value}
                                            validations={formElement.config.validations}
                                            touched={formElement.config.touched}
                                            allowClear={formElement.config.allowClear}
                                            sbVal={formElement.config.ccValue}
                                            onChangedInput={(event) => {
                                                if (
                                                    formElement.config.elementType == "titleSelect" ||
                                                    formElement.config.elementType == "datepicker"
                                                ) {
                                                    inputChangedHandler(event, formElement.id, event);
                                                } else {
                                                    inputChangedHandler(event, formElement.id);
                                                }
                                            }}
                                            isRequired={formElement?.config?.validators?.required}
                                        />
                                    </Col>
                                ))}
                                {formElementArray.slice(1, 3).map((formElement, index) => (
                                    <Col span={12} key={index}>
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
                                                    formElement.config.elementType == "datepicker"
                                                ) {
                                                    inputChangedHandler(event, formElement.id, event);
                                                } else {
                                                    inputChangedHandler(event, formElement.id);
                                                }
                                            }}
                                            isRequired={formElement?.config?.validators?.required}
                                        />
                                    </Col>
                                ))}
                                {formElementArray.slice(3).map((formElement, index) => (
                                    <Col span={24} key={index}>
                                        <AllInput
                                            key={formElement.id}
                                            elementType={formElement.config.elementType}
                                            elememtConfig={formElement.config.elememtConfig}
                                            inputVariable={formElement.config.value}
                                            validations={formElement.config.validations}
                                            touched={formElement.config.touched}
                                            allowClear={formElement.config.allowClear}
                                            sbVal={formElement.config.ccValue}
                                            onChangedInput={(event) => {
                                                if (
                                                    formElement.config.elementType == "titleSelect" ||
                                                    formElement.config.elementType == "datepicker"
                                                ) {
                                                    inputChangedHandler(event, formElement.id, event);
                                                } else {
                                                    inputChangedHandler(event, formElement.id);
                                                }
                                            }}
                                            isRequired={formElement?.config?.validators?.required}
                                        />
                                    </Col>
                                ))}
                            </Row>
                        ) : null}
                    </div>
                    <Flex justify="flex-end" gap={10}>
                        <Buttons w={118} btntext={"Reset Filter"} onClickFunc={onResetFilter} btntyp={"cancel-btn"} />
                        <Buttons
                            disabled={!isFormValid}
                            btntext={"Filter"}
                            onClickFunc={onApplyFilter}
                            btntyp={"colored-btn"}
                            btnColor={"#8A7CFF"}
                            w={75}
                        />
                    </Flex>
                </Flex>
            </Drawer>
        </Fragment>
    );
};

export default SubscriberFilterDrawer;
