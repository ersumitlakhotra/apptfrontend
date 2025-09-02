
import Chart from "react-apexcharts";
const Bar = ({sales,expense,categories}) => {
    return (
        <Chart
            options={{
                xaxis: {
                    categories: categories
                },
                stroke: {
                    curve: 'smooth',
                },
                dataLabels: {
                    enabled: false
                },
                 fill: {
                     colors: ['#90EE90', '#ff6666']
                },
            }}
            series={[{
                name: 'Sales',
                data: sales
            }, {
                name: 'Expense',
                data: expense
            }]}
            type="bar"
            height={300}
        />)
}

const Pie = ({ series }) => {
    return (
        <Chart
            options={{
                labels: ['Sales', 'Expense', 'Profit/Loss'],
                stroke: {
                    curve: 'smooth',
                },
                dataLabels: {
                    enabled: true
                }, grid: {
                    show: false
                },
                fill: {
                    colors: ['#90EE90', '#ff6666', '#FFD580']
                },
                plotOptions: {
                    pie: {
                        expandOnClick: false,
                    },
                }
            }}
            series={series}
            type="pie"
            height={200}
            width={'100%'}
        />)
}


export { Bar, Pie }