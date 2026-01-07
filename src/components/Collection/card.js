import { Avatar, Skeleton } from "antd";

const Card = ({ key, title, value, backgroundColor, color }) => {
    return (
        <div key={key} class='w-full p-6 bg-white border rounded text-gray-500'>
            {value === null ? <Skeleton active style={{ padding: '16px' }} /> :
                <div class='flex flex-row gap-6 items-center'>
                    <Avatar shape="square" size={44} style={{ backgroundColor: backgroundColor, color: color }}>{title.charAt(0)}</Avatar>
                    <div class='flex flex-col'>
                        <p class='text-sm text-gray-500 font-medium' >{title}</p>
                        <p class=' text-black font-bold'>$ {value}</p>
                    </div>
                </div>
            }
        </div>
    )
}

export default Card;