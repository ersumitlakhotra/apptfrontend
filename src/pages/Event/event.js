import { Button, Divider, Drawer, Input, Select, Space, Tabs } from "antd"
import { DownloadOutlined, SearchOutlined, PlusOutlined, SaveOutlined } from '@ant-design/icons';
import { useEffect, useRef, useState } from "react";
import EventAll from '../../components/Event/event_all.js';
import EventLive from '../../components/Event/event_live.js';
import EventUpcoming from '../../components/Event/event_upcoming.js';
import EventPast from '../../components/Event/event_past.js';
import useAlert from "../../common/alert.js";
import EventDetail from "../../components/Event/event_detail.js";
import { apiCalls } from "../../hook/apiCall.js";

function getTabItems(key, label, children) {
    return { key, label, children };
}

const Event = ({ setLoading }) => {
    const ref = useRef();
    const { contextHolder, success, error } = useAlert();
    const [dataList, setDataList] = useState([]);
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('New');
    const [id, setId] = useState(0);
    const [refresh, setRefresh] = useState(0);

    const [tabActiveKey, setTabActiveKey] = useState("1");

    const tabItems = [
        getTabItems('1', 'All',<EventAll/>),
        getTabItems('2', 'Live',<EventLive/>),
        getTabItems('3', 'Upcoming', <EventUpcoming />),
        getTabItems('4', 'Past',<EventPast/>),
    ];

    useEffect(() => {
        setLoading(true);
        getData();
        setLoading(false);
    }, []);

 const getData = async () => {
        try {
            const res = await apiCalls('GET', 'event', null, null); 
            setDataList(res.data.data);
        }
        catch (e) {
            error(error.message)
        }
    }
    const btnNew_Click = () => {
        setTitle("New Events");
        setRefresh(refresh + 1);
        setId(0);
        setOpen(true);
    }

    const btnEdit_Click = (id) => {
        setTitle("Edit Events");
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

    return (
    <div class='bg-white border rounded-md w-full p-4'>
        <div class='flex items-center justify-between mb-6'>
            <p class='text-xl font-semibold text-gray-600'>Events </p>
            <div class="flex gap-2">
                    <Button type="primary" icon={<PlusOutlined />} size="large" onClick={() => btnNew_Click(0)}>Create Event</Button>
            </div>
        </div>

        <Tabs
            defaultActiveKey="1"
            items={tabItems}
            activeKey={tabActiveKey}
            onChange={(e) => { setTabActiveKey(e) }}
        />      

        {/* Drawer on right*/}
        <Drawer title={title} placement='right' width={500} onClose={() => setOpen(false)} open={open}
                extra={<Space><Button type="primary" icon={<SaveOutlined />} onClick={btnSave}  >Save</Button></Space>}>
                <EventDetail id={id} reload={refresh} ref={ref} />
        </Drawer>

        {contextHolder}
    </div>
    )
}

export default Event