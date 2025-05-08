import { DeleteOutlined, EditOutlined, ExclamationCircleFilled, EyeOutlined, MoreOutlined } from "@ant-design/icons";
import { ViewDateFormatter } from "@Shared/Utils/utils";
import { discountURL } from "@Shared/APIUrls";
import { Dropdown, Flex, Modal, Pagination, Radio, Table } from "antd";
import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { useAxiosInstance } from "@Shared/axiosInstance/useAxiosInstance";
import { useNotification } from "@UIElements/CNotification/useNotification";

const { confirm } = Modal;

const DiscountTable = ({
    data,
    isLoading,
    totalNoOfRows,
    rowsPerPage,
    setRowsPerPage,
    page,
    setPage,
    setOrder,
    setOrderBy,
    filterStatus,
    setFilterStatus,
    onClickViewDiscount,
    reloadTheData,
}) => {
    const navigate = useNavigate();
    const { axiosInstance } = useAxiosInstance();
    const { contextHolder, openNotificationWithIcon } = useNotification();
    const status = [
        { label: "All", value: undefined },
        { label: "Active", value: "ACTIVE" },
        { label: "Scheduled", value: "SCHEDULED" },
        { label: "Expired", value: "EXPIRED" },
    ];

    const columns = [
        {
            title: "Discount Name",
            dataIndex: "disc_name",
            key: "disc_name",
            align: "left",
            width: 220,
            sorter: () => {},
            render: (text, record) => (
                <div onClick={() => onClickViewDiscount(record.disc_id)} className="fillwh">
                    {record.disc_name}
                </div>
            ),
        },
        {
            title: "Promo Code",
            dataIndex: "disc_code",
            key: "disc_code",
            align: "left",
            width: 150,
            sorter: () => {},
            render: (text, record) => (
                <div onClick={() => onClickViewDiscount(record.disc_id)} className="fillwh">
                    {record.disc_code}
                </div>
            ),
        },
        {
            title: "Discount Type",
            dataIndex: "disc_type",
            key: "disc_type",
            align: "left",
            width: 150,
            sorter: () => {},
            render: (text, record) => (
                <div onClick={() => onClickViewDiscount(record.disc_id)} className="fillwh">
                    {record.disc_type}
                </div>
            ),
        },
        {
            title: "Discount Value",
            dataIndex: "disc_value",
            key: "disc_value",
            align: "left",
            width: 150,
            sorter: () => {},
            render: (text, record) => (
                <div onClick={() => onClickViewDiscount(record.disc_id)} className="fillwh">
                    {record.disc_value}
                </div>
            ),
        },
        {
            title: "Applies To",
            dataIndex: "disc_applies_to",
            key: "disc_applies_to",
            align: "left",
            width: 150,
            sorter: () => {},
            render: (text, record) => (
                <div onClick={() => onClickViewDiscount(record.disc_id)} className="fillwh">
                    {record.disc_applies_to.charAt(0).toUpperCase() + record.disc_applies_to.slice(1).toLowerCase()}
                </div>
            ),
        },
        {
            title: "Start Date",
            dataIndex: "disc_start_date",
            key: "disc_start_date",
            align: "left",
            width: 180,
            sorter: () => {},
            render: (text, record) => (
                <div onClick={() => onClickViewDiscount(record.disc_id)} className="fillwh">
                    {record?.disc_start_date ? ViewDateFormatter(record.disc_start_date) : null}
                </div>
            ),
        },
        {
            title: "End Date",
            dataIndex: "disc_end_date",
            key: "disc_end_date",
            align: "left",
            width: 180,
            sorter: () => {},
            render: (text, record) => (
                <div onClick={() => onClickViewDiscount(record.disc_id)} className="fillwh">
                    {record?.disc_end_date ? ViewDateFormatter(record.disc_end_date) : null}
                </div>
            ),
        },
        {
            title: "Usage",
            dataIndex: "disc_usage_limit",
            key: "disc_usage_limit",
            align: "left",
            width: 130,
            sorter: () => {},
            render: (text, record) => (
                <div onClick={() => onClickViewDiscount(record.disc_id)} className="fillwh">
                    {record.disc_usage_limit}
                </div>
            ),
        },
        {
            title: "",
            dataIndex: "",
            key: "actions",
            align: "center",
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
                    onClickViewDiscount(row.disc_id);
                },
                icon: <EyeOutlined />,
            },
            {
                key: "2",
                label: "Edit",
                onClick: () => navigate("/create-discount/edit/" + row.disc_id),
                icon: <EditOutlined />,
            },
            {
                key: "3",
                label: "Delete",
                onClick: () => {
                    deleteDiscountHandler(row.disc_id);
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

    const deleteDiscountHandler = (disc_id) => {
        confirm({
            title: "Do you want to delete this Discount?",
            icon: <ExclamationCircleFilled />,
            okText: "Yes",
            okType: "primary",
            cancelText: "No",
            mask: false,
            centered: true,
            onOk() {
                axiosInstance({
                    url: `${discountURL}/${disc_id}`,
                    method: "DELETE",
                })
                    .then((res) => {
                        console.log(res);
                        openNotificationWithIcon("success", null, "Successfully deleted discount!", 4);
                        reloadTheData();
                    })
                    .catch((error) => {
                        openNotificationWithIcon(
                            "error",
                            null,
                            error?.response?.data?.errors[0] || "Something went wrong in server",
                            6
                        );
                    });
            },
            onCancel() {
                // Do nothing
            },
            style: { margin: "auto" },
        });
    };
    const onChange = (pagination, filters, sorter, extra) => {
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
        <Fragment>
            {contextHolder}
            <div
                style={{
                    marginTop: "16px",
                    backgroundColor: "#fff",
                    borderRadius: "6px 6px 0px 0px",
                }}
            >
                <Radio.Group
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    style={{ height: "40px" }}
                >
                    {status.map((el, index) => {
                        return (
                            <Radio.Button
                                className={
                                    filterStatus === el.value || undefined
                                        ? "selected_filter_btn"
                                        : "not_selected_filter_btn"
                                }
                                key={index}
                                value={el.value}
                            >
                                {el.label}
                            </Radio.Button>
                        );
                    })}
                </Radio.Group>
            </div>
            <Flex vertical={true}>
                <Table
                    virtual
                    dataSource={data}
                    columns={columns}
                    onChange={onChange}
                    rowKey={(record) => record.disc_id}
                    style={{ width: "100%", margin: "auto" }}
                    pagination={false}
                    loading={isLoading}
                    scroll={{
                        y: 590,
                    }}
                />
                <Flex style={{ marginBottom: "50px" }} justify="flex-end">
                    <Pagination
                        showSizeChanger
                        onShowSizeChange={onShowSizeChange}
                        current={page}
                        onChange={(pageNum) => pageNum !== page && setPage(pageNum)}
                        total={totalNoOfRows}
                        style={{ marginTop: "15px" }}
                        pageSize={rowsPerPage}
                        pageSizeOptions={[10, 25, 50, 100]}
                        showTotal={(total, range) => `showing ${range[0]}-${range[1]} of ${totalNoOfRows} discounts`}
                    />
                </Flex>
            </Flex>
        </Fragment>
    );
};

export default DiscountTable;
