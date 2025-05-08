import { FilterOutlined } from "@ant-design/icons";
import useFormHook from "@Shared/FormHook/useFormHook";
import Buttons from "@UIElements/Buttons/Buttons";
import AllInput from "@UIElements/AllInput/AllInput";
import { Button, Col, Drawer, Flex, Row } from "antd";
import React, { Fragment, useState } from "react";
import { endTime, startTime } from "@Shared/Utils/utils";

const DiscountFilterDrawer = ({ setFilterBy }) => {
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };
    const discTypes = [
        { label: "Percentage", value: "Percentage", disabled: false },
        { label: "Fixed", value: "Fixed", disabled: false },
    ];

    const discAppliesTo = [
        { label: "All", value: "ALL", disabled: false },
        { label: "Monthly", value: "MONTHLY", disabled: false },
        { label: "Yearly", value: "YEARLY", disabled: false },
        { label: "Specific", value: "SPECIFIC", disabled: false },
    ];
    const initialFormState = {
        disc_type: {
            elementType: "titleSelect",
            elememtConfig: { placeholder: "Discount Type", arialabel: null, options: discTypes },
            validations: { errorM: null, valid: true },
            validators: { required: false },
            touched: false,
            value: null,
            disabled: false,
            allowClear: true,
        },
        disc_applies_to: {
            elementType: "titleSelect",
            elememtConfig: { placeholder: "Applies To", arialabel: null, options: discAppliesTo },
            validations: { errorM: null, valid: true },
            validators: { required: false },
            touched: false,
            value: null,
            disabled: false,
            allowClear: true,
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
        disc_end_date: {
            elementType: "datepicker",
            elememtConfig: { placeholder: "Discount End Date", arialabel: null },
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
        getNonEmptyValuesFromFormState,
        resetFormValues,
    } = useFormHook(initialFormState);

    const onApplyFilter = () => {
        const filterValues = getNonEmptyValuesFromFormState();
        if(filterValues.disc_start_date){
            const startDate = startTime(filterValues.disc_start_date)
            filterValues.disc_start_date = startDate;
        }
        if(filterValues.disc_end_date){
            const endDate = endTime(filterValues.disc_end_date)
            filterValues.disc_end_date = endDate;
        }
        setFilterBy(filterValues)
        onClose();
    };

    const onResetFilter = () => {
        resetFormValues();
        setFilterBy(null);
        onClose();

    };

    return (
        <Fragment>
            <Button onClick={showDrawer} icon={<FilterOutlined />} style={{ width: 120 }}>
                Filter
            </Button>
            <Drawer title="Filter" onClose={onClose} open={open} width={500}>
                <Flex vertical style={{ height: "100%" }} gap={24}>
                    <div style={{ flex: 1 }}>
                        <Row gutter={[15, 12]}>
                            {formElementArray.slice(0, 2).map((formElement, index) => (
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
                            {formElementArray.slice(2).map((formElement, index) => (
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
                        </Row>
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

export default DiscountFilterDrawer;
