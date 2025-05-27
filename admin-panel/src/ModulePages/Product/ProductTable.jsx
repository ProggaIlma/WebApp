import React, { Fragment } from 'react';
import { Table, Pagination, Flex, Row, Radio, Dropdown, Image } from 'antd';
import { EyeOutlined, EditOutlined, MoreOutlined } from '@ant-design/icons';
import { TableDateFormatter } from '@Shared/Utils/utils';

const ProductTable = ({
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
  onClickViewProduct
}) => {
  const statusOptions = [
    { label: 'All', value: undefined },
    { label: 'In Stock', value: 'in_stock' },
    { label: 'Out of Stock', value: 'out_of_stock' },
  ];

  const createDropdownItems = (row) => {
    const items = [
      {
        key: '0',
        label: 'View',
        onClick: () => onClickViewProduct('view', row._id),
        icon: <EyeOutlined />,
      },
      {
        key: '1',
        label: 'Edit',
        onClick: () => onClickViewProduct('edit', row._id),
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
      title: 'Product Name',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      sorter: () => {},
      render: (text, record) => (
        <div onClick={() => onClickViewProduct('view', record._id)} className="fillwh">
          {record.name}
        </div>
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: 250,
      ellipsis: true,
    },
    {
      title: 'Price ($)',
      dataIndex: 'price',
      key: 'price',
      width: 120,
      sorter: () => {},
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
      width: 100,
      sorter: () => {},
      render: (stock) => (stock > 0 ? `In Stock (${stock})` : 'Out of Stock'),
    },
    {
      title: 'Category',
      dataIndex: 'categoryId',
      key: 'categoryId',
      width: 140,
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 180,
      render: (text) => TableDateFormatter(text),
    },
    {
      title: 'Image',
      dataIndex: 'images',
      key: 'images',
      width: 120,
      render: (images) => (
        images?.length > 0 && <Image width={60} src={images[0]} alt="product" />
      ),
    },
    {
      title: '',
      key: 'actions',
      width: 100,
      align: 'center',
      render: (_, record) => <Fragment>{createDropdownItems(record)}</Fragment>,
    },
  ];

  const onChange = (pagination, filters, sorter) => {
    if (sorter.order && sorter.field) {
      setOrder(sorter.order === 'ascend' ? 'ASC' : 'DESC');
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
      <Row style={{ backgroundColor: '#fff', height: 40, marginTop: 20, borderRadius: '6px 6px 0 0' }}>
        <Radio.Group value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} style={{ height: '40px' }}>
          {statusOptions.map((option, index) => (
            <Radio.Button
              key={index}
              value={option.value}
              className={filterStatus === option.value ? 'selected_filter_btn' : 'not_selected_filter_btn'}
            >
              {option.label}
            </Radio.Button>
          ))}
        </Radio.Group>
      </Row>

      <Flex style={{ width: '100%' }} vertical="true" justify="flex-end" align="center">
        <Table
          rowKey={(record) => record._id}
          columns={columns}
          dataSource={data}
          loading={isLoading}
          onChange={onChange}
          pagination={false}
          scroll={{ y: 600 }}
          style={{ width: '100%' }}
        />
        <Flex style={{ width: '96%', marginBottom: '50px' }} justify="flex-end">
          <Pagination
            showSizeChanger
            onShowSizeChange={onShowSizeChange}
            current={page}
            onChange={(pageNum) => pageNum !== page && setPage(pageNum)}
            total={totalNoOfRows}
            pageSize={rowsPerPage}
            pageSizeOptions={[10, 25, 50, 100]}
            showTotal={(total, range) => `showing ${range[0]}-${range[1]} of ${total} products`}
            style={{ marginTop: 15 }}
          />
        </Flex>
      </Flex>
    </Fragment>
  );
};

export default ProductTable;
