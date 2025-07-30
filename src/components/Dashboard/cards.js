import { Tag } from "antd";
import { LineChartOutlined } from '@ant-design/icons';

const Cards = ({key,label,value}) => {
    return (
        <div class='w-full bg-white border rounded p-5 text-gray-500 flex flex-col gap-2'>
            
            <p key={key} class='text-sm font-medium' >
                {label}
            </p>           

            <div class='flex gap-3 items-center mb-3'>
                <p class='text-xl text-black font-semibold'>{value}</p>
                <Tag color="green" icon={<LineChartOutlined/>}>25.5%</Tag>                
            </div>

            <p class='text-sm' ><spam class='text-green-700'> 19% </spam> vs last month</p>       
        </div>
    )
}

export default Cards;