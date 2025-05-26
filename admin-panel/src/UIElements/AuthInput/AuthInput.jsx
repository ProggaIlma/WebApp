import React from 'react';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Input, Space, Typography } from 'antd';
const { Text, } = Typography;
const AuthInput = (props) => {
    let inputElement = null;
    switch (props.elementType) {
        case "textInput":
            inputElement = (
                <Space direction="vertical" style={{ width: "80%" }}>
                    <Input variant="outlined" size="large"
                        placeholder={props.elememtConfig.placeholder}
                        status={props.validations?.errorM?.length > 0 ? 'error' : null}
                        htmlFor={props.inputVariable}
                        value={props.inputVariable}
                        onChange={props.onChangedInput}
                    />
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
                <Space direction="vertical" style={{ width: "80%" }}>
                    <Input.Password variant="outlined" size="large"
                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        placeholder={props.elememtConfig.placeholder}
                        status={props.validations?.errorM?.length > 0 ? 'error' : null}
                        htmlFor={props.inputVariable}
                        value={props.inputVariable}
                        onChange={props.onChangedInput}
                    />
                    {props.validations.errorM ? (
                        <Space direction="vertical" size={1}>
                            {props.validations.errorM.map((eel, index) => {
                                return (<Text type="danger" key={index}>{eel}</Text>);
                            })}
                        </Space>
                    ) : null}

                </Space>);
            break;
        default:
            inputElement = (
                <Input variant="outlined" size="large"
                    placeholder={props.elememtConfig.placeholder}
                    status={props.validations?.errorM?.length > 0 ? 'error' : null}
                    htmlFor={props.inputVariable}
                    value={props.inputVariable}
                    onChange={props.onChangedInput}
                />
            );

    }
    return (<React.Fragment>{inputElement}</React.Fragment>);
}

export default AuthInput;