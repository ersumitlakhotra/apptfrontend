import Chart from "react-apexcharts";
export const PieChart = ({ series }) => {
    return (
        <Chart
            options={{
                labels: ['Pending','In Progress', 'Completed', 'Cancelled'],
                stroke: {
                    curve: 'smooth',
                },
                dataLabels: {
                    enabled: true
                }, grid: {
                    show: false
                }, 
                fill: {
                    colors: ['#ffdd99', '#99ddff', '#a6f2a6', '#ff9999', ]
                },
                plotOptions: {
                    pie: {
                        expandOnClick: false,
                    },
                }
            }}
            series={series}
            type="donut"
            height={180}
            width={'100%'}
        />)
}