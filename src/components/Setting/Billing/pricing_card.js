import { Tag } from "antd"

const PricingCard = ({index, title, price,current }) => {
    return (
        <div key={index} class={`border rounded-md p-6 w-full flex flex-col gap-2 ${current && 'border-2 border-green-400'} cursor-pointer`}>
            <div class='flex items-center justify-between'>
                <p class='text-gray-500 text-sm '>{title}</p>
                {current && <Tag color="green">Current</Tag>}
            </div>
            <p class='text-gray-800 text-3xl font-medium'>${price} <span class='text-sm text-gray-500'> /mo</span></p>
        </div>
    )

}

export default PricingCard