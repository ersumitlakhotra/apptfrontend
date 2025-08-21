
import Chart from "react-apexcharts";
const Bar = () => {
    return (
        <Chart
            options={{
                xaxis: {
                    categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
                },
                stroke: {
                    curve: 'smooth',
                },
                dataLabels: {
                    enabled: false
                },
            }}
            series={[{
                name: 'series1',
                data: [31, 40, 28, 51, 42, 109, 100]
            }, {
                name: 'series2',
                data: [11, 32, 45, 32, 34, 52, 41]
            }]}
            type="bar"
            height={300}
        />)
}

const Pie = () => {
    return (
        <Chart
            options={{
                labels: ['Pending', 'Completed', 'Cancelled'],
                stroke: {
                    curve: 'smooth',
                },
                dataLabels: {
                    enabled: true
                }, grid: {
                    show: false
                },
                fill: {
                    colors: ['#FFD580', '#90EE90', '#ff6666']
                },
                plotOptions: {
                    pie: {
                        expandOnClick: false,
                    },
                }
            }}
            series={[40, 28, 51]}
            type="donut"
            height={200}
            width={'100%'}
        />)
}


export { Bar, Pie }