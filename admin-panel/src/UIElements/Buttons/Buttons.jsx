import React, { Fragment } from 'react';
import { Button, ConfigProvider } from 'antd';
import "./Button.css";
const Buttons = ({ btntyp, btntext, w, onClickFunc, btnColor, disabled }) => {
    let btnElement = null;
    switch (btntyp) {
        case "colored-btn":
            btnElement =
                (
                    <ConfigProvider
                        wave={{ disabled: true }}
                        theme={{
                            token: {
                                colorPrimary: `${btnColor}`,
                                borderRadius: 6,
                                colorBgContainer: 'transparent',
                                colorPrimaryHover: `${btnColor}`,
                            },
                        }}
                    >
                        <Button block type="primary" style={{ width: w }} onClick={() => { onClickFunc() }} disabled={disabled}>
                            {btntext}
                        </Button>
                    </ConfigProvider>
                );
            break;
        case "cancel-btn":
            btnElement =
                (<ConfigProvider
                    wave={{ disabled: true }}
                    theme={{
                        token: {
                            defaultBg: "#FFFFFF", defaultBorderColor: "#99A3A4", defaultColor: "#000000E0",
                            defaultHoverBorderColor: "#000000E0", defaultHoverColor: "#000000E0",
                            borderRadius: 6,
                        },
                    }}
                >
                    <Button block style={{ width: w, height: 32 }} onClick={() => { onClickFunc() }} disabled={disabled}>
                        {btntext}
                    </Button>
                </ConfigProvider>);
            break;
        default:
            btnElement =
                (<Button type="primary" style={{ width: w, height: 32 }} onClick={() => { onClickFunc() }} disabled={disabled}>
                    {btntext}
                </Button>);
    }
    return (
        <Fragment>
            {btnElement}
        </Fragment>
    );
}

export default Buttons;