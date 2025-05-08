import { useAxiosInstance } from "@Shared/axiosInstance/useAxiosInstance";
import { orgPaymentsUrl } from "@Shared/APIUrls";
import { useNotification } from "@UIElements/CNotification/useNotification";
import { Flex, Pagination, Table } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import { ViewDateFormatter } from "@Shared/Utils/utils";

const PaymentsTable = ({ org_id }) => {
    const { contextHolder, openNotificationWithIcon } = useNotification();
    const { axiosInstance } = useAxiosInstance();
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalNoOfRows, setTotalNoOfRows] = useState(5);
    const [orderBy, setOrderBy] = useState();
    const [order, setOrder] = useState();
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getPaymentList = (id) => {
        setIsLoading(true);
        axiosInstance({
            url: `${orgPaymentsUrl}/${id}`,
            method: "GET",
            params: {
                page: page,
                pageSize: rowsPerPage,
                order_by: orderBy,
                order: order,
            },
        })
            .then((res) => {
                setData(res.data?.data?.data);
                setTotalNoOfRows(res?.data?.data?.metadata?.totalItems);
                setIsLoading(false);
            })
            .catch((error) => {
                openNotificationWithIcon(
                    "error",
                    null,
                    error.response?.data?.message || "Something went wrong in server"
                );
                setIsLoading(false);
            });
    };

    useEffect(() => {
        if (org_id) {
            getPaymentList(org_id);
        }
    }, [org_id, page, rowsPerPage, orderBy, order]);

    const paymentStatusMapper = {
        PAID: "Paid",
        FAILED: "Failed",
        CANCELLED: "Cancelled",
        UNPAID: "Unpaid",
        DUE: "Due",
        REQUESTED: "Requested",
    };

    const columns = [
        {
            title: "Invoice ID",
            dataIndex: "inv_uid",
            key: "inv_uid",
            align: "left",
            sorter: () => {},
        },
        {
            title: "Payment Date Time",
            dataIndex: "inv_payment_date",
            key: "inv_payment_date",
            align: "left",
            sorter: () => {},
            render: (text, record) => (
                <div onClick={() => onClickViewDiscount(record.payment_id)}>
                    {record?.inv_payment_date ? ViewDateFormatter(record.inv_payment_date) : null}
                </div>
            ),
        },
        {
            title: "Payment Amount",
            dataIndex: "amount_to_be_paid",
            key: "amount_to_be_paid",
            align: "left",
            sorter: () => {},
        },
        {
            title: "Status",
            dataIndex: "inv_status",
            key: "inv_status",
            align: "left",
            sorter: () => {},
            render: (text, record) => (
                <div onClick={() => onClickViewDiscount(record.payment_id)}>
                    {paymentStatusMapper[record.inv_status]}
                </div>
            ),
        },
    ];
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
            <Table
                virtual
                dataSource={data}
                columns={columns}
                onChange={onChange}
                rowKey={(record) => record.inv_uid}
                style={{ width: "100%", margin: "auto" }}
                pagination={false}
                loading={isLoading}
                scroll={{ y: 500 }}
            />
            <Flex style={{ marginBottom: "50px", width: "100%" }} justify="flex-end">
                <Pagination
                    showSizeChanger
                    onShowSizeChange={onShowSizeChange}
                    current={page}
                    onChange={(pageNum) => pageNum !== page && setPage(pageNum)}
                    total={totalNoOfRows}
                    style={{ marginTop: "15px" }}
                    pageSize={rowsPerPage}
                    pageSizeOptions={[10, 25, 50, 100]}
                    showTotal={(total, range) => `showing ${range[0]}-${range[1]} of ${totalNoOfRows} payments`}
                />
            </Flex>
        </Fragment>
    );
};

export default PaymentsTable;
