import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavContext } from '@Shared/NavContexts/nav-contexts';
import { Layout, Flex, Input,theme } from 'antd';
import { SearchOutlined} from '@ant-design/icons';
import { useAxiosInstance } from '@Shared/axiosInstance/useAxiosInstance';
import { useNotification } from '@UIElements/CNotification/useNotification';
import { productApi } from '@Shared/APIUrls';
import Buttons from '@UIElements/Buttons/Buttons';
import ProductTable from './ProductTable';
import { debounce } from '@Shared/Utils/utils';
import ProductFilterDrawer from '@ModulePages/Product/ProductFilterDrawer';
import { downloadCSVFile } from '@Shared/Utils/utils';
const { Content } = Layout;


const Product = ()=>{
     const { setIconsLevel, setSettingsBarLevel, setHeaderTitle } = useContext(NavContext);
     const [isLoadingCSVData, setIsLoadingCSVData] = useState(false);

       useEffect(() => {
           
            setHeaderTitle('Product');
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
         const [product, setproduct] = useState([]);
        

           const [searchText, setSearchText] = useState(null);
             const [page, setPage] = useState(1);
             const [rowsPerPage, setRowsPerPage] = useState(10);
             const [totalNoOfRows, setTotalNoOfRows] = useState(5);
            
             const [isLoading, setIsLoading] = useState(false);
             const { axiosInstance } = useAxiosInstance();
        
         const getProductList = () => {
                setIsLoading(true);
                axiosInstance({
                    url: productApi,
                    method: "GET",
                    params: {
                        page: page,
                        limit: rowsPerPage,
                        
                    },
                })
                    .then((res) => {
                        setproduct(res.data?.data);                        
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
                getProductList();
            }, [page, rowsPerPage, searchText]);
        
         const onClickViewProduct = (mode,id)=>{
           navigate('/productDetails/'+mode+'/'+id);
         }
      
        return (
            <Layout>
             {contextHolder}
                <Content style={{ padding: 10, height: '88vh', borderRadius: borderRadiusLG }}>
                  
                <Flex>
                    <Flex gap={10} flex={1}>
                        <Input
                            placeholder="Search by Product Name"
                            style={{ maxWidth: "314px" }}
                            prefix={<SearchOutlined />}
                            onChange={(e) => debouncedSearch(e.target.value)}
                            allowClear={true}
                        />
                    </Flex>
                    <Buttons
                        btntyp="colored-btn"
                        btntext={"Export CSV"}
                        w={160}
                        btnColor={"#8A7CFF"}
                        onClickFunc={downloadCSVData}
                    />
                </Flex>
                    
        <ProductTable
          data={product}
          isLoading={isLoading }
          totalNoOfRows={totalNoOfRows}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          page={page}
          setPage={setPage}
          onClickViewProduct={onClickViewProduct}
        />
                </Content>
            </Layout >);
}
export default Product;