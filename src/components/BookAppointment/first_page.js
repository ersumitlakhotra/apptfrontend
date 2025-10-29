
import { Avatar, Image } from "antd";
import { UserOutlined } from '@ant-design/icons';

const FirstPage = ({ companyList, setCid,next }) => {
    return (
        <div class='flex flex-col font-normal gap-3 mt-2 w-full' >
            <p class='text-2xl font-sans font-bold mb-4'> Choose a location</p>
            {
                companyList.map(item => (
                    <div key={item.id} class='w-full border rounded-md border-gray-200 p-2 flex flex-row gap-2 shadow-md cursor-pointer' onClick={() => { setCid(item.id); next(); }} >
                        {item.logo !== null ?
                            <Image width={80} height={80} src={item.logo} style={{ borderRadius: 10 }} /> :
                            <Avatar shape="square" style={{ backgroundColor: '#f9fafb', border: 'solid', width: 80, height: 80 }} icon={<UserOutlined style={{ color: 'black' }} />} />
                        }
                        <div class='flex flex-col'>
                            <p class='font-sans font-medium mt-2'>{item.name}</p>
                            <p class='text-xs text-gray-500'> {item.addressinfo !== null ? item.addressinfo[0].street : ''}</p>
                            <p class='text-xs text-gray-500'> {item.addressinfo !== null ? `${item.addressinfo[0].city} , ${item.addressinfo[0].province} , ${item.addressinfo[0].country} ${item.addressinfo[0].postal} ` : ''}</p>
                        </div>
                    </div>
                ))

            }
        </div>
    )
}

export default FirstPage