const AppointmentCards = () => {
    return (
        <div class={` border border-s-4 p-4 bg-white border-gray-200 rounded-lg gap-3`}>
            <div class='flex flex-row justify-between items-center'>
                <p class='font-bold text-lg text-blue-400'># 1001</p>
                <p class='font-bold text-lg '>$ 40</p>
            </div>

            <div class='flex flex-row gap-2 items-center'>
                {/*  {orderList.servicename.map((service, index) => (
                    <div key={index} className={`p-2  rounded-lg`}>
                        <p className=' text-sm text-white'>{service}</p>
                    </div>
                ))}*/}
            </div>
            <div class='flex flex-col gap-1'>
            {/*
                <FlexBoxRow icon={<Octicons name='clock' size={16} />} text={<Text className='font-semibold'>{orderList.slot}</Text>} />
                <FlexBoxRow icon={<AntDesign name='user-add' size={16} />} text={<Text className='font-medium'>{orderList.customername}</Text>} />
                <FlexBoxRow icon={<Feather name='phone-call' size={16} />} text={<Text className='font-medium'>{orderList.customercell}</Text>} />
                */}
            </div>

        </div>
    )
}

export default AppointmentCards