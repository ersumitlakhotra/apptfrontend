import { Avatar, Button, DatePicker, Flex, Image, Popover, Tag } from "antd";
import { DownloadOutlined, UserOutlined } from '@ant-design/icons';

import { useEffect, useState } from "react";
import { Bar, Pie } from '../../components/Sales/graph'
import DataTable from "../../common/datatable";
import { getTableItem } from "../../common/items";

import { firstDateOfMonth, lastDateOfMonth, LocalDate } from "../../common/localDate.js";
import dayjs from 'dayjs';
const Sales = ({ orderList, userList, expensesList }) => {
    const [barChart, setBarChart] = useState(null);
    const [PieChart, setPieChart] = useState(null);
    const [filteredList, setFilteredList] = useState([]);
    const [Sales_total, setSales_total] = useState(0);
    const [Expense_total, setExpense_total] = useState(0);
    const [Result_total, setResult_total] = useState(0);


    const [fromDate, setFromDate] = useState(dayjs(firstDateOfMonth(new Date())).format("YYYY-MM-DD"));
    const [toDate, setToDate] = useState(dayjs(lastDateOfMonth(new Date())).format("YYYY-MM-DD"));

    useEffect(() => {
        const order = orderList.filter(a => dayjs(a.trndate).format('YYYY-MM-DD') >= fromDate && dayjs(a.trndate).format('YYYY-MM-DD') <= toDate);
        const expense = expensesList.filter(a => dayjs(a.trndate).format('YYYY-MM-DD') >= fromDate && dayjs(a.trndate).format('YYYY-MM-DD') <= toDate && a.etype === 'Expense');
        const payment = expensesList.filter(a => dayjs(a.trndate).format('YYYY-MM-DD') >= fromDate && dayjs(a.trndate).format('YYYY-MM-DD') <= toDate && a.etype === 'Payment');
        setFilteredList([]);
        setSales_total(0);
        setExpense_total(0);
        setResult_total(0);
        let sales_total = 0; let expense_total = 0; let result_total = 0;
        userList.map(user => {
            const userSales = order.filter(a => a.assignedto === user.id);
            const userPayments = payment.filter(a => a.assignedto === user.id);
            let totalSale = 0; let totalPayment = 0; let result = 0;
            userSales.map(s => {
                totalSale += parseFloat(s.total);
            })
            userPayments.map(p => {
                totalPayment += parseFloat(p.grossamount);
            })
            result = (totalSale - totalPayment).toFixed(2);

            handleFilteredList({
                key: user.id,
                assignedto: user.id,
                profilepic: user.profilepic,
                fullname: user.fullname,
                sale: totalSale,
                expense: totalPayment,
                result: result
            });
            sales_total += parseFloat(totalSale);
            expense_total += parseFloat(totalPayment);
        })

        let otherExpense = 0;
        expense.map(exp => {
            otherExpense += parseFloat(exp.grossamount);
        })
        handleFilteredList({
            key: 0,
            assignedto: 0,
            profilepic: null,
            fullname: "Other Expenses",
            sale: 0,
            expense: otherExpense,
            result: -otherExpense
        });
        expense_total += parseFloat(otherExpense);

        setSales_total(sales_total.toFixed(2));
        setExpense_total(expense_total.toFixed(2));
        result_total = sales_total - expense_total;
        setResult_total(result_total.toFixed(2))

        handleFilteredList({
            key: -1,
            assignedto: -1,
            profilepic: null,
            fullname: "Total",
            sale: sales_total.toFixed(2),
            expense: expense_total.toFixed(2),
            result: result_total.toFixed(2)
        });
    }, [orderList, fromDate, toDate])

    const handleFilteredList = (newElement) => {
        setFilteredList(prevArray => [...prevArray, newElement]);
    };

    const handleSales_total = (value) => {
        setSales_total(prev => (parseFloat(prev) + parseFloat(value)).toFixed(2));
    };
    const handleExpense_total = (value) => {
        setExpense_total(prev => (parseFloat(prev) + parseFloat(value)).toFixed(2));
    };
    const handleResult_total = (value) => {
        setResult_total(value.toFixed(2));
    };
    const handleResult_total1 = () => {
        let tresult = parseFloat(Sales_total) - parseFloat(Expense_total)
        setResult_total(tresult.toFixed(2));
        handleFilteredList({
            key: -1,
            assignedto: -1,
            profilepic: null,
            fullname: "Total",
            sale: parseFloat(Sales_total).toFixed(2),
            expense: parseFloat(Expense_total).toFixed(2),
            result: tresult.toFixed(2)
        });
    };

    useEffect(() => {
        setBarChart(<Bar />)
        setPieChart(<Pie />)
    }, [])

    const headerItems = [
        getTableItem('1', 'User'),
        getTableItem('2', 'Sales'),
        getTableItem('3', 'Expense'),
        getTableItem('4', 'Amount')
    ];
    return (
        <div class="flex flex-col gap-4 mb-12">

            <div class='flex items-center justify-between'>
                <span class="text-lg font-semibold text-gray-800">Sales Report</span>
                <Button type='default' icon={<DownloadOutlined />} size="large">Export</Button>
            </div>

            <div class='flex flex-col gap-4 w-full md:flex-row'>

                <div class='flex flex-col gap-4 w-full md:w-1/2 '>
                    <div class='flex flex-col gap-4 w-full'>
                        <Flex gap="small" wrap justify="end">
                            <Button color="primary" variant="outlined">
                                Month
                            </Button>
                            <Button color="default" variant="text">
                                Year
                            </Button>
                        </Flex>
                        <div class='w-full bg-white border rounded p-5 text-gray-500 flex flex-col gap-2'>
                            {barChart}
                        </div>
                    </div>
                    <div class='flex flex-col gap-4 w-full'>
                        <Flex gap="small" wrap justify="end">
                            <Button color="primary" variant="outlined">
                                Month
                            </Button>
                            <Button color="default" variant="text">
                                Year
                            </Button>
                        </Flex>
                        <div class='w-full bg-white border rounded p-5 text-gray-500 flex flex-col gap-2'>
                            {PieChart}
                        </div>
                    </div>
                </div>

                <div class='flex flex-col gap-4 w-full bg-white border rounded p-5 text-gray-500 md:w-1/2 '>
                    <div class='flex flex-col md:flex-row md:justify-end gap-4 '>
                        <Popover placement="bottom" title={"Filter by From Date"} content={
                            <div>
                                <DatePicker
                                    style={{ width: '100%' }}
                                    value={fromDate === '' ? fromDate : dayjs(fromDate, 'YYYY-MM-DD')}
                                    onChange={(date, dateString) => setFromDate(dateString)} />
                            </div>
                        }>
                            <Button className="text-xs"><span class='font-medium'>From Date :  </span><span class='text-blue-500'> {fromDate}  </span></Button>
                        </Popover>
                        <Popover placement="bottom" title={"Filter by To Date"} content={
                            <div>
                                <DatePicker
                                    style={{ width: '100%' }}
                                    value={toDate === '' ? toDate : dayjs(toDate, 'YYYY-MM-DD')}
                                    onChange={(date, dateString) => setToDate(dateString)} />
                            </div>
                        }>
                            <Button className="text-xs"><span class='font-medium'>To Date :  </span><span class='text-blue-500'> {toDate}  </span></Button>
                        </Popover>
                    </div>
                    <DataTable headerItems={headerItems} list={filteredList} isFooter={false}
                        body={(
                            filteredList.map(item => (
                                parseInt(item.key) >= 0 ?
                                    <tr key={item.assignedto} class="bg-white border-b text-xs  whitespace-nowrap border-gray-200 hover:bg-zinc-50 ">
                                        <td class="p-3">
                                            <div key={item.assignedto} class='flex flex-row gap-2 items-center'>
                                                {item.profilepic !== null ?
                                                    <Image width={31} height={31} src={item.profilepic} style={{ borderRadius: 15 }} /> :
                                                    <Avatar size={30} style={{ backgroundColor: 'whitesmoke' }} icon={<UserOutlined style={{ color: 'black' }} />} />
                                                }
                                                <p>{item.fullname}</p>
                                            </div>
                                        </td>
                                        <td class="p-3 font-semibold">$ {item.sale}</td>
                                        <td class="p-3 font-semibold">$ {item.expense}</td>
                                        <td class="p-3 ">
                                            <Tag key={item.assignedto}
                                                color={parseFloat(item.result) === 0 ? "" : parseFloat(item.result) > 0 ? "green" : 'red'}
                                                bordered={false}>$ {item.result}</Tag></td>
                                    </tr>
                                    :
                                    <tr key={item.assignedto} class="bg-white border-b-2 border-t-2 text-xs  whitespace-nowrap border-black">                                      
                                        <td class="p-3 font-bold">{item.fullname}</td>
                                        <td class="p-3 font-semibold">$ {item.sale}</td>
                                        <td class="p-3 font-semibold">$ {item.expense}</td>
                                        <td class="p-3 ">
                                            <Tag key={item.assignedto}
                                                color={parseFloat(item.result) === 0 ? "" : parseFloat(item.result) > 0 ? "green" : 'red'}
                                                bordered={false}>$ {item.result}</Tag></td>
                                    </tr>
                            ))
                        )} />
                </div>
            </div>



        </div>
    )
}

export default Sales;