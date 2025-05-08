import { SearchOutlined } from "@ant-design/icons";
import { useAxiosInstance } from "@Shared/axiosInstance/useAxiosInstance";
import { NavContext } from "@Shared/NavContexts/nav-contexts";
import { debounce } from "@Shared/Utils/utils";
import Buttons from "@UIElements/Buttons/Buttons";
import { useNotification } from "@UIElements/CNotification/useNotification";
import { Flex, Input, Layout } from "antd";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SubscriberTable from "./SubscriberTable";
import SubscriberFilterDrawer from "./SubscriberFilterDrawer";
import { subscriberUrl } from "@Shared/APIUrls";

const { Content } = Layout;

const Subscriber = () => {
    const navigate = useNavigate();
    const { setHeaderTitle } = useContext(NavContext);
    const { contextHolder, openNotificationWithIcon } = useNotification();
    const { axiosInstance } = useAxiosInstance();
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

    useEffect(() => {
        setHeaderTitle("Subscriber");
    }, []);

    const getSubscriberList = () => {
        setIsLoading(true);
        axiosInstance({
            url: subscriberUrl,
            method: "GET",
            params: {
                page: page,
                pageSize: rowsPerPage,
                org_name: searchText,
                order_by: orderBy,
                order: order,
                org_status:filterStatus,
                ...filterBy,
            },
        })
            .then((res) => {
                setData(res.data?.data);
                setTotalNoOfRows(res?.data?.metadata?.totalItems);
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
        getSubscriberList();
    }, [page, rowsPerPage, orderBy, order, reloadTableData, filterStatus, searchText, filterBy]);

    const onClickViewSubscriber = (sub_id) => {
        navigate("/create-subscriber/view/" + sub_id);
    };
    const reloadTheData = () => {
        setReloadTableData((prevState) => !prevState);
        setPage(1);
    };
    const debouncedSearch = debounce((value) => {
        setSearchText(value);
        setPage(1);
    }, 1000);

    const createSubscriber = () => {
        navigate("/create-subscriber/create/new");
    };
    return (
        <Layout>
            {contextHolder}
            <Content>
                <Flex>
                    <Flex gap={10} flex={1}>
                        <Input
                            placeholder="Search by Subscriber Name"
                            style={{ maxWidth: "314px" }}
                            prefix={<SearchOutlined />}
                            onChange={(e) => debouncedSearch(e.target.value)}
                            allowClear={true}
                        />
                        <SubscriberFilterDrawer setFilterBy={setFilterBy} setFilterStatus={setFilterStatus} />
                    </Flex>
                    <Buttons
                        btntyp="colored-btn"
                        btntext={"Create"}
                        w={160}
                        btnColor={"#8A7CFF"}
                        onClickFunc={createSubscriber}
                    />
                </Flex>
                <SubscriberTable
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
                    onClickViewSubscriber={onClickViewSubscriber}
                    reloadTheData={reloadTheData}
                />
            </Content>
        </Layout>
    );
};
export default Subscriber;
