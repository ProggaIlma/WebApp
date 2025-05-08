import { DeleteOutlined, EditOutlined, ExclamationCircleFilled, EyeOutlined, InboxOutlined, MoreOutlined } from "@ant-design/icons";
import { ViewDateFormatter } from "@Shared/Utils/utils";
import { subscriberUrl } from "@Shared/APIUrls";
import { useNotification } from "@UIElements/CNotification/useNotification";
import { Dropdown, Flex, Modal, Pagination, Radio, Table } from "antd";
import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
const { confirm } = Modal;

const SubscriberTable = ({
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
    onClickViewSubscriber,
    reloadTheData,
}) => {
    const { contextHolder, openNotificationWithIcon } = useNotification();
    const navigate = useNavigate();
    const status = [
        { label: "All", value: undefined },
        { label: "Archived", value: "REJECTED" },
    ];

    const orgStatusMapper = {
        ACTIVE: "Active",
        PENDING: "Pending",
        REJECTED: "Rejected",
        INACTIVE: "Inactive",
        CANCELED: "Canceled",
        INVITED: "Invited",
    };

    const columns = [
        {
            title: "Subscriber ID",
            dataIndex: "org_id",
            key: "org_id",
            align: "left",
            width: 180,
            sorter: () => {},
            render: (text, record) => (
                <div onClick={() => onClickViewSubscriber(record.org_id)} className="fillwh">
                    {record.org_id}
                </div>
            ),
        },
        {
            title: "Subscriber Name",
            dataIndex: "org_name",
            key: "org_name",
            align: "left",
            width: 220,
            sorter: () => {},
            render: (text, record) => (
                <div onClick={() => onClickViewSubscriber(record.org_id)} className="fillwh">
                    {record.org_name}
                </div>
            ),
        },
        {
            title: "Total Active Users",
            dataIndex: "total_active_users",
            key: "total_active_users",
            align: "left",
            width: 170,
            sorter: () => {},
            render: (text, record) => (
                <div onClick={() => onClickViewSubscriber(record.org_id)} className="fillwh">
                    {record.total_active_users}
                </div>
            ),
        },
        {
            title: "Outstanding Payment",
            dataIndex: "org_sub_wallet_amount",
            key: "org_sub_wallet_amount",
            align: "left",
            width: 200,
            sorter: () => {},
            render: (text, record) => (
                <div onClick={() => onClickViewSubscriber(record.org_id)} className="fillwh">
                    {record.OrgSub.org_sub_wallet_amount}
                </div>
            ),
        },
        {
            title: "Subscription Plan",
            dataIndex: "subs_plan_name",
            key: "subs_plan_name",
            align: "left",
            width: 180,
            sorter: () => {},
            render: (text, record) => (
                <div onClick={() => onClickViewSubscriber(record.org_id)} className="fillwh">
                    {record?.subs_plan_name}
                </div>
            ),
        },
        {
            title: "Subscription Expiry Date",
            dataIndex: "org_sub_activation_end_date",
            key: "org_sub_activation_end_date",
            align: "left",
            width: 220,
            sorter: () => {},
            render: (text, record) => (
                <div onClick={() => onClickViewSubscriber(record.org_id)} className="fillwh">
                    {record?.org_sub_activation_end_date ? ViewDateFormatter(record.org_sub_activation_end_date) : null}
                </div>
            ),
        },
        {
            title: "WhatsApp Wallet Balance",
            dataIndex: "org_sub_whatsapp_wallet_amount",
            key: "org_sub_whatsapp_wallet_amount",
            align: "left",
            width: 220,
            sorter: () => {},
            render: (text, record) => (
                <div onClick={() => onClickViewSubscriber(record.org_id)} className="fillwh">
                    {record.OrgSub.org_sub_whatsapp_wallet_amount}
                </div>
            ),
        },
        {
            title: "AI Wallet Balance",
            dataIndex: "org_sub_ai_wallet_amount",
            key: "org_sub_ai_wallet_amount",
            align: "left",
            width: 180,
            sorter: () => {},
            render: (text, record) => (
                <div onClick={() => onClickViewSubscriber(record.org_id)} className="fillwh">
                    {record.OrgSub.org_sub_ai_wallet_amount}
                </div>
            ),
        },
        {
            title: "Status",
            dataIndex: "org_status",
            key: "org_status",
            align: "left",
            width: 150,
            sorter: () => {},
            render: (text, record) => (
                <div onClick={() => onClickViewSubscriber(record.org_id)} className="fillwh">
                    {orgStatusMapper[record.org_status]}
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
        console.log("row", row)
        const items = [
            {
                key: "1",
                label: "View",
                onClick: () => {
                    onClickViewSubscriber(row.org_id);
                },
                icon: <EyeOutlined />,
            },
            {
                key: "2",
                label: "Edit",
                onClick: () => navigate("/create-subscriber/edit/" + row.org_id),
                icon: <EditOutlined />,
            },
            {
                key: "3",
                label: "Archive",
                onClick: () => {
                    archiveSubscriber(row.org_id);
                },
                icon: <InboxOutlined />,
            },
        ];

        return (
            <Dropdown menu={{ items }} placement="bottomLeft">
                <MoreOutlined />
            </Dropdown>
        );
    };

    const archiveSubscriber = (org_id) => {
        confirm({
            title: "Do you want to archive this subscriber?",
            icon: <ExclamationCircleFilled />,
            okText: "Yes",
            okType: "primary",
            cancelText: "No",
            mask: false,
            centered: true,
            onOk() {
                // TODO: Implement the ARCHIVE functionality

                // axiosInstance({
                //     url: `${subscriberUrl}/${org_id}`,
                //     method: "Patch",
                //     data: { org_status: "REJECTED" },
                // })
                //     .then((res) => {
                //         console.log(res);
                //         openNotificationWithIcon("success", null, "Successfully deleted subscriber!", 4);
                //         reloadTheData();
                //     })
                //     .catch((error) => {
                //         openNotificationWithIcon(
                //             "error",
                //             null,
                //             error?.response?.data?.errors[0] || "Something went wrong in server",
                //             6
                //         );
                //     });
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
                    rowKey={(record) => record.org_id}
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
                        showTotal={(total, range) => `showing ${range[0]}-${range[1]} of ${totalNoOfRows} subscribers`}
                    />
                </Flex>
            </Flex>
        </Fragment>
    );
};

export default SubscriberTable;
