
import Chart from "react-apexcharts";

import dayjs from 'dayjs';

const AreaChart = ({ sales,expense, categoriesArray }) => {
    return (
        <Chart
            options={{
                xaxis: {
                    categories: categoriesArray
                },
                stroke: {
                    curve: 'smooth',
                },
                dataLabels: {
                    enabled: false
                }, grid: {
                    show: false
                },
                chart: {
                    redrawOnParentResize: true,
                    width: '100%',
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
            type="area"
            height={400}
            width={'100%'}
        />
    )
}

const AreaChartOptions = () => {
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
                chart: {
                    redrawOnParentResize: true,
                    width: '100%',
                },
            }}
            series={[{
                name: 'series1',
                data: [31, 40, 28, 51, 42, 109, 100]
            }, {
                name: 'series2',
                data: [11, 32, 45, 32, 34, 52, 41]
            }]}
            type="area"
            height={500}
        />
    )
}
const BarChart = ({ dataArray}) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
    return (
        <Chart
            options={{
                stroke: {
                    curve: 'smooth',
                },
                dataLabels: {
                    enabled: true,
                    formatter: function (val) {
                        return val;
                    },
                    offsetY: -20,
                    style: {
                        fontSize: '12px',
                        colors: ["#FFFFFF"]
                    }
                }, plotOptions: {
                    bar: {
                        borderRadius: 12,
                        dataLabels: {
                            position: 'center', // top, center, bottom
                        },
                    }
                }, grid: {
                    show: false
                },
            }}
            series={[{
                name: 'Orders',
                data: dataArray.map(a => ({ x: a.month, y: a.count}))
                 //data: dataArray.map(a => ({ x: a.month, y: a.count, fillColor: months[dayjs().get('month')] === a.month ? '#a3c2c2' : '' }))
            }]}
            type="bar"
            height={400}
            width={'100%'}
        />
    )
}
const PieChart = ({ series }) => {
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
            type="pie"
            height={300}
            width={'100%'}
        />)
}
//colors: ['#FFD580','#80d4ff','#90EE90', '#ff6666', ]
export { AreaChart , BarChart, PieChart}