import React, { Fragment } from 'react';
import { Table, Pagination, Flex, Row, Radio, Dropdown } from 'antd';
import { MinusCircleOutlined, EyeOutlined, EditOutlined, MoreOutlined } from '@ant-design/icons';
import { TableDateFormatter } from '@Shared/Utils/utils';

const PaymentTable = ({
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
  onClickViewSubscription
}) => {
  const accStatus = [
    { label: 'All', value: undefined },
    { label: 'Pending', value: 'UNPAID' },
    { label: 'Paid', value: 'PAID' },
    { label: 'Rejected', value: 'CANCELLED' },
    { label: 'Refunded', value: 'REFUNDED' },
  ];
  const subscriptionAccStatus = { PAID: 'Paid', UNPAID: 'Pending', 
    CANCELLED: 'Rejected', REFUNDED: 'Refunded' };

  const createDropdownItems = (row) => {
    const items = [
      {
        key: '0',
        label: 'View',
        onClick: () => {
          onClickViewSubscription('view',row?.org_inv_id);
        },
        icon: <EyeOutlined />,
      },
      {
        key: '1',
        label: 'Edit',
        onClick: () => {
          onClickViewSubscription('edit',row?.org_inv_id);
        },
        disabled: false,
        icon: <EditOutlined />,
      }
    ];

    return (
      <Dropdown menu={{ items }} placement="bottomLeft">
        <MoreOutlined />
      </Dropdown>
    );
  };

  const columns = [
    {
      title: 'Payment ID',
      dataIndex: 'payment_intent_id',
      width: 180,
      key: 'payment_intent_id',
      sorter: () => {},
      render: (text, record) => (
        <div onClick={() => onClickViewSubscription('view',record.org_inv_id)} className="fillwh">
          {record?.payment_intent_id}
        </div>
      ),
    },
    {
      title: 'Invoice ID',
      width: 160,
      dataIndex: 'inv_uid',
      key: 'inv_uid',
      align: 'left',
      sorter: () => {},
      render: (text, record) => (
        <div onClick={() => onClickViewSubscription('view',record.org_inv_id)} className="fillwh">
          {record?.inv_uid}
        </div>
      ),
    },
    {
      title: 'Subscriber Name',
      dataIndex: 'org_name',
      width: 160,
      key: 'org_name',
      align: 'left',
      sorter: () => {},
      render: (text, record) => (
        <div onClick={() => onClickViewSubscription('view',record.org_inv_id)} className="fillwh">
          {record?.org?.org_name}
        </div>
      ),
    },
    {
      title: 'Payment Date',
      width: 220,
      dataIndex: 'inv_payment_date',
      key: 'inv_payment_date',
      align: 'left',
      sorter: () => {},
      render: (text, record) => (
        <div onClick={() => onClickViewSubscription('view',record.org_inv_id)} className="fillwh">
          {record?.inv_payment_date ? TableDateFormatter(record?.inv_payment_date) : ''}
        </div>
      ),
    },
    {
      title: 'Payment Amount',
      dataIndex: 'total_amount',
      key: 'total_amount',
      width: 180,
      align: 'left',
      sorter: () => {},
      render: (text, record) => (
        <div onClick={() => onClickViewSubscription('view',record.org_inv_id)} className="fillwh">
          {record?.total_amount}
        </div>
      ),
    },
    {
      title: 'Payment Status',
      dataIndex: 'inv_status',
      key: 'inv_status',
      width: 180,
      align: 'left',
      sorter: () => {},
      render: (text, record) => (
        <div onClick={() => onClickViewSubscription('view',record.org_inv_id)} className="fillwh">
          {subscriptionAccStatus[record?.inv_status]}
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
      <Row style={{ backgroundColor: '#ffffff', width: '100%', margin: 'auto', height: '40px', marginTop: '20px', borderRadius: '6px 6px 0px 0px' }} key={213}>
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
          rowKey={(col) => col.org_inv_id}
          columns={columns}
          dataSource={data}
          onChange={onChange}
          style={{ width: '100%', margin: 'auto' }}
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

export default PaymentTable;
