import { Avatar, Skeleton } from "antd";

const Card = ({ index, title, value, backgroundColor, color }) => {
    return (
        <div key={index} class='w-full p-6 bg-white border rounded text-gray-500'>
            {value === null ? <Skeleton active style={{ padding: '16px' }} /> :
                <div class='flex flex-row gap-2 items-center'>
                    <Avatar shape="square" size={44} style={{ backgroundColor: backgroundColor, color: color }}>{title.charAt(0)}</Avatar>
                    <div class='flex flex-col text-sm'>
                        <p class=' text-gray-500 font-medium' >{title}</p>
                        <p class=' text-black font-bold whitespace-nowrap'>$ {value}</p>
                    </div>
                </div>
            }
        </div>
    )
}

export default Card;