

import SubscriptionTable from './SubscriptionTable';
import React, { useContext, useEffect, useState } from 'react';
import { NavContext } from '@Shared/NavContexts/nav-contexts';
import { useAxiosInstance } from '@Shared/axiosInstance/useAxiosInstance';
import { useNotification } from '@UIElements/CNotification/useNotification';
import { Layout, theme} from 'antd';
import { useNavigate } from 'react-router-dom';
import { subscriptionApi } from '@Shared/APIUrls';

const { Content } = Layout;

const Subscription = () => {
    const navigate = useNavigate();
  const { setIconsLevel, setSettingsBarLevel, setHeaderTitle } = useContext(NavContext);
  useEffect(() => {
    setHeaderTitle('Subscription');
  }, []);
  const {
    token: { borderRadiusLG },
  } = theme.useToken();
  const { api, contextHolder, openNotificationWithIcon } = useNotification();
  // subscription data
  const [subscription, setsubscription] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalNoOfRows, setTotalNoOfRows] = useState(5);
  const [orderBy, setOrderBy] = useState('updatedAt');
  const [order, setOrder] = useState('DESC');
  const [filterStatus, setFilterStatus] = useState(undefined);
  const [reloadTableData, setReloadTableData] = useState(false);
  const { axiosInstance } = useAxiosInstance();
  const getFilterStatus = () => {
    if (filterStatus !== undefined) {
      let k = [];
      k.push(filterStatus);
      return filterStatus;
    } else {
      return null;
    }
  };
  useEffect(() => { 
    setIsLoading(true);
    axiosInstance({
      url: subscriptionApi,
      method: 'GET',
      params: {
        page: page,
        pageSize: rowsPerPage,
        order_by: orderBy,
        order: order,
        filter: getFilterStatus(),
      },
    })
      .then((res) => {
        setsubscription(res?.data?.data?.data);
        setTotalNoOfRows(res?.data?.data?.metadata?.totalItems);
        setIsLoading(false);
      })
      .catch((error) => {
        openNotificationWithIcon('error', null, 'Something went wrong in server');
        setIsLoading(false);
      });
  }, [page, rowsPerPage, orderBy, order, filterStatus, reloadTableData]);

  const onClickViewSubscription = (mode,id)=>{
    navigate('/subscriptionDetails/'+mode+'/'+id);
  }
   const setInactive = (row) => {
    
        
      if(row.subs_plan_status == 'INACTIVE') row.subs_plan_status = 'ACTIVE';
  else row.subs_plan_status = 'INACTIVE';
        axiosInstance({
          url: subscriptionApi + '/' + row.subs_plan_id,
          method: 'PATCH',
          data: row,
        })
          .then((response) => {
            openNotificationWithIcon('success', null,response?.data?.message||'Sucessfully saved data!');
           
              setReloadTableData(!reloadTableData);
           
          })
          .catch((error) => {
            openNotificationWithIcon(
              'error',
              null,
              error?.response?.data?.errors && error?.response?.data?.errors[0] ? error?.response?.data?.errors[0] : 'Something went wrong in server'
            );
          });
      
    };
  return (
    <Layout>
      <Content style={{ padding: 10, height: '88vh', borderRadius: borderRadiusLG }}>
        {contextHolder}
        <SubscriptionTable
          data={subscription}
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
          setInactive={setInactive}
        />
      </Content>
    </Layout>
  );
};
export default Subscription;
