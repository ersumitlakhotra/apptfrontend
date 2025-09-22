/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Dropdown, Space, Spin } from "antd";
import { useEffect, useState } from "react";
import { DownOutlined, LoadingOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { firstDateOfMonth, lastDateOfMonth } from "../../../common/localDate";
import {Pie } from "../Chart/graph";

const MonthlyReport = ({ orderList, expensesList, yearList, months }) => {
    const [chart, setChart] = useState(null);
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    const onYearChanged = e => { setCurrentYear(e.key) };
    const menuProps = { items: yearList, onClick: onYearChanged, };

    useEffect(() => {
        let salesArray = [];
        let expenseArray = [];
        let seriestotalSale = 0; let seriestotalExpense = 0; let seriesProfitLoss = 0;

        months.map((a, index) => {
            let date = currentYear + '-' + String(index + 1).padStart(2, '0') + '-02T00:00:00';
            let frm = dayjs(firstDateOfMonth(new Date(date))).format("YYYY-MM-DD");
            let to = dayjs(lastDateOfMonth(new Date(date))).format("YYYY-MM-DD");
            let totalSale = 0; let totalExpense = 0;
            orderList.filter(a => dayjs(a.trndate).format('YYYY-MM-DD') >= frm && dayjs(a.trndate).format('YYYY-MM-DD') <= to).map(b => {
                totalSale += parseFloat(b.total);
            });
            expensesList.filter(a => dayjs(a.trndate).format('YYYY-MM-DD') >= frm && dayjs(a.trndate).format('YYYY-MM-DD') <= to).map(b => {
                totalExpense += parseFloat(b.grossamount);
            });
            salesArray.push(totalSale);
            expenseArray.push(totalExpense);

            seriestotalSale += parseFloat(totalSale);
            seriestotalExpense += parseFloat(totalExpense);

        })
        seriesProfitLoss = parseFloat(seriestotalSale) - parseFloat(seriestotalExpense);
        if (seriesProfitLoss < 0) {
            seriesProfitLoss = seriesProfitLoss * -1;
        }

        let seriesArray = [seriestotalSale, seriestotalExpense, seriesProfitLoss];

        setChart(<Pie series={seriesArray} />)
    }, [currentYear])

    return (
        <div class='flex flex-col gap-4 w-full'>
            <div class='flex justify-between items-center'>
                <span class=" text-gray-800 italic ps-4">Monthly report</span>
                <Dropdown menu={menuProps}>
                    <Button>
                        <Space>
                            {currentYear}
                            <DownOutlined />
                        </Space>
                    </Button>
                </Dropdown>
            </div>
            <div class='w-full bg-white border rounded p-5 text-gray-500 flex flex-col gap-2'>
                {chart === null ? <div class='h-[420px] flex items-center justify-center'><Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} /></div>
                    : chart}
            </div>
        </div>
    )
}
export default MonthlyReport