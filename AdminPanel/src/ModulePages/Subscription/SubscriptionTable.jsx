import React, { Fragment } from 'react';
import { Table, Pagination, Flex, Row, Radio, Dropdown } from 'antd';
import { MinusCircleOutlined, EyeOutlined, EditOutlined, MoreOutlined } from '@ant-design/icons';

const SubscriptionTable = ({
  data,
  isLoading,
  totalNoOfRows,
  rowsPerPage,
  setRowsPerPage,
  page,
  setPage,
  setOrderBy,
  setOrder,
  filterStatus,
  setFilterStatus,
  onClickViewSubscription,setInactive
}) => {
  const accStatus = [
    { label: 'All', value: undefined },
    { label: 'Active', value: 'ACTIVE' },
    { label: 'Inactive', value: 'INACTIVE' },
  ];
  const subscriptionAccStatus = { ACTIVE: 'Active', PENDING: 'Invited', INACTIVE: 'Inactive' };
  const createDropdownItems = (row) => {
    const items = [
      {
        key: '0',
        label: 'View',
        onClick: () => {
          onClickViewSubscription('view',row?.subs_plan_id);
        },
        icon: <EyeOutlined />,
      },
      {
        key: '1',
        label: 'Edit',
        onClick: () => {
          onClickViewSubscription('edit',row?.subs_plan_id);
        },
        disabled: false,
        icon: <EditOutlined />,
      },
      {
        key: '2',
        label: (row?.subs_plan_status == 'INACTIVE'?'Set Active':'Set Inactive'),
        
        onClick: () => {
          setInactive(row);
        },
        icon: <MinusCircleOutlined />,
      },
    ];

    return (
      <Dropdown menu={{ items }} placement="bottomLeft">
        <MoreOutlined />
      </Dropdown>
    );
  };

  const columns = [
    {
      title: 'Subscription Name',
      dataIndex: 'subs_plan_name',
      width: 180,
      key: 'subs_plan_name',
      sorter: () => {},
      render: (text, record) => (
        <div onClick={() => onClickViewSubscription('view',record.subs_plan_id)} className="fillwh">
          {record.subs_plan_name}
        </div>
      ),
    },
    {
      title: 'Monthly Price',
      width: 160,
      dataIndex: 'subs_plan_monthly_price',
      key: 'subs_plan_monthly_price',
      align: 'left',
      sorter: () => {},
      render: (text, record) => (
        <div onClick={() => onClickViewSubscription('view',record.subs_plan_id)} className="fillwh">
          {record.subs_plan_monthly_price}
        </div>
      ),
    },
    {
      title: 'Yearly Price',
      dataIndex: 'subs_plan_yearly_price',
      width: 160,
      key: 'subs_plan_yearly_price',
      align: 'left',
      sorter: () => {},
      render: (text, record) => (
        <div onClick={() => onClickViewSubscription('view',record.subs_plan_id)} className="fillwh">
          {record.subs_plan_yearly_price}
        </div>
      ),
    },
    {
      title: 'Total Active Subscribers',
      width: 220,
      dataIndex: 'subs_plan_yearly_price',
      key: 'subs_plan_yearly_price',
      align: 'left',
      sorter: () => {},
      render: (text, record) => (
        <div onClick={() => onClickViewSubscription('view',record.subs_plan_id)} className="fillwh">
          {record.subs_plan_yearly_price}
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'subs_plan_status',
      key: 'subs_plan_status',
      width: 180,
      align: 'left',
      sorter: () => {},
      render: (text, record) => (
        <div onClick={() => onClickViewSubscription('view',record.subs_plan_id)} className="fillwh">
          {subscriptionAccStatus[record.subs_plan_status]}
        </div>
      ),
    },
    {
      title: '',
      width: 100,
      dataIndex: '',
      key: 'actions',
      align: 'center',
      render: (_, record) => <React.Fragment>{createDropdownItems(record)}</React.Fragment>,
    },
  ];
  const onChange = (pagination, filters, sorter, extra) => {
    if (sorter.order !== undefined && sorter.field !== undefined) {
      setOrder(sorter.order == 'ascend' ? 'ASC' : 'DESC');
      setOrderBy(sorter.field);
      setPage(1);
    }
  };
  const onShowSizeChange = (current, pageSize) => {
    setRowsPerPage(pageSize);
    setPage(1);
  };
  return (
    <Fragment>
      <Row style={{ backgroundColor: '#ffffff', width: '96%', margin: 'auto', height: '40px', marginTop: '20px', borderRadius: '6px 6px 0px 0px' }} key={213}>
        <Radio.Group value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} style={{ height: '40px' }}>
          {accStatus.map((el, index) => {
            return (
              <Radio.Button className={filterStatus === el.value || undefined ? 'selected_filter_btn' : 'not_selected_filter_btn'} key={index} value={el.value}>
                {el.label}
              </Radio.Button>
            );
          })}
        </Radio.Group>
      </Row>
      <Flex style={{ width: '100%' }} vertical="true" justify="flex-end" align="center">
        <Table
          virtual
          rowKey={(col) => col.subs_plan_id}
          columns={columns}
          dataSource={data}
          onChange={onChange}
          style={{ width: '96%', margin: 'auto' }}
          pagination={false}
          loading={isLoading}
          scroll={{
            y: 600,
          }}
        />
        <Flex style={{ width: '96%', marginBottom: '50px' }} justify="flex-end">
          <Pagination
            showSizeChanger
            onShowSizeChange={onShowSizeChange}
            current={page}
            onChange={(pageNum) => pageNum !== page && setPage(pageNum)}
            total={totalNoOfRows}
            style={{ marginTop: '15px' }}
            pageSize={rowsPerPage}
            pageSizeOptions={[10, 25, 50, 100]}
            showTotal={(total, range) => `showing ${range[0]}-${range[1]} of ${totalNoOfRows} subscriptions`}
          />
        </Flex>
      </Flex>
    </Fragment>
  );
};

export default SubscriptionTable;
