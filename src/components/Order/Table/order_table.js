
import { Space, Table, Tag } from 'antd';
import Link from 'antd/es/typography/Link';
const columns = [
  {
    title: 'Order',
    dataIndex: 'order',
    key: 'order',
    render: text => <Link>{text}</Link>,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (_, { status }) => (
      <>
        {status.map(tag => {
          let color = 'yellow';
          if (tag === 'Confirmed') {
            color = 'green';
          }
          if (tag === 'Cancelled') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Customer',
    dataIndex: 'customer',
    key: 'customer',
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Services',
    dataIndex: 'services',
    key: 'services',
  },
  {
    title: 'Scheduled',
    dataIndex: 'schedule',
    key: 'schedule',
  },
  {
    title: 'Clients',
    dataIndex: 'clients',
    key: 'clients',
  }, 
  {
    title: 'Employee',
    dataIndex: 'employee',
    key: 'employee',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <>
        {tags.map(tag => {
          let color = 'yellow';
          if (tag === 'assigned') {
            color = 'blue';
          }
          if (tag === 'inprogress') {
            color = 'orange';
          }
          if (tag === 'completed') {
            color = 'green';
          }
          if (tag === 'cancelled') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Last Modified',
    dataIndex: 'last_modified',
    key: 'last_modified',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <Link>Edit</Link>
        <Link>Delete</Link>
      </Space>
    ),
  },
];
const data = [
  {
    key: '1',
    order: '#1001',
    status: ['Confirmed'],
    customer: 'Sumit kumar',
    price: '$40',
    services: 'Cutting Beard',
    schedule: '2025-05-31',
    clients: '1',
    employee: 'Bobby',
    last_modified:'2025-05-28 08:00 PM',
    address: 'New York No. 1 Lake Park',
    tags: ['not assigned', 'assigned'],
  },
  {
    key: '2',
    order: '#1002',
    status: ['Pending'],
    customer: 'Sandeep Kaur',
    price: '$10',
    services: 'Threading',
    schedule: '2025-05-31',
    clients: '1',
    employee: 'Suman',
    last_modified:'2025-05-28 08:00 PM',
    address: 'New York No. 1 Lake Park',
    tags: ['inprogress', 'completed'],
  },
  {
    key: '3',
    order: '#1003',
    status: ['Cancelled'],
    customer: 'Gurpreet',
    price: '$50',
    services: '',
    schedule: '2025-05-31',
    clients: '1',
    employee: 'Sunil',
    last_modified:'2025-05-28 08:00 PM',
    address: 'New York No. 1 Lake Park',
    tags: ['cancelled'],
  },
];
const OrderTable = () => <Table columns={columns} dataSource={data} />;
export default OrderTable;