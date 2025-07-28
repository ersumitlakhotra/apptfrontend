
import Chart from "react-apexcharts";
const AreaChart = () => {
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
                        redrawOnParentResize: true
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

export { AreaChart }