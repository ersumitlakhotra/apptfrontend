import Chart from "react-apexcharts";
import { LocalDate } from "../../../common/localDate";

function getFutureDates(numberOfDays) {
    const dates = [];
    const weekdays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    for (let i = 1; i <= numberOfDays; i++) {
        let today = new Date(LocalDate());
        const futureDate = new Date(today); // Create a new Date object to avoid modifying 'today'
        futureDate.setDate(today.getDate() + i);
        const dayName = weekdays[futureDate.getDay()];
        dates.push({ key: futureDate, label: futureDate.getDate(), weekday: dayName });
    }
    return dates;
}
export const BarChart = ({ dataArray}) => {
    //const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
    return (
        <Chart
            options={{
                xaxis: {
                    categories: dataArray.map(a => ({ x: a.month})),
                    labels: {
                        show: true, // This line hides the x-axis labels
                    }, axisBorder: {
                        show: false // Hides the border of the x-axis
                    },
                    axisTicks: {
                        show: false // Hides the X-axis ticks
                    }
                },
                yaxis: {
                    labels: {
                        show: false, // This line hides the x-axis labels
                    },
                    axisBorder: {
                        show: false // Hides the border of the x-axis
                    },
                },
                stroke: {
                    curve: 'smooth',
                },
                chart: {
                    redrawOnParentResize: true,
                    width: '90%',
                    toolbar: {
                        show: false
                    },
                },
                grid: {
                    show: false // Hides the entire grid area, including its borders
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
                }, 
            }}
            series={[{
                name: 'Booking',
                data: dataArray.map(a => ({ x: a.month, y: a.count}))
                 //data: dataArray.map(a => ({ x: a.month, y: a.count, fillColor: months[dayjs().get('month')] === a.month ? '#a3c2c2' : '' }))
            }]}
            type="bar"
            height={200}
            width={'100%'}
        />
    )
}