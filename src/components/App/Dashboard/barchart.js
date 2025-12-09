import Chart from "react-apexcharts";

export const BarChart = ({ dataArray}) => {
    //const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
    return (
        <Chart
            options={{
               
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
                    offsetY: 5,
                    style: {
                        fontSize: '12px',
                        colors: ["#FFFFFF"]
                    }
                }, plotOptions: {
                    bar: {
                        borderRadius: 3,
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
            height={180}
            width={'100%'}
        />
    )
}