import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavContext } from '@Shared/NavContexts/nav-contexts';
import { Layout, Flex, Input,theme } from 'antd';
import { SearchOutlined} from '@ant-design/icons';
import { useAxiosInstance } from '@Shared/axiosInstance/useAxiosInstance';
import { useNotification } from '@UIElements/CNotification/useNotification';
import { paymentApi } from '@Shared/APIUrls';
import Buttons from '@UIElements/Buttons/Buttons';
import PaymentTable from './PaymentTable';
import { debounce } from '@Shared/Utils/utils';
import PaymentFilterDrawer from '@ModulePages/Payment/PaymentFilterDrawer';
import { downloadCSVFile } from '@Shared/Utils/utils';
const { Content } = Layout;


const Payment = ()=>{
     const { setIconsLevel, setSettingsBarLevel, setHeaderTitle } = useContext(NavContext);
     const [isLoadingCSVData, setIsLoadingCSVData] = useState(false);

       useEffect(() => {
           
            setHeaderTitle('Payment');
            setIconsLevel(2);
            setSettingsBarLevel(2);
        }, []);
           const debouncedSearch = debounce((value) => {
                setSearchText(value);
                setPage(1);
            }, 1000);
        
       const navigate = useNavigate();
      
         const {
           token: { borderRadiusLG },
         } = theme.useToken();
         const { api, contextHolder, openNotificationWithIcon } = useNotification();
         const [payment, setpayment] = useState([]);
        

           const [searchText, setSearchText] = useState(null);
             const [page, setPage] = useState(1);
             const [rowsPerPage, setRowsPerPage] = useState(10);
             const [totalNoOfRows, setTotalNoOfRows] = useState(5);
             const [orderBy, setOrderBy] = useState("updatedAt");
             const [order, setOrder] = useState("DESC");
             const [filterBy, setFilterBy] = useState(null);
             const [filterStatus, setFilterStatus] = useState(undefined);
             const [isLoading, setIsLoading] = useState(false);
             const { axiosInstance } = useAxiosInstance();
        
         const getPaymentList = () => {
                setIsLoading(true);
                axiosInstance({
                    url: paymentApi,
                    method: "GET",
                    params: {
                        page: page,
                        pageSize: rowsPerPage,
                        org_name: searchText,
                        inv_status:filterStatus,
                        order_by: orderBy,
                        order: order,
                        ...filterBy,
                    },
                })
                    .then((res) => {
                        setpayment(res.data?.data);                        
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
                getPaymentList();
            }, [page, rowsPerPage, orderBy, order, filterStatus, searchText, filterBy]);
        
         const onClickViewSubscription = (mode,id)=>{
           navigate('/paymentDetails/'+mode+'/'+id);
         }
         const downloadCSVData = async () => {
            setIsLoadingCSVData(true);
            axiosInstance({
              url: paymentApi,
              method: "GET"
           
            })
              .then((res) => {
                let all = res?.data?.data?.reduce((acc, el) => {
                  acc.push([el.payment_intent_id, el.inv_uid, el.org.org_name, el.inv_payment_date, 
                    el.total_amount,el.inv_status].join(","));
                  return acc;
                }, []);
                // Headers for each column
                let headers = ["Payment ID, Invoice ID, Subscriber Name, Payment Date, Payment Amount, Payment Status"];
                downloadCSVFile({
                  data: [...headers, ...all].join("\n"),
                  fileName: "Payment.csv",
                  fileType: "text/csv",
                });
                setIsLoadingCSVData(false);
              })
              .catch((error) => {
                openNotificationWithIcon(
                    "error",
                    null,
                    error.response?.data?.message || "Something went wrong in server"
                );
                setIsLoading(false);
                setIsLoadingCSVData(false);
              });
          };
        return (
            <Layout>
             {contextHolder}
                <Content style={{ padding: 10, height: '88vh', borderRadius: borderRadiusLG }}>
                  
                <Flex>
                    <Flex gap={10} flex={1}>
                        <Input
                            placeholder="Search by Subscriber Name"
                            style={{ maxWidth: "314px" }}
                            prefix={<SearchOutlined />}
                            onChange={(e) => debouncedSearch(e.target.value)}
                            allowClear={true}
                        />
                        <PaymentFilterDrawer setFilterBy={setFilterBy} setFilterStatus={setFilterStatus} />
                    </Flex>
                    <Buttons
                        btntyp="colored-btn"
                        btntext={"Export CSV"}
                        w={160}
                        btnColor={"#8A7CFF"}
                        onClickFunc={downloadCSVData}
                    />
                </Flex>
                    
        <PaymentTable
          data={payment}
          isLoading={isLoading }
          totalNoOfRows={totalNoOfRows}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          page={page}
          setPage={setPage}
          setOrderBy={setOrderBy}
          setOrder={setOrder}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          onClickViewSubscription={onClickViewSubscription}
        />
                </Content>
            </Layout >);
}
export default Payment;