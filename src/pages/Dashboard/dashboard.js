import DashHeaderItems from "../../components/Dashboard/HeaderItems/dashboard_header_Items";
import Cards from "../../components/Dashboard/Cards/cards";
import { Button,  Flex } from "antd";
import { AreaChart } from "../../components/Dashboard/Charts/charts";

const handleButtonClick = e => {

    console.log('click left button', e);
};
const handleMenuClick = e => {

    console.log('click', e);
};
const items = [
    {
        label: 'Today',
        key: '1',
    },
    {
        label: 'This Week',
        key: '2',
    },
    {
        label: 'This Month',
        key: '3',
    },
];
const menuProps = {
    items,
    onClick: handleMenuClick,
};
const Dashboard = ({orderList, servicesList}) => {
    const dashHeaderItems = DashHeaderItems;
    return (
        <div class="flex flex-col gap-4 mb-12">
            <span class="text-lg font-semibold text-gray-800">Dashboard</span>
            {/* cards*/}
            <div class='flex flex-col gap-6 md:flex-row '>
                {dashHeaderItems.map(items => (
                    <Cards key={items.key} label={items.label} value={items.value} />
                ))}
            </div>
           
            <div class='flex flex-col gap-4 mt-4 md:flex-row'>
                <div class='flex flex-col gap-4 w-full md:w-3/5'>
                    <div class='flex justify-between'>
                        <span class="text-lg font-semibold text-gray-800">Statistics</span>
                        <Flex gap="small" wrap>
                            <Button color="primary" variant="outlined">
                                Month
                            </Button>
                            <Button color="default" variant="text">
                                Week
                            </Button>
                        </Flex>
                    </div>
                   
                        <AreaChart />
                </div>
            </div>

                
        </div>
    )
}

export default Dashboard;