import { Button, Input, Table} from "antd"
import { IoSearchOutline } from "react-icons/io5";
import OrderTable from "./order_table"

const columns = [
    {
        title: 'Full Name',
        dataIndex: 'name',
        key: 'name',
        fixed: 'left',
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
        fixed: 'left',
    },
    {
        title: 'Column 1',
        dataIndex: 'address',
        key: '1',
    },
    {
        title: 'Column 2',
        dataIndex: 'address',
        key: '2',
    },
    {
        title: 'Column 3',
        dataIndex: 'address',
        key: '3',
    },
    {
        title: 'Column 4',
        dataIndex: 'address',
        key: '4',
    },
    {
        title: 'Action',
        key: 'operation',
        fixed: 'right',
        render: () => <a>action</a>,
    },
];
const dataSource = Array.from({ length: 100 }).map((_, i) => ({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
}));
const OrderTabs = ({ orderList, servicesList }) => {

    return (
        <div  class='w-full bg-white border rounded-lg p-4 flex flex-col gap-4 '>
            <div class='flex flex-col md:flex-row gap-2 items-center justify-between'>
                <div class='w-full md:w-1/3'>
                    <Input size="large" placeholder="Search" prefix={<IoSearchOutline />} />
                </div>
            </div>
            <OrderTable dataSource={[]} serviceList={[]} onEdit={(e) => (e)} />
        </div>
    )

}

export default OrderTabs