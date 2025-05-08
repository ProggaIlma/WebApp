//AllInput
import React, { useState, useRef, useEffect, Fragment } from 'react';
import { EyeInvisibleOutlined, SearchOutlined, PlusOutlined, EyeOutlined } from '@ant-design/icons';
import { Input, Space, Typography, Select, InputNumber, DatePicker, TimePicker, Tag, Tooltip, Flex, Checkbox } from 'antd';
import countrycodes from "./countrycodes";
import dayjs from 'dayjs';
import { Switch } from 'antd';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { ViewDateFormatter, getTheTitleView } from '@Shared/Utils/utils';
dayjs.extend(customParseFormat);
const { TextArea } = Input;
const { Text } = Typography;
const { Option } = Select;
const extraSpace = <div className="inpLabelstyle"></div>;
const tagPlusStyle = {
  height: 22,
  background: 'white',
  borderStyle: 'dashed',
  fontSize: "14px", FontFace: "Lato"
};
const tagInputStyle = {
  width: 64,
  height: 22,
  marginInlineEnd: 8,
  verticalAlign: 'top'
};
const AllInput = (props) => {
  const [checkd, setCheckd] = useState(false)
  useEffect(() => {
    if (props.elementType == "checkBoxInput") {
      setCheckd(props.inputVariable);
    }
  }, [])

  let inputElement = null;
  switch (props.elementType) {
    case "textInput":
      inputElement = (
        <Space direction="vertical" size={'small'} style={{ width: "100%" }}>
          <Text style={{ fontWeight: "600", fontSize: "14px", color: "#101828" }}>{props.elememtConfig.placeholder}
            {props.isRequired == true ? "   *" : null}</Text>
          <Input size="large"
            placeholder={props.elememtConfig.placeholder}
            status={props.validations?.errorM?.length > 0 ? 'error' : null}
            htmlFor={props.inputVariable}
            value={props.inputVariable}
            onChange={props.onChangedInput}
            disabled={props.disabled}
          />
          {props.elememtConfig.arialabel == null ?
            (extraSpace) :
            <Text type="secondary" style={{ paddingLeft: "5px" }}>{props.elememtConfig.arialabel}</Text>
          }

          {
            props.validations.errorM ? (
              <Space direction="vertical" size={1}>
                {props.validations.errorM.map((eel, index) => {
                  return (<Text type="danger" key={index}>{eel}</Text>);
                })}
              </Space>
            ) : null
          }

        </Space >
      );
      break;
    case "phnInput":
      const [sBf, setSBF] = useState(props.sbVal);
      const [pnhIn, setPnhIn] = useState("");
      const handleChangesBF = (value) => {
        setSBF(value);
        props.onChangedInput(pnhIn || props.inputVariable, value)
      };
      const selectBefore = (
        <Select style={{ width: 70, }} onChange={handleChangesBF} value={props.sbVal} disabled={props.disabled}>
          {countrycodes.map(((el, index) => { return <Option key={index} value={el.value}>{el.value}</Option> }))}
        </Select>
      );
      inputElement = (
        <Space direction="vertical" size={'small'} style={{ width: "100%" }}>
          <Text style={{ fontWeight: "600", fontSize: "14px", color: "#101828" }}>{props.elememtConfig.placeholder}
            {props.isRequired == true ? "   *" : null}</Text>
          <InputNumber size="large"
            placeholder={props.elememtConfig.placeholder}
            status={props.validations?.errorM?.length > 0 ? 'error' : null}
            htmlFor={props.inputVariable}
            value={props.inputVariable}
            addonBefore={selectBefore}
            disabled={props.disabled}
            onChange={(event => {
              props.onChangedInput(event, props.sbVal); 
              setSBF(props.sbVal)
              setPnhIn(event);
            })}
            style={{ width: "100%" }}
          />
          {props.elememtConfig.arialabel == null ?
            (extraSpace) :
            <Text type="secondary" style={{ paddingLeft: "5px" }}>{props.elememtConfig.arialabel}</Text>
          }
          {props.validations.errorM ? (
            <Space direction="vertical" size={1}>
              {props.validations.errorM.map((eel, index) => {
                return (<Text type="danger" key={index}>{eel}</Text>);
              })}
            </Space>
          ) : null}

        </Space>
      );
      break;
    case "passwordInput":
      inputElement = (
        <Space direction="vertical" style={{ width: "100%" }}>
           <Text style={{ fontWeight: "600", fontSize: "14px", color: "#101828" }}>{props.elememtConfig.placeholder}
           {props.isRequired == true ? "   *" : null}</Text>
          <Input.Password size="large"
            iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
            placeholder={props.elememtConfig.placeholder}
            status={props.validations?.errorM?.length > 0 ? 'error' : null}
            htmlFor={props.inputVariable}
            value={props.inputVariable} disabled={props.disabled}
            onChange={props.onChangedInput}
          />
          {props.elememtConfig.arialabel == null ?
            (extraSpace) :
            <Text type="secondary" style={{ paddingLeft: "5px" }}>{props.elememtConfig.arialabel}</Text>
          }
          {props.validations.errorM ? (
            <Space direction="vertical" size={1}>
              {props.validations.errorM.map((eel, index) => {
                return (<Text type="danger" key={index}>{eel}</Text>);
              })}
            </Space>
          ) : null}

        </Space>);
      break;
    case "titleSelect":
      inputElement = (
        <Space direction="vertical" size={'small'} style={{ width: "100%" }}>
          <Text style={{ fontWeight: "600", fontSize: "14px", color: "#101828" }}>{props.elememtConfig.placeholder}
            {props.isRequired == true ? "   *" : null}</Text>
          <Select style={{ width: "100%" }} size="large" disabled={props.disabled}
            onChange={props.onChangedInput} options={props.elememtConfig.options}
            value={props.inputVariable} allowClear={props.allowClear} placeholder={props.elememtConfig.placeholder}>
            {props?.elememtConfig?.options?.map((el, index) => {
              return (
                < Select.Option key={index} value={el.value} disabled={el.isDisabled == undefined ? false : el.isDisabled} > {el.label}</Select.Option>)
            })}
          </Select>
          {
            props.elememtConfig.arialabel == null ?
              (extraSpace) :
              <Text type="secondary" style={{ paddingLeft: "5px" }}>{props.elememtConfig.arialabel}</Text>
          }
          {
            props.validations.errorM ? (
              <Space direction="vertical" size={1}>
                {props.validations.errorM.map((eel, index) => {
                  return (<Text type="danger" key={index}>{eel}</Text>);
                })}
              </Space>
            ) : null
          }

        </Space >
      );
      break;
    case "multiChipSelect":
      inputElement = (
        <Space direction="vertical" size={'small'} style={{ width: "100%" }}>
          <Text style={{ fontWeight: "600", fontSize: "14px", color: "#101828" }}>{props.elememtConfig.placeholder}
            {props.isRequired == true ? "   *" : null}</Text>
          <Select
            placeholder={props.elememtConfig.placeholder} 
            mode='multiple'
            style={{ width: "100%" }} 
            size="large" 
            disabled={props.disabled}
            onChange={props.onChangedInput} 
            options={props.elememtConfig.options}
            value={props.inputVariable} 
            allowClear={props.allowClear}
            filterOption={false}
            // onInputKeyDown={(e) => e.preventDefault()} // Prevents typing
            />
          {
            props.elememtConfig.arialabel == null ?
              (extraSpace) :
              <Text type="secondary" style={{ paddingLeft: "5px" }}>{props.elememtConfig.arialabel}</Text>
          }
          {
            props.validations.errorM ? (
              <Space direction="vertical" size={1}>
                {props.validations.errorM.map((eel, index) => {
                  return (<Text type="danger" key={index}>{eel}</Text>);
                })}
              </Space>
            ) : null
          }
        </Space >
      );
      break;
    case "numberInput":
      inputElement = (
        <Space direction="vertical" size={'small'} style={{ width: "100%" }}>
          <Text style={{ fontWeight: "600", fontSize: "14px", color: "#101828" }}>{props.elememtConfig.placeholder}
            {props.isRequired == true ? "   *" : null}</Text>
          <InputNumber size="large"
            placeholder={props.elememtConfig.placeholder}
            status={props.validations?.errorM?.length > 0 ? 'error' : null}
            htmlFor={props.inputVariable}
            value={props.inputVariable}
            onChange={props.onChangedInput}
            disabled={props.disabled}
            style={{ width: "100%" }}
            min={props.min !== undefined ? props.min : null}
          />
          {props.elememtConfig.arialabel == null ?
            (extraSpace) :
            <Text type="secondary" style={{ paddingLeft: "5px" }}>{props.elememtConfig.arialabel}</Text>
          }
          {props.validations.errorM ? (
            <Space direction="vertical" size={1}>
              {props.validations.errorM.map((eel, index) => {
                return (<Text type="danger" key={index}>{eel}</Text>);
              })}
            </Space>
          ) : null}

        </Space>
      );
      break;
    case "priceInput":
      inputElement = (
        <Space direction="vertical" size={'small'} style={{ width: "100%" }}>
          <Text style={{ fontWeight: "600", fontSize: "14px", color: "#101828" }}>{props.elememtConfig.placeholder}
            {props.isRequired == true ? "   *" : null}</Text>
          <InputNumber size="large" prefix="$"
            placeholder={props.elememtConfig.placeholder}
            status={props.validations?.errorM?.length > 0 ? 'error' : null}
            htmlFor={props.inputVariable}
            value={props.inputVariable}
            onChange={props.onChangedInput}
            min={0}
            disabled={props.disabled}
            style={{ width: "100%" }}
          />
          {props.elememtConfig.arialabel == null ?
            (extraSpace) :
            <Text type="secondary" style={{ paddingLeft: "5px" }}>{props.elememtConfig.arialabel}</Text>
          }
          {props.validations.errorM ? (
            <Space direction="vertical" size={1}>
              {props.validations.errorM.map((eel, index) => {
                return (<Text type="danger" key={index}>{eel}</Text>);
              })}
            </Space>
          ) : null}

        </Space>
      );
      break;
    case "datepicker":
      inputElement = (

        <Space direction="vertical" size={'small'} style={{ width: "100%" }}>
          <Text style={{ fontWeight: "600", fontSize: "14px", color: "#101828" }}>{props.elememtConfig.placeholder}
            {props.isRequired == true ? "   *" : null}</Text>
          <DatePicker
            onChange={props.onChangedInput} format={'DD/MM/YY'}
            disabled={props.disabled}
            value={props.inputVariable}
            minDate={props.mindate ? dayjs(ViewDateFormatter(props.mindate), 'DD/MM/YYYY') : ''}
            status={props.validations?.errorM?.length > 0 ? 'error' : null}
            style={{ width: "100%" }} size="large"
          />
          {props.elememtConfig.arialabel == null ?
            (extraSpace) :
            <Text type="secondary" style={{ paddingLeft: "5px" }}>{props.elememtConfig.arialabel}</Text>
          }
          {props.validations.errorM ? (
            <Space direction="vertical" size={1}>
              {props.validations.errorM.map((eel, index) => {
                return (<Text type="danger" key={index}>{eel}</Text>);
              })}
            </Space>
          ) : null}

        </Space>
      );
      break;
    case "timepicker":
      inputElement = (
        <Space
          direction="vertical"
          size={"small"}
          style={{ width: "100%" }}
        >
          <Text
            style={{ fontWeight: "600", fontSize: "14px", color: "#101828" }}
          >
            {props.elememtConfig.placeholder}
            {props.isRequired == true ? "   *" : null}
          </Text>
          <TimePicker
            style={{ width: "100%" }}
            size="large"
            onChange={props.onChangedInput}
            use12Hours
            format="h:mm A"
            disabled={props.disabled}
            value={props.inputVariable}
          />
          {props.elememtConfig.arialabel == null ?
            (extraSpace) :
            <Text type="secondary" style={{ paddingLeft: "5px" }}>{props.elememtConfig.arialabel}</Text>
          }
          {props.validations.errorM ? (
            <Space direction="vertical" size={1}>
              {props.validations.errorM.map((eel, index) => {
                return (
                  <Text type="danger" key={index}>
                    {eel}
                  </Text>
                );
              })}
            </Space>
          ) : null}
        </Space>
      );
      break;
    case "textarea":
      inputElement = (
        <Space
          direction="vertical"
          size={"small"}
          style={{ width: "100%" }}       >
          <Text
            style={{ fontWeight: "600", fontSize: "14px", color: "#101828" }}
          >
            {props.elememtConfig.placeholder}
            {props.isRequired == true ? "   *" : null}
          </Text>

          <TextArea
            rows={4}
            placeholder={props.elememtConfig.placeholder}
            status={props.validations?.errorM?.length > 0 ? "error" : null}
            htmlFor={props.inputVariable}
            value={props.inputVariable}
            onChange={props.onChangedInput}
            disabled={props.disabled}
          />
          {props.elememtConfig.arialabel == null ?
            (extraSpace) :
            <Text type="secondary" style={{ paddingLeft: "5px" }}>{props.elememtConfig.arialabel}</Text>
          }
          {props.validations.errorM ? (
            <Space direction="vertical" size={1}>
              {props.validations.errorM.map((eel, index) => {
                return (
                  <Text type="danger" key={index}>
                    {eel}
                  </Text>
                );
              })}
            </Space>
          ) : null}
        </Space>
      );
      break;
    case "autocomplete":
      inputElement = (
        <Space direction="vertical" size={"small"} style={{ width: "100%" }}>
          <Text
            style={{ fontWeight: "600", fontSize: "14px", color: "#101828" }}
          >
            {props.elememtConfig.placeholder}
            {props.isRequired == true ? "   *" : null}
          </Text>
          <Select
            style={{ width: "100%" }}
            size="large"
            showSearch
            value={props.inputVariable}
            suffixIcon={<SearchOutlined style={{ fontSize: "150%" }} />}
            filterOption={(input, option) =>
              option.label.toLowerCase().indexOf(input.toLowerCase()) !== -1
            }
            disabled={props.disabled}
            onChange={props.onChangedInput}
            notFoundContent={null}
            options={props.options}
          />

          {props.elememtConfig.arialabel ? (<Text type="secondary" style={{ paddingLeft: "5px" }}>
            {props.elememtConfig.arialabel}
          </Text>) : null}
          {props.validations.errorM ? (
            <Space direction="vertical" size={1}>
              {props.validations.errorM.map((eel, index) => {
                return (
                  <Text type="danger" key={index}>
                    {eel}
                  </Text>
                );
              })}
            </Space>
          ) : null}
        </Space>
      );
      break;
    case "switchInput":
      inputElement = (
        <Space direction="vertical" size={'small'} style={{ width: "100%" }}>
          <Text style={{ fontWeight: "600", fontSize: "14px", color: "#101828" }}>{props.elememtConfig.placeholder}
            {props.isRequired == true ? "   *" : null}</Text>

          <Switch defaultChecked onChange={props.onChangedInput} value={props.inputVariable} disabled={props.disabled} />
          {props.elememtConfig.arialabel == null ?
            (extraSpace) :
            <Text type="secondary" style={{ paddingLeft: "5px" }}>{props.elememtConfig.arialabel}</Text>
          }

          {
            props.validations.errorM ? (
              <Space direction="vertical" size={1}>
                {props.validations.errorM.map((eel, index) => {
                  return (<Text type="danger" key={index}>{eel}</Text>);
                })}
              </Space>
            ) : null
          }

        </Space >
      );
      break;
    case "tag":
      const [inputVisible, setInputVisible] = useState(false);
      const [inputValue, setInputValue] = useState('');
      const [editInputIndex, setEditInputIndex] = useState(-1);
      const [editInputValue, setEditInputValue] = useState('');
      const inputRef = useRef(null);
      const editInputRef = useRef(null);
      useEffect(() => {
        if (inputVisible) {
          inputRef.current?.focus();
        }
      }, [inputVisible]);
      useEffect(() => {
        editInputRef.current?.focus();
      }, [editInputValue]);
      const handleClose = (removedTag) => {
        const newTags = props.tags.filter((tag) => tag !== removedTag);

        props.setTags(newTags);
      };
      const showInput = () => {
        setInputVisible(true);
      };
      const handleInputChange = (e) => {
        setInputValue(e.target.value);
      };
      const handleInputConfirm = () => {
        if (inputValue && !props.tags.includes(inputValue)) {
          props.setTags([...props.tags, inputValue]);
        }
        setInputVisible(false);
        setInputValue('');
      };
      const handleEditInputChange = (e) => {
        setEditInputValue(e.target.value);
      };
      const handleEditInputConfirm = () => {
        const newTags = [...props.tags];
        newTags[editInputIndex] = editInputValue;
        props.setTags(newTags);
        setEditInputIndex(-1);
        setEditInputValue('');
      };

      inputElement = (
        <Space direction="vertical" size={'small'} style={{ width: "100%" }}>
          <Text
            style={{ fontWeight: "600", fontSize: "14px", color: "#101828" }}
          >
            {props.elememtConfig.placeholder}
            {props.isRequired == true ? "   *" : null}
          </Text>
          <Flex gap="4px 0" wrap style={{
            flexWrap: "wrap", justifyContent: "flex-start", marginBottom: "9px", border: ".5px solid #d9d9d9", borderRadius: "7px", padding: "10px",
            backgroundColor: `${props?.disabled == true ? "#f1f1f1" : "white"}`
          }}>

            {props?.disabled == true ?
              <Fragment>
                {props?.tags?.map((tag, index) => {
                  return (
                    <Tag key={index} closable={false} style={{ userSelect: 'none' }}>
                      <Text style={{ fontSize: "14px", }}>{tag}</Text>
                    </Tag>);
                })}
              </Fragment> :
              <Fragment>
                {props.tags.map((tag, index) => {
                  if (editInputIndex === index) {
                    return (
                      <Input
                        ref={editInputRef} key={tag} size="medium"
                        style={tagInputStyle} value={editInputValue} onChange={handleEditInputChange}
                        onBlur={handleEditInputConfirm} onPressEnter={handleEditInputConfirm} />
                    );
                  }
                  const isLongTag = tag.length > 20;
                  const tagElem = (
                    <Tag key={tag} closable={true} style={{ userSelect: 'none', }} onClose={() => handleClose(tag)}>
                      <Text
                        onDoubleClick={(e) => {
                          setEditInputIndex(index);
                          setEditInputValue(tag); e.preventDefault();
                        }} style={{ fontSize: "14px", }} >
                        {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                      </Text>
                    </Tag>
                  );
                  return isLongTag ? (
                    <Tooltip title={tag} key={tag}>
                      {tagElem}
                    </Tooltip>
                  ) : (
                    tagElem
                  );
                })}
                {inputVisible ? (
                  <Input ref={inputRef} type="text" size="small" style={tagInputStyle}
                    value={inputValue} onChange={handleInputChange} onBlur={handleInputConfirm} onPressEnter={handleInputConfirm} />
                ) : (
                  <Tag style={tagPlusStyle} icon={<PlusOutlined />} onClick={showInput}>
                    {props.elememtConfig.formShow}
                  </Tag>
                )}
              </Fragment>
            }
          </Flex>
        </Space>
      );
      break;
    case "checkBoxInput":

      inputElement = (
        <Space direction="vertical" size={'small'} style={{ width: "100%" }}>

          <Checkbox checked={checkd} disabled={props.disabled} onChange={() => {
            setCheckd((prevState => !prevState))
            let k = checkd;
            props.onChangedInput(!k)
          }}>
            <Text style={{ fontWeight: "600", fontSize: "14px", color: "#101828" }}>{props.elememtConfig.placeholder}
              {props.isRequired == true ? "   *" : null}</Text>
          </Checkbox>
          {
            props.validations.errorM ? (
              <Space direction="vertical" size={1}>
                {props.validations.errorM.map((eel, index) => {
                  return (<Text type="danger" key={index}>{eel}</Text>);
                })}
              </Space>
            ) : null
          }

        </Space >
      );
      break;
    default:
      inputElement = (
        <Input
          size="large"
          placeholder={props.elememtConfig.placeholder}
          status={props.validations?.errorM?.length > 0 ? "error" : null}
          htmlFor={props.inputVariable}
          value={props.inputVariable}
          onChange={props.onChangedInput}
        />
      );
  }
  return <React.Fragment>{inputElement}</React.Fragment>;
};

export default AllInput;