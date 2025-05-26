import React from 'react';
import { Flex, Spin } from 'antd';
const HomePageLoader = () => (
  <Flex gap="small" vertical style={{ height: "100%", width: "100%" }}>
    <Spin tip="Loading..." style={{ marginTop: "30%" }} size="large">
    </Spin>
  </Flex>
);
export default HomePageLoader;