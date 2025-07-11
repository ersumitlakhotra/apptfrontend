import { Avatar, Divider, Image, Progress, Tooltip } from "antd";

const twoColors = {
    '0%': '#108ee9',
    '100%': '#87d068',
};

const WorkingCard = ({ key }) => {
    return (
        <div key={key} class=' border shadow p-3 flex flex-col  '>

            <div class='flex flex-row gap-2 w-72'>
                <Image width={42} height={42} src={"https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"} style={{ borderRadius: 4 }} />
                <div class='flex flex-col items-start w-full  whitespace-nowrap overflow-hidden'>
                    <span class='text-gray-800 font-medium font-sans'> Paramvir singh randhawa</span>
                    <p class='text-gray-400 text-xs  font-normal'>Cutting , beard</p>
                </div>
            </div>
            <div class='flex flex-row gap-2 justify-between items-center w-72 mt-2' >
                <span class='text-gray-800 text-sm font-medium font-sans'> Order
                   <span class='cursor-pointer underline italic text-blue-400'> # 
                    <Tooltip placement="top" title={'View Order'}>
                            6652
                        </Tooltip>
                    </span>
                </span>
                <span class='text-gray-400 text-xs font-normal'> 12:30 PM - 01:30 PM</span>
            </div>
            <Progress percent={99.9} strokeColor={twoColors} />

        </div>
    )
}
const AvailableCard = ({ key }) => {
    return (
        <div key={key} class=' border shadow p-3 flex flex-col  '>

            <div class='flex flex-row gap-2 w-72'>
                <Image width={42} height={42} src={"https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"} style={{ borderRadius: 4 }} />
                <div class='flex flex-col items-start w-full  whitespace-nowrap overflow-hidden'>
                    <span class='text-gray-800 font-medium font-sans'> Paramvir singh randhawa</span>
                    <p class='text-gray-400 text-xs  font-normal'>Next appointment : 03:00 PM</p>
                </div>
            </div>

        </div>
    )
}
export  {WorkingCard,AvailableCard};
