//LaoyoutStyles
import styled from 'styled-components';
import { Card } from 'antd';


export const layoutStyle = {
    width: '100%',
};
export const contentStyle = {
    textAlign: 'left',
    height: "87vh",
    color: '#fff',
    backgroundColor: 'transparent',
    overflow: "scroll",
    padding: 20
};
export const siderStyle = {
    textAlign: 'center',
    height: "87vh",
    color: '#fff',
    backgroundColor: '#FFFFFF',
    overflow: "scroll",
    padding: "0px",
};



export const ImgUploaderBox = styled(Card)`
  background-color: #fafcfd;
  width: 100%;
  border: 1px solid #ccd6e7;
  border-radius: 6px;
  padding: 8px 16px;
  display: flex;
  gap: 24px;

  .ant-card-body {
    padding: 0; /* Remove default padding if needed */
  }
`;
