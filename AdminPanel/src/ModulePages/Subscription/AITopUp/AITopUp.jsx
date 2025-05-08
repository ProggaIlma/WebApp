import { topUpAPI } from "@Shared/APIUrls";
import { useAxiosInstance } from "@Shared/axiosInstance/useAxiosInstance";
import { NavContext } from "@Shared/NavContexts/nav-contexts";
import Buttons from "@UIElements/Buttons/Buttons";
import { useNotification } from "@UIElements/CNotification/useNotification";
import { Flex, Layout, Row, theme } from "antd";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AITopUpTable from "./AITopUpTable";

const { Content } = Layout;

const AITopUp = () => {
  const { setHeaderTitle } = useContext(NavContext);
  const { contextHolder, openNotificationWithIcon } = useNotification();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalNoOfRows, setTotalNoOfRows] = useState(5);
  const [orderBy, setOrderBy] = useState("updatedAt");
  const [order, setOrder] = useState("DESC");
  const [filterStatus, setFilterStatus] = useState(undefined);
  const [reloadTableData, setReloadTableData] = useState(false);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { axiosInstance } = useAxiosInstance();
  const navigate = useNavigate();

  const {
    token: { borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    setHeaderTitle("Subscription");
  }, []);

  useEffect(() => {
    getList();
  }, [page, rowsPerPage, orderBy, order, reloadTableData, filterStatus]);

  const getList = () => {
    setIsLoading(true);
    axiosInstance({
      url: topUpAPI,
      method: "GET",
      params: {
        page: page,
        pageSize: rowsPerPage,
        order_by: orderBy,
        order: order,
        filter: filterStatus,
        topup_type: "AI",
      },
    })
      .then((res) => {
        setData(res?.data?.data?.data);
        setTotalNoOfRows(res?.data?.data?.metadata?.totalItems);
        setIsLoading(false);
      })
      .catch((error) => {
        openNotificationWithIcon("error", null, error?.response?.data?.errors?.[0] || "Something went wrong in server");
        setIsLoading(false);
      });
  };

  const createTopUp = () => {
    navigate("/create-top-up/create/null", { state: { topup_type: "AI" } });
  };

  const onClickViewTopUp = (topup_id) => {
    navigate("/create-top-up/view/" + topup_id, { state: { topup_type: "AI" } });
  };

  const onClickEditTopUp = (topup_id) => {
    navigate("/create-top-up/edit/" + topup_id, { state: { topup_type: "AI" } });
  };

  const reloadTheData = () => {
    setReloadTableData((prevState) => !prevState);
    setPage(1);
  };

  return (
    <Layout>
      {contextHolder}
      <Content style={{ padding: 10, height: "88vh", borderRadius: borderRadiusLG }}>
        <Flex
          style={{
            height: "50px",
            width: "100%",
            paddingRight: "10px",
          }}
          justify="end"
          align="center"
        >
          <Buttons
            btntyp="colored-btn"
            btntext="Create"
            w={160}
            btnColor="#8A7CFF"
            onClickFunc={createTopUp}
            key={152}
          />
        </Flex>
        <Row style={{ paddingTop: "30px" }}>
          <AITopUpTable
            data={data}
            isLoading={isLoading}
            totalNoOfRows={totalNoOfRows}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            page={page}
            setPage={setPage}
            setOrderBy={setOrderBy}
            setOrder={setOrder}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            onClickViewTopUp={onClickViewTopUp}
            onClickEditTopUp={onClickEditTopUp}
            reloadTheData={reloadTheData}
          />
        </Row>
      </Content>
    </Layout>
  );
};
export default AITopUp;
