import { useEffect, useRef, useState } from "react";
import { apiCalls } from "../../hook/apiCall";
import useAlert from "../../common/alert";
import { Button, Divider, Drawer, Input, Select, Space } from "antd";
import { DownloadOutlined, SearchOutlined, PlusOutlined, SaveOutlined } from '@ant-design/icons';
import ServicesTable from "../../components/Services/services_table";
import ServiceDetail from "../../components/Services/service_detail";

const Services = ({ setLoading }) => {
    const ref= useRef();
    const { contextHolder,success, error } = useAlert();
    const [dataList, setDataList] = useState([]);
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('New');
    const [id, setId] = useState(0);
    const [refresh, setRefresh] = useState(0);

    useEffect(() => {
        setLoading(true);
        getData();
        setLoading(false);
    }, []);

 const getData = async () => {
        try {
            const res = await apiCalls('GET', 'services', null, null); 
            setDataList(res.data.data);
        }
        catch (e) {
            error(error.message)
        }
    }
    const btnNew_Click = () => {
        setTitle("New Service");
        setRefresh(refresh + 1);
        setId(0);
        setOpen(true);
    }

    const btnEdit_Click = (id) => {
        setTitle("Edit Service");
        setRefresh(refresh + 1);
        setId(id);
        setOpen(true);
    }

    const btnSave = async () => {
        const result = await ref.current?.btnSave_Click();
        setOpen(false);     

        if (result.status === 500 || result.status === 404)
            error(result.message);
        if (result.status === 201)
            success(`The service has been successfully created.`);
        if (result.status === 200)
            success(`The service has been modified successfully.`); 
     }

    return(
        <div class='bg-white border rounded-md w-full p-4 '>
            <div class='flex items-center justify-between'>
                <p class='text-xl font-semibold text-gray-600'>List of services </p>
                <div class="flex gap-2">
                    <Button type="primary" icon={<PlusOutlined />} size="large" onClick={() => btnNew_Click(0)}>Create service</Button>
                    <Button type='default' icon={<DownloadOutlined />} size="large">Export</Button>
                </div>
            </div>
            <Divider />

            <div class='flex items-center justify-between mb-6'>
                <Input size="large" placeholder="Search" prefix={<SearchOutlined />} style={{ width: '30%' }} />
                <div class="flex gap-2">
                    <Select
                        defaultValue="15"
                        style={{ width: 70, height: 40 }}
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

            <ServicesTable dataSource={dataList} onEdit={(e) => btnEdit_Click(e)} />

            {/* Drawer on right*/}
            <Drawer title={title} placement='right' width={500} onClose={() => setOpen(false)} open={open}
                extra={<Space><Button type="primary" icon={<SaveOutlined />} onClick={btnSave} >Save</Button></Space>}>

                <ServiceDetail id={id} reload={refresh} ref={ref} />
            </Drawer>

            {contextHolder}
        </div>
    )
}

export default Services