import React from 'react';
import { Modal, ConfigProvider } from 'antd';
const DModal = (props) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Modal: {
            padding: 0
          },
        },
      }}
    >
      <Modal
        title={null}
        destroyOnClose = {true}
        centered
        open={props.dModalOpen}
        onOk={() => props.setDModalOpen(false)}
        onCancel={() => props.setDModalOpen(false)}
        footer={null} closable={false}
        width={props.width}
        modalRender={(modal) => {
          return React.cloneElement(modal, {
            style: { ...modal.props.style, ...{ padding: 0 } },
          });
        }}
      >
        {props.children}
      </Modal>
    </ConfigProvider>);
}

export default DModal;