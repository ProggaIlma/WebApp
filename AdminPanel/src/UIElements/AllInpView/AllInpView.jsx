import React from 'react';
import { Space, Typography, } from 'antd';
import { getTheTitleView } from "@Shared/Utils/utils";
import { ViewDateFormatter,TimeFormatter } from '@Shared/Utils/utils';
import "./AllInpView.css";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)
const { Text, Title } = Typography;
const AllInpView = (props) => {
    let inputElement = null;
    switch (props.elementType) {
        case "textInput":
            inputElement = (
                <Space direction="vertical" size={'small'} style={{ width: "90%" }}>
                    <Title style={{ fontWeight: "600", fontSize: "16px", color: "#101828" }}>{props.elememtConfig.placeholder}
                        {props.isRequired == true ? "   *" : null}</Title>
                    <Text style={{ fontWeight: "400", fontSize: "16px", color: "#101828" }}>{props.inputVariable}</Text>
                </Space>
            );
            break;
        case "phnInput":
            inputElement = (
                <Space direction="vertical" size={'small'} style={{ width: "90%" }}>
                    <Title style={{ fontWeight: "600", fontSize: "16px", color: "#101828" }}>{props.elememtConfig.placeholder}
                        {props.isRequired == true ? "   *" : null}</Title>
                    <Text style={{ fontWeight: "400", fontSize: "16px", color: "#101828" }}>
                        {props.sbVal} {props.sbVal !== null && props.sbVal !== undefined ? "|" : null} {props.inputVariable}
                    </Text>
                </Space>
            );
            break;
        case "passwordInput":
            inputElement = (
                <Space direction="vertical" size={'small'} style={{ width: "90%" }}>
                    <Title style={{ fontWeight: "600", fontSize: "16px", color: "#101828" }}>{props.elememtConfig.placeholder}
                        {props.isRequired == true ? "   *" : null}</Title>
                    <Text style={{ fontWeight: "400", fontSize: "16px", color: "#101828" }}>*************</Text>
                </Space>
            );
            break;
        case "titleSelect":
            inputElement = (
                <Space direction="vertical" size={'small'} style={{ width: "90%" }}>
                    <Title style={{ fontWeight: "600", fontSize: "16px", color: "#101828" }}>{props.elememtConfig.placeholder}
                        {props.isRequired == true ? "   *" : null}</Title>
                    <Text style={{ fontWeight: "400", fontSize: "16px", color: "#101828" }}>{getTheTitleView(props.elememtConfig.options, props.inputVariable)}</Text>
                </Space>
            );
            break;
            case "timepicker":
                inputElement = (
                    <Space direction="vertical" size={'small'} style={{ width: "90%" }}>
                        <Title style={{ fontWeight: "600", fontSize: "16px", color: "#101828" }}>{props.elememtConfig.placeholder}
                            {props.isRequired == true ? "   *" : null}</Title>
                        <Text style={{ fontWeight: "400", fontSize: "16px", color: "#101828" }}>{TimeFormatter(props.inputVariable)}</Text>
                    </Space>
                );
                break;
                case "datepicker":
                    inputElement = (
                        <Space direction="vertical" size={'small'} style={{ width: "90%" }}>
                            <Title style={{ fontWeight: "600", fontSize: "16px", color: "#101828" }}>{props.elememtConfig.placeholder}
                                {props.isRequired == true ? "   *" : null}</Title>
                            <Text style={{ fontWeight: "400", fontSize: "16px", color: "#101828" }}>{ViewDateFormatter(props.inputVariable)}</Text>
                        </Space>
                    );
                    break;
                    case "textarea":
                        inputElement = (
                            <Space direction="vertical" size={'small'} style={{ width: "90%" }}>
                                <Title style={{ fontWeight: "600", fontSize: "16px", color: "#101828" }}>{props.elememtConfig.placeholder}
                                    {props.isRequired == true ? "   *" : null}</Title>
                                <Text style={{ fontWeight: "400", fontSize: "16px", color: "#101828" }}>{props.inputVariable}</Text>
                            </Space>
                        );
                        break;
        default:
            inputElement = (
                <Space direction="vertical" size={'small'} style={{ width: "90%" }}>
                    <Title style={{ fontWeight: "600", fontSize: "16px", color: "#101828" }}>{props.elememtConfig.placeholder}
                        {props.isRequired == true ? "   *" : null}</Title>
                    <Text style={{ fontWeight: "400", fontSize: "16px", color: "#101828" }}>{props.inputVariable}</Text>
                </Space>
            );

    }
    return (<React.Fragment>{inputElement}</React.Fragment>);
}

export default AllInpView;