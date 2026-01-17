import { Tag } from "antd"

const PricingCard = ({index, title, price,current }) => {
    return (
        <div key={index} class={`border rounded-md p-6 w-full flex flex-col gap-2 ${current && 'border-2 border-green-400'} `}>
            <div class='flex items-center justify-between'>
                <p class='text-gray-500 text-sm '>{title}</p>
                {current && <Tag color="green">Current</Tag>}
            </div>
            <p class='text-gray-800 text-3xl font-medium'>${price} <span class='text-sm text-gray-500'> / {title === 'FREE TRIAL' ? '30 Days':'Month'}</span></p>
            <div class='w-full p-4 bg-gray-100 mt-4 font-sans font-medium text-sm text-gray-500 '>
                Take care of
            </div>
            <ul class='list-disc ps-4 text-sm'>
                <li>Appointment Records</li>
                <li>Data Management</li>
                <li>Reporting</li>
                <li>Inventory Management</li>
                <li>Employee Performance</li>
                <li>Portal and Mobile Application</li>
                <li>Prioritized Support</li>
                {title === 'ENTERPRISE' && <li>Website</li>}
            </ul>
        </div>
    )

}

export default PricingCard