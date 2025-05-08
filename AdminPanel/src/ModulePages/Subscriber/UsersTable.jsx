import { orgMembersUrl } from "@Shared/APIUrls";
import { useAxiosInstance } from "@Shared/axiosInstance/useAxiosInstance";
import { useNotification } from "@UIElements/CNotification/useNotification";
import { Flex, Pagination, Table } from "antd";
import { Fragment, useEffect, useState } from "react";

const UsersTable = ({ org_id }) => {
    const { contextHolder, openNotificationWithIcon } = useNotification();
    const { axiosInstance } = useAxiosInstance();
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalNoOfRows, setTotalNoOfRows] = useState(5);
    const [orderBy, setOrderBy] = useState();
    const [order, setOrder] = useState();
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const orgMemStatusMapper = {
        ACTIVE: "Active",
        PENDING: "Pending",
        REJECTED: "Rejected",
        INVITED: "Invited",
    };

    const getOrgMemberList = (id) => {
        setIsLoading(true);
        axiosInstance({
            url: `${orgMembersUrl}/${id}`,
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
            getOrgMemberList(org_id);
        }
    }, [org_id, page, rowsPerPage, orderBy, order]);

    const columns = [
        {
            title: "User Name",
            dataIndex: "org_mem_username",
            key: "org_mem_username",
            align: "left",
            sorter: () => {},
        },
        {
            title: "Email",
            dataIndex: "org_mem_email",
            key: "org_mem_email",
            align: "left",
            sorter: () => {},
        },
        {
            title: "Status",
            dataIndex: "org_mem_status",
            key: "org_mem_status",
            align: "left",
            sorter: () => {},
            render: (text, record) => (
                <div onClick={() => onClickViewDiscount(record.payment_id)}>
                    {orgMemStatusMapper[record.org_mem_status]}
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
                rowKey={(record) => record.org_mem_id}
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
                    showTotal={(total, range) => `showing ${range[0]}-${range[1]} of ${totalNoOfRows} users`}
                />
            </Flex>
        </Fragment>
    );
};

export default UsersTable;
