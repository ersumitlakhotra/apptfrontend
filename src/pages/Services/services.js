import {  useEffect, useRef, useState } from "react";
import { EditOutlined } from '@ant-design/icons';
import { IoSearchOutline } from "react-icons/io5";
import { Button,  Drawer, Input,  Select,  Space, Tooltip } from "antd";
import { DownloadOutlined,  PlusOutlined, SaveOutlined } from '@ant-design/icons';
import ServiceDetail from "../../components/Services/service_detail";
import DataTable from "../../common/datatable";
import {  getTableItem,getDate } from "../../common/items";
import { Tags } from "../../common/tags";
import {Sort} from '../../common/sort.js'


const Services = ({ servicesList, setServicesList, saveData }) => {
    const ref= useRef();
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('New');
    const [id, setId] = useState(0);
    const [refresh, setRefresh] = useState(0);
    const [filteredList, setFilteredList] = useState(servicesList);

    const [searchInput, setSearchInput] = useState('');
    const [sortStatus, setSortStatus] = useState('');
    const [sortByName, setSortByName] = useState('asc');
    const [sortByPrice, setSortByPrice] = useState('asc');

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    useEffect(() => {
        setFilteredList(servicesList)
        setPage(1,10);
    }, [])

    const btn_Click = (id) => {
        setTitle(id === 0 ? "New Service" : "Edit Service");
        setRefresh(refresh + 1);
        setId(id);
        setOpen(true);
    }

    const btnSave = async () => {
        await ref.current?.save(); 
     }

    useEffect(() => {
        const searchedList = servicesList.filter(item =>
        (item.name.toLowerCase().includes(searchInput.toLowerCase()) &&
            (sortStatus !== '' ? item.status.toLowerCase() === (sortStatus.toLowerCase()) : item.status.toLowerCase().includes('active')
            )));
        if (searchInput === '' && sortStatus === '')
            setPage(currentPage, itemsPerPage, searchedList)
        else
            setPage(1, itemsPerPage, searchedList)
    }, [searchInput, sortStatus,sortByPrice,sortByName])

    const setPage = (page, pageSize,list=[]) => {
        const indexOfLastItem = page * pageSize;
        const indexOfFirstItem = indexOfLastItem - pageSize;
        const searchedList = list.slice(indexOfFirstItem, indexOfLastItem);
        setFilteredList(searchedList)
    }
    const setSortByName_onClick = (value) => {
        setServicesList(Sort('name', value, servicesList))
        setSortByName(value);
    }
    const setSortByPrice_onClick = (value) => {
        setServicesList(Sort('price', value, servicesList))
        setSortByPrice(value);
    } 
    
    const setSort = (value,label,setBy) => {
        setServicesList(Sort('price', value, servicesList))
        setSortByPrice(value);
    }

   {/*useEffect(() => {
        setFilteredList(Sort('price', sortByPrice, filteredList))
    }, [sortByPrice])
*/} 
    const headerItems = [
        getTableItem('1', 'Name', sortByName, setSortByName_onClick),
        getTableItem('2', 'Price', sortByPrice, setSortByPrice_onClick),
        getTableItem('3', 'Time'),
        getTableItem('4', 'Status'),
        getTableItem('5', 'Last Modified'),
        getTableItem('6', 'Action'),
    ];
    return(
        <div class="flex flex-col gap-4 mb-12">
           
            <div class='flex items-center justify-between'>
                <span class="text-lg font-semibold text-gray-800">Services</span>
                <div class="flex gap-2">
                    <Button type='default' icon={<DownloadOutlined />} size="large">Export</Button>
                    <Button type="primary" icon={<PlusOutlined />} size="large" onClick={() => btn_Click(0)}>Create service</Button>
                </div>
            </div>

            <div class='w-full bg-white border rounded-lg p-4 flex flex-col gap-4 '>

                <div class='flex flex-col md:flex-row gap-2 items-center justify-between'>
                    <div class='w-full md:w-1/3'>
                        <Input size="large" placeholder="Search" prefix={<IoSearchOutline />} value={searchInput} onChange={(e) =>setSearchInput(e.target.value)} />
                    </div>
                    <div class='w-full md:w-2/3 flex flex-row items-center md:justify-end justify-start gap-3'>
                        <p class='text-sm text-gray-500'>Filter by:</p>
                        <Select
                            value={sortStatus}  
                            style={{width:120}}
                            onChange={(e) => setSortStatus(e)}
                            options={[
                                { value: '', label:'Both' },
                                { value: 'Active', label: 'Active' },
                                { value: 'Inactive', label: 'Inactive' }
                            ]}
                        />
                    </div>
                </div>


                <DataTable headerItems={headerItems} list={(searchInput === '' && sortStatus === '') ? servicesList : filteredList} 
                    onChange={(page, pageSize) => {
                        setCurrentPage(page);
                        setItemsPerPage(pageSize); 
                        setPage(page, pageSize,servicesList)}} 

                    body={(
                    filteredList.map(item => (
                        <tr key={item.id} class="bg-white border-b text-xs  whitespace-nowrap border-gray-200 hover:bg-zinc-50 ">
                            <td class="p-3 font-semibold">{item.name}</td>
                            <td class="p-3 ">$ {item.price}</td>
                            <td class="p-3 ">{item.timing}</td>
                            <td class="p-3">{Tags(item.status)}</td>
                            <td class="p-3">{getDate(item.modifiedat)}</td>
                            <td class="p-3">
                                <Tooltip placement="top" title={'Edit'} >
                                    <Button type="link" icon={<EditOutlined />} onClick={() => btn_Click(item.id)} />
                                </Tooltip>
                            </td>
                        </tr>
                    ))
                )} />
            </div>

            <Drawer title={title} placement='right' width={500} onClose={() => setOpen(false)} open={open}
                extra={<Space><Button type="primary" icon={<SaveOutlined />} onClick={btnSave} >Save</Button></Space>}>

                <ServiceDetail id={id} refresh={refresh} ref={ref} servicesList={servicesList} saveData={saveData} setOpen={setOpen} />
            </Drawer>

        </div>
    )
}

export default Services