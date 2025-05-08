/* eslint-disable react/prop-types */
import { topUpAPI } from "@Shared/APIUrls";
import { useAxiosInstance } from "@Shared/axiosInstance/useAxiosInstance";
import { useNotification } from "@UIElements/CNotification/useNotification";
import { DeleteOutlined, EditOutlined, ExclamationCircleFilled, EyeOutlined, MoreOutlined } from "@ant-design/icons";
import { Dropdown, Flex, Modal, Pagination, Radio, Row, Table } from "antd";
import React from "react";

const { confirm } = Modal;

const WaTopUpTable = ({
  data,
  isLoading,
  totalNoOfRows,
  rowsPerPage,
  setRowsPerPage,
  page,
  setPage,
  setOrderBy,
  setOrder,
  onClickViewTopUp,
  onClickEditTopUp,
  filterStatus,
  setFilterStatus,
  reloadTheData,
}) => {
  const { axiosInstance } = useAxiosInstance();
  const { contextHolder, openNotificationWithIcon } = useNotification();

  const status = [
    { label: "All", value: undefined },
    { label: "Active", value: "ACTIVE" },
    { label: "Inactive", value: "INACTIVE" },
  ];

  const columns = [
    {
      title: "Price",
      dataIndex: "topup_price",
      key: "topup_price",
      align: "left",
      width: 180,
      sorter: () => {},
      render: (text, record) => (
        <div onClick={() => onClickViewTopUp(record.topup_id)} className="fillwh">
          {record.topup_price.toFixed(2)}
        </div>
      ),
    },
    {
      title: "Short Description",
      dataIndex: "topup_sdesc",
      key: "topup_sdesc",
      align: "left",
      width: 180,
      sorter: () => {},
      render: (text, record) => (
        <div onClick={() => onClickViewTopUp(record.topup_id)} className="fillwh">
          {record?.topup_sdesc}
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "topup_status",
      key: "topup_status",
      align: "left",
      width: 200,
      sorter: () => {},
      render: (text, record) => (
        <div onClick={() => onClickViewTopUp(record.topup_id)} className="fillwh">
          {record.topup_status}
        </div>
      ),
    },
    {
      title: "",
      dataIndex: "",
      key: "actions",
      align: "left",
      width: 100,
      render: (_, row) => <React.Fragment>{createDropdownItems(row)}</React.Fragment>,
    },
  ];

  const createDropdownItems = (row) => {
    const items = [
      {
        key: "1",
        label: "View",
        onClick: () => {
          onClickViewTopUp(row.topup_id);
        },
        icon: <EyeOutlined />,
      },
      {
        key: "2",
        label: "Edit",
        onClick: () => {
          onClickEditTopUp(row.topup_id);
        },
        icon: <EditOutlined />,
      },
      {
        key: "3",
        label: "Delete",
        onClick: () => {
          deleteTopUpFunc(row.topup_id);
        },
        icon: <DeleteOutlined />,
      },
    ];

    return (
      <Dropdown menu={{ items }} placement="bottomLeft">
        <MoreOutlined />
      </Dropdown>
    );
  };

  const deleteTopUpFunc = (topup_id) => {
    confirm({
      title: "Do you want to delete this top up?",
      icon: <ExclamationCircleFilled />,
      okText: "Yes",
      okType: "primary",
      cancelText: "No",
      mask: false,
      centered: true,
      onOk() {
        axiosInstance({
          url: topUpAPI + "/" + topup_id,
          method: "DELETE",
          data: { topup_id: topup_id },
        })
          .then(() => {
            openNotificationWithIcon("success", null, "Successfully deleted data!", 4);
            setTimeout(() => {
              reloadTheData();
            }, 1000);
          })
          .catch((error) => {
            openNotificationWithIcon(
              "error",
              null,
              error?.response?.data?.errors[0] !== undefined
                ? error.response.data?.errors[0]
                : "Something went wrong in server",
              6
            );
          });
      },
      onCancel() {
        /* empty */
      },
      style: { margin: "auto" },
    });
  };

  const onChange = (pagination, filters, sorter) => {
    if (sorter.order !== undefined && sorter.field !== undefined) {
      setOrder(sorter.order == "ascend" ? "ASC" : "DESC");
      const orderByValue = Array.isArray(sorter.field) ? sorter.field[sorter?.field?.length - 1] : sorter.field;
      setOrderBy(orderByValue);
      setPage(1);
    }
  };
  const onShowSizeChange = (current, pageSize) => {
    setRowsPerPage(pageSize);
    setPage(1);
  };

  return (
    <React.Fragment>
      {contextHolder}
      <Row
        style={{
          backgroundColor: "#ffffff",
          width: "100%",
          margin: "auto",
          height: "40px",
          marginTop: "20px",
          borderRadius: "6px 6px 0px 0px",
        }}
        key={213}
      >
        <Radio.Group value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} style={{ height: "40px" }}>
          {status.map((el, index) => {
            return (
              <Radio.Button
                className={filterStatus === el.value || undefined ? "selected_filter_btn" : "not_selected_filter_btn"}
                key={index}
                value={el.value}
              >
                {el.label}
              </Radio.Button>
            );
          })}
        </Radio.Group>
      </Row>
      <Flex style={{ width: "100%" }} vertical={true} justify="flex-end" align="center">
        <Table
          virtual
          rowKey={(col) => col.topup_id}
          columns={columns}
          dataSource={data}
          onChange={onChange}
          style={{ width: "100%", margin: "auto" }}
          pagination={false}
          loading={isLoading}
          scroll={{
            y: 590,
          }}
        />
        <Flex style={{ width: "100%", marginBottom: "50px" }} justify="flex-end">
          <Pagination
            showSizeChanger
            onShowSizeChange={onShowSizeChange}
            current={page}
            onChange={(pageNum) => pageNum !== page && setPage(pageNum)}
            total={totalNoOfRows}
            style={{ marginTop: "15px" }}
            pageSize={rowsPerPage}
            pageSizeOptions={[10, 25, 50, 100]}
            showTotal={(total, range) => `showing ${range[0]}-${range[1]} of ${totalNoOfRows} wa top ups`}
          />
        </Flex>
      </Flex>
    </React.Fragment>
  );
};

export default WaTopUpTable;
