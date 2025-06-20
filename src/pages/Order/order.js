import { Button, Divider, Drawer, Input, Select, Space } from "antd";
import { DownloadOutlined, PlusOutlined, SearchOutlined, SaveOutlined } from '@ant-design/icons';
import OrderHeaderItems from "../../components/Order/OrderItems/order_header_items";
import Cards from "../../components/Order/Cards/cards";
import OrderTable from "../../components/Order/order_table.js"
import { useEffect, useRef, useState } from "react";
import useAlert from "../../common/alert";
import { apiCalls } from "../../hook/apiCall";
import OrderDetail from "../../components/Order/order_detail";


const Order = ({ setLoading })=> {
    const ref = useRef();
    const { contextHolder, success, error } = useAlert();
    const [dataList, setDataList] = useState([]);
    const [servicesList, setServicesList] = useState([]);
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('New');
    const [id, setId] = useState(0);
    const [refresh, setRefresh] = useState(0);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        setLoading(true); 
        setIsLoading(true);
        try {
            const res = await apiCalls('GET', 'order', null, null);
            setDataList(res.data.data);

            const res1 = await apiCalls('GET', 'services', null, null);
            setServicesList(res1.data.data);
        }
        catch (e) {
            error(error.message)
        }
        setLoading(false);
        setIsLoading(false);
    }

    const btnNew_Click = () => {
        setTitle("New Order");
        setRefresh(refresh + 1);
        setId(0);
        setOpen(true);
    }

    const btnEdit_Click = (id) => {
        setTitle("Edit Order");
        setRefresh(refresh + 1);
        setId(id);
        setOpen(true);
    }

    const btnSave = async () => {
        const result = await ref.current?.btnSave_Click();
        setOpen(false);
        getData();
        if (result.status === 500 || result.status === 404)
            error(result.message);
        if (result.status === 201)
            success(`The order has been successfully created.`);
        if (result.status === 200)
            success(`The order has been modified successfully.`);
    }

    return(
        <div class='bg-white border rounded-md w-full p-4 '>
            <div class='flex items-center justify-between'>
                <p class='text-xl font-semibold text-gray-600'>List of orders </p>  
                <div class="flex gap-2">
                    <Button type="primary" icon={<PlusOutlined />} size="large" onClick={() => btnNew_Click(0)}>Create order</Button>
                    <Button type='default' icon={<DownloadOutlined />} size="large">Export</Button>
                </div>
            </div>
            <Divider/>

            <div class='flex flex-col gap-2 lg:flex-row '>
            {OrderHeaderItems.map (items => (
                <Cards key={items.key} label={items.label} value={items.value} icon={items.icon} color={items.color} />
            ))}
            </div>
            <Divider/>

            <div class='flex items-center justify-between mb-6'>
                <Input size="large" placeholder="Search" prefix={<SearchOutlined />} style={{width:'30%'}} />
                <div class="flex gap-2">
                    <Select
                        defaultValue="15"
                        style={{ width: 70 , height:40 }}
                        options={[
                            { value: '15', label: '15' },
                            { value: '25', label: '25' },
                            { value: '50', label: '50' },
                            { value: '100', label: '100' },
                        ]}
                        />
                    <p class='flex items-center justify-center text-gray-600 '>entries per page</p>
                </div>               
            </div>

            {
                !isLoading && 
                <OrderTable dataSource={dataList} serviceList={servicesList} onEdit={(e) => btnEdit_Click(e)} />
            }

            {/* Drawer on right*/}
            <Drawer title={title} placement='right' width={500} onClose={() => setOpen(false)} open={open}
                extra={<Space><Button type="primary" icon={<SaveOutlined />} onClick={btnSave} >Save</Button></Space>}>

                <OrderDetail id={id} reload={refresh} ref={ref} />
            </Drawer>

            {contextHolder}
        </div>
    )
}

export default Order;