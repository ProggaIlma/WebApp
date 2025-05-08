//ArrayInput
import React from "react";
import { CloseOutlined, HolderOutlined, CloseCircleOutlined, SearchOutlined, } from "@ant-design/icons";
import { Input, Space, Typography, Flex, Tag, InputNumber, Select } from "antd";
const { Text } = Typography;
const ArrayInput = (props) => {
  let inputElement = null;
  switch (props.elementType) {
    case "textInput":
      inputElement = (
        <Space direction="vertical" size={"small"} style={{ width: "100%", marginTop: "20px" }}>
          {props?.hasLabel == true ? (
            <Text style={{ fontWeight: "600", fontSize: "14px", color: "#101828" }}  >
              {props.elememtConfig.placeholder}
              {props.isRequired == true ? "   *" : null}
            </Text>
          ) : null}
          <Flex vertical="true" justify="space-between" align="flex-start">
            <Flex horizontal="true" justify="space-between" align="center" style={{ marginBottom: "10px" }} >
              {props?.droppAble == true ? (
                <HolderOutlined style={{ width: "40px", height: "40px", color: "#8c8c8c", cursor: "pointer", }} />
              ) : null}
              <Input
                size="large" placeholder={props.elememtConfig.placeholder}
                status={props.validations?.errorM?.length > 0 ? "error" : null}
                htmlFor={props.inputVariable}
                value={props.inputVariable}
                onChange={props.onChangedInput}
                disabled={props.disabled}
              />
            </Flex>
            {props.validations.errorM ? (
              <Space direction="vertical" size={1} style={{ marginLeft: "38px" }}>
                {props.validations.errorM.map((eel, index) => {
                  return (<Text type="danger" key={index}> {eel}</Text>);
                })}
              </Space>
            ) : null}
          </Flex>
        </Space>
      );
      break;
    case "numberInput":
      inputElement = (
        <Space direction="vertical" size={"small"} style={{ width: "100%", marginTop: "20px" }}  >
          {props?.hasLabel == true || props?.hasLabel == undefined ? (
            <Text style={{ fontWeight: "600", fontSize: "14px", color: "#101828" }}>
              {props.elememtConfig.placeholder}
              {props.isRequired == true ? "   *" : null}
            </Text>
          ) : null}
          <Flex vertical="true" justify="space-between" align="flex-start" style={{ width: "100%" }} >
            <Flex horizontal="true" justify="space-between" align="center" style={{ marginBottom: "10px", width: "100%" }} >
              <InputNumber size="large"
                placeholder={props.elememtConfig.placeholder}
                status={props.validations?.errorM?.length > 0 ? "error" : null}
                htmlFor={props.inputVariable}
                value={props.inputVariable}
                onChange={props.onChangedInput}
                disabled={props.disabled}
                style={{ width: "100%" }}
                min={props.min ? props.min : ''}
              />
            </Flex>
            {props.validations.errorM ? (
              <Space direction="vertical" size={1} style={{ marginLeft: "2px" }}>
                {props.validations.errorM.map((eel, index) => { return (<Text type="danger" key={index}> {eel} </Text>); })}
              </Space>
            ) : null}
          </Flex>
        </Space>
      );
      break;
    case "titleSelect":
      inputElement = (
        <Space direction="vertical" size={"small"} style={{ width: "100%", marginTop: "20px" }}>
          {props?.hasLabel == true || props?.hasLabel == undefined ? (<Text style={{ fontWeight: "600", fontSize: "14px", color: "#101828" }}>
            {props.elememtConfig.placeholder}
            {props.isRequired == true ? "   *" : null}
          </Text>
          ) : null}
          <Flex vertical="true" justify="space-between" align="flex-start">
            <Flex horizontal="true" justify="space-between" align="center" style={{ marginBottom: "10px", width: "100%" }}>
              <Select
                style={{ width: "100%" }}
                size="large"
                disabled={props.disabled}
                onChange={props.onChangedInput}
                options={props.options}
                value={props.inputVariable}
                allowClear={props?.allowClear}
              >
                {props.options.map((el, index) => {
                  return (
                    <Select.Option key={index} value={el.value}
                      disabled={el.isDisabled == undefined ? false : el.isDisabled} label={el.label}>
                      {el.label}
                    </Select.Option>
                  );
                })}
              </Select>
            </Flex>
            {props.validations.errorM ? (
              <Space direction="vertical" size={1} style={{ marginLeft: "2px" }} >
                {props.validations.errorM.map((eel, index) => {
                  return (<Text type="danger" key={index}> {eel}</Text>);
                })}
              </Space>
            ) : null}
          </Flex>
        </Space>
      );
      break;
    case "chipArray":
      let handleClickOnChip = (index, theI, isDisable) => {
        if (isDisable) return;
        if (props.inputVariable.length >= props.elememtConfig.maxSelect) {
          if (props.inputVariable.includes(el)) { props.onChangedInput(index, theI); }
        } else { props.onChangedInput(index, theI); }
      };

      inputElement = (
        <Space direction="vertical" size={"small"} style={{ width: "100%" }}>
          <Text style={{ fontWeight: "600", fontSize: "14px", color: "#101828" }} >
            {props.elememtConfig.placeholder}
            {props.isRequired == true ? "   *" : null}
          </Text>
          {props.isDisable == true ? (
            <div className="Causes">
              {props.inputVariable.map((el, index) => {
                return (
                  <Tag key={el + index + props.theI} htmlFor={`custom-checkbox-${el + index + props.theI}`}
                    style={{ fontSize: "16px", padding: "7px" }}> {el}  </Tag>
                );
              })}
            </div>
          ) : (
            <div>
              {props.inputVariable.map((el, index) => {
                return (
                  <Tag closeIcon={<CloseCircleOutlined style={{ fontSize: "16px" }} />}
                    key={el + index + props.theI}
                    onClose={() => { handleClickOnChip(index, props.theI, props.isDisable); }}
                    htmlFor={`custom-checkbox-${el + index + props.theI}`}
                    style={{ fontSize: "16px", padding: "7px", marginTop: "5px", }}> {el} </Tag>
                );
              })}
            </div>
          )}
          {props.validations.errorM ? (
            <Space direction="vertical" size={1} style={{ marginLeft: "38px" }}>
              {props.validations.errorM.map((eel, index) => {
                return (<Text type="danger" key={index}> {eel} </Text>);
              })}
            </Space>
          ) : null}
        </Space>
      );
      break;
    case "varOptss":
      inputElement = (
        <Flex vertical="true" justify="space-between" align="flex-start">
          <Flex horizontal="true" justify="space-between" align="center" style={{ marginBottom: "10px" }}>
            <HolderOutlined style={{ width: "40px", height: "40px", color: "#8c8c8c", cursor: "pointer", }} />
            <Input
              size="large"
              placeholder={props.elememtConfig.placeholder}
              status={props.validations?.errorM?.length > 0 ? "error" : null}
              htmlFor={props.inputVariable}
              value={props.inputVariable}
              onChange={props.onChangedInput}
              disabled={props.disabled}
            />
            <CloseOutlined
              style={{ width: "40px", height: "40px", color: "#8c8c8c", marginLeft: "10px", cursor: "pointer", }}
              onClick={() => { props.deleteTheRow(props.oriId); }} />
          </Flex>
          {props.validations.errorM ? (
            <Space direction="vertical" size={1} style={{ marginLeft: "38px" }}>
              {props.validations.errorM.map((eel, index) => {
                return (<Text type="danger" key={index}>       {eel}  </Text>);
              })}
            </Space>
          ) : null}
        </Flex>
      );
      break;
    case "priceInput":
      inputElement = (
        <Space direction="vertical" size={"small"} style={{ width: "100%", marginTop: "20px" }}>
          {props?.hasLabel == true ? (
            <Text style={{ fontWeight: "600", fontSize: "14px", color: "#101828" }}>
              {props.elememtConfig.placeholder}
              {props.isRequired == true ? "   *" : null}
            </Text>
          ) : null}
          <Flex vertical="true" justify="space-between" align="flex-start">
            <Flex horizontal="true" justify="space-between" align="center" style={{ marginBottom: "10px", width: "100%" }} >
              <InputNumber
                size="large" prefix="$"
                placeholder={props.elememtConfig.placeholder}
                status={props.validations?.errorM?.length > 0 ? "error" : null}
                htmlFor={props.inputVariable}
                value={props.inputVariable}
                onChange={props.onChangedInput}
                disabled={props.disabled}
                style={{ width: "100%" }}
              />
            </Flex>
            {props.validations.errorM ? (
              <Space direction="vertical" size={1}>
                {props.validations.errorM.map((eel, index) => {
                  return (<Text type="danger" key={index}>{eel}</Text>);
                })}
              </Space>
            ) : null}
          </Flex>
        </Space>
      );
      break;
    case "autocomplete":
      inputElement = (
        <Space direction="vertical" size={"small"} style={{ width: "100%", marginTop: "20px" }}>
          {props?.hasLabel == true ? (
            <Text style={{ fontWeight: "600", fontSize: "14px", color: "#101828" }}>
              {props.elememtConfig.placeholder}
              {props.isRequired == true ? "   *" : null}
            </Text>
          ) : null}
          <Flex vertical="true" justify="space-between" align="flex-start">
            <div style={{ marginBottom: "10px", display: "flex", width: "100%" }}>
              <Select
                placeholder={props.elememtConfig.placeholder}
                style={props.disabled ? { width: "350px" } : { width: "310px" }}
                size="large" showSearch value={props.inputVariable}
                suffixIcon={!props.disabled ? <SearchOutlined style={{ fontSize: "150%" }} /> : null}
                filterOption={(input, option) => option.label.toLowerCase().indexOf(input.toLowerCase()) !== -1}
                onChange={props.onChangedInput} notFoundContent={null}
                options={props.options} disabled={props.disabled} />
            </div>
            {props.validations.errorM ? (
              <Space direction="vertical" size={1} style={{ marginLeft: "38px" }} >
                {props.validations.errorM.map((eel, index) => {
                  return (<Text type="danger" key={index}>{eel} </Text>);
                })}
              </Space>
            ) : null}
          </Flex>
        </Space>
      );
      break;

    default:
      inputElement = (
        <Space direction="vertical" size={"small"} style={{ width: "100%", marginTop: "20px" }}>
          <Text style={{ fontWeight: "600", fontSize: "14px", color: "#101828" }} >
            {props.elememtConfig.placeholder}
            {props.isRequired == true ? "   *" : null}
          </Text>
          <Flex vertical="true" justify="space-between" align="flex-start">
            <Flex horizontal="true" justify="space-between" align="center" style={{ marginBottom: "10px" }}>
              <Input
                size="large"
                placeholder={props.elememtConfig.placeholder}
                status={props.validations?.errorM?.length > 0 ? "error" : null}
                htmlFor={props.inputVariable}
                value={props.inputVariable}
                onChange={props.onChangedInput}
                disabled={props.disabled}
              />
            </Flex>
            {props.validations.errorM ? (
              <Space direction="vertical" size={1} style={{ marginLeft: "38px" }}>
                {props.validations.errorM.map((eel, index) => {
                  return (<Text type="danger" key={index}>   {eel}  </Text>);
                })}
              </Space>
            ) : null}
          </Flex>
        </Space>
      );
  }
  return <React.Fragment>{inputElement}</React.Fragment>;
};

export default ArrayInput;
