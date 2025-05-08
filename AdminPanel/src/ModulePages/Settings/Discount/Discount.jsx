import { NavContext } from "@Shared/NavContexts/nav-contexts";
import { useNotification } from "@UIElements/CNotification/useNotification";
import { FilterOutlined, SearchOutlined } from "@ant-design/icons";
import { debounce } from "@Shared/Utils/utils";
import { Dropdown, Flex, Input, Layout } from "antd";
import React, { useContext, useEffect, useState } from "react";
import Buttons from "@UIElements/Buttons/Buttons";
import DiscountTable from "./DiscountTable";
import { useNavigate } from "react-router-dom";
import { useAxiosInstance } from "@Shared/axiosInstance/useAxiosInstance";
import { discountURL } from "@Shared/APIUrls";
import DiscountFilterDrawer from "./DiscountFilterDrawer";

const { Content } = Layout;

const Discount = () => {
    const { setHeaderTitle } = useContext(NavContext);
    const { contextHolder, openNotificationWithIcon } = useNotification();
    const [searchText, setSearchText] = useState(null);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalNoOfRows, setTotalNoOfRows] = useState(5);
    const [orderBy, setOrderBy] = useState("updatedAt");
    const [order, setOrder] = useState("DESC");
    const [filterBy, setFilterBy] = useState(null);
    const [filterStatus, setFilterStatus] = useState(undefined);
    const [reloadTableData, setReloadTableData] = useState(false);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const { axiosInstance } = useAxiosInstance();
    const navigate = useNavigate();

    useEffect(() => {
        setHeaderTitle("Settings");
    }, []);

    const getDiscountList = () => {
        setIsLoading(true);
        axiosInstance({
            url: discountURL,
            method: "GET",
            params: {
                page: page,
                pageSize: rowsPerPage,
                search_text: searchText,
                order_by: orderBy,
                order: order,
                disc_date_type: filterStatus,
                ...filterBy,
            },
        })
            .then((res) => {
                setData(res.data?.data.data);
                setTotalNoOfRows(res?.data?.data?.metadata?.totalItems);
                setIsLoading(false);
            })
            .catch((error) => {
                openNotificationWithIcon(
                    "error",
                    null,
                    error?.response?.data?.errors?.[0] || "Something went wrong in server"
                );
                setIsLoading(false);
            });
    };

    useEffect(() => {
        getDiscountList();
    }, [page, rowsPerPage, orderBy, order, reloadTableData, filterStatus, searchText, filterBy]);

    const onClickViewDiscount = (discount_id) => {
        navigate("/create-discount/view/" + discount_id);
    };
    const reloadTheData = () => {
        setReloadTableData((prevState) => !prevState);
        setPage(1);
    };
    const debouncedSearch = debounce((value) => {
        setSearchText(value);
        setPage(1);
    }, 1000);

    const createDiscount = () => {
        navigate("/create-discount/create/new");
    };

    return (
        <Layout>
            {contextHolder}
            <Content>
                <Flex>
                    <Flex gap={10} flex={1}>
                        <Input
                            placeholder="Search by Discount Name / Promo Code"
                            style={{ maxWidth: "314px" }}
                            prefix={<SearchOutlined />}
                            onChange={(e) => debouncedSearch(e.target.value)}
                            allowClear={true}
                        />
                        <DiscountFilterDrawer setFilterBy={setFilterBy} />
                    </Flex>
                    <Buttons
                        btntyp="colored-btn"
                        btntext={"Create"}
                        w={160}
                        btnColor={"#8A7CFF"}
                        onClickFunc={createDiscount}
                    />
                </Flex>
                <DiscountTable
                    data={data}
                    isLoading={isLoading}
                    totalNoOfRows={totalNoOfRows}
                    rowsPerPage={rowsPerPage}
                    setRowsPerPage={setRowsPerPage}
                    page={page}
                    setPage={setPage}
                    setOrder={setOrder}
                    setOrderBy={setOrderBy}
                    filterStatus={filterStatus}
                    setFilterStatus={setFilterStatus}
                    onClickViewDiscount={onClickViewDiscount}
                    reloadTheData={reloadTheData}
                />
            </Content>
        </Layout>
    );
};

export default Discount;
