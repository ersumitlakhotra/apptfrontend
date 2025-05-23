const Cards = ({key,label,value}) => {
    return (
        <div class='w-full bg-white rounded shadow p-5 text-gray-600'>
            <div key={key} class='flex text-gray-600 dark:text-white text-xl' >{label}</div>           
            <div class='flex flex-col xl:flex-row gap-2'>
                <div class='w-full flex flex-col gap-3'>
                    <div class='flex font-semibold dark:text-white text-3xl ' >{value}</div>
                    <div class='text-gray-600' >
                        <p><spam class='text-green-700 font-semibold'> 19% </spam> vs last month</p>
                    </div>
                </div>
                <div  class='flex w-full font-bold dark:text-white items-center justify-center border ' >Charts</div>
                
            </div>
        </div>
    )
}

export default Cards;