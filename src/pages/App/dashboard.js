import { Skeleton } from "antd";
import { BarChart } from "../../components/App/Dashboard/barchart";
import Header from "../../components/App/Dashboard/header";

const AppDashboard = () => {
    const chart='0';
    return(
        <div class='w-full flex flex-col gap-4 '>
            <Header />
            <div class='w-full h-[200px] bg-white border rounded text-gray-500'>
                {chart === null ? <Skeleton active style={{ padding: '16px' }} /> :
                    <>
                        <div class='flex items-center justify-between px-4 mt-2'>
                            <p class='text-sm font-medium ' >Bookings</p>
                            <p class='text-xl text-black font-semibold'># 50</p>
                        </div>
                        chart
                    </>
                }
            </div>

            <div class='w-full h-[200px] bg-white border rounded text-gray-500'>
                {chart === null ? <Skeleton active style={{ padding: '16px' }} /> :
                    <>
                        <div class='flex items-center justify-between px-4 mt-2'>
                            <p class='text-sm font-medium ' >Today</p>
                            <p class='text-xl text-black font-semibold'># 50</p>
                        </div>
                        chart
                    </>
                }
            </div>
            
            <div>
                content
            </div>
        </div>
    )
}

export default AppDashboard;