/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import { Avatar, Button, DatePicker, Dropdown,  Image, Popover, Space, Tag } from "antd";
import {  UserOutlined, DownOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { Bar, Pie } from '../../components/Sales/graph.js'
import DataTable from "../../common/datatable";
import { getTableItem } from "../../common/items";
import { firstDateOfMonth, lastDateOfMonth } from "../../common/localDate.js";
import dayjs from 'dayjs';
import ExportToExcel from "../../common/export.js";
import { YearsList } from "../../common/yearslist.js";


const Sales = ({ orderList, userList, expensesList, companyList }) => {
    const [barChart, setBarChart] = useState(null);
    const [PieChart, setPieChart] = useState(null);

    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
    const [filteredList, setFilteredList] = useState([]);
    const [Sales_total, setSales_total] = useState(0);
    const [Expense_total, setExpense_total] = useState(0);
    const [Result_total, setResult_total] = useState(0);
    const [exportList, setExportList] = useState([]);
    const [yearList, setYearList] = useState(YearsList(new Date().getFullYear())); 

    const [fromDate, setFromDate] = useState(dayjs(firstDateOfMonth(new Date())).format("YYYY-MM-DD"));
    const [toDate, setToDate] = useState(dayjs(lastDateOfMonth(new Date())).format("YYYY-MM-DD"));
   
    useEffect(() => {
        setYearList(YearsList(new Date(companyList.createdat).getFullYear()));
    }, [companyList])

    useEffect(() => {
        const order = orderList.filter(a => dayjs(a.trndate).format('YYYY-MM-DD') >= fromDate && dayjs(a.trndate).format('YYYY-MM-DD') <= toDate);
        const expense = expensesList.filter(a => dayjs(a.trndate).format('YYYY-MM-DD') >= fromDate && dayjs(a.trndate).format('YYYY-MM-DD') <= toDate && a.etype === 'Expense');
        const payment = expensesList.filter(a => dayjs(a.trndate).format('YYYY-MM-DD') >= fromDate && dayjs(a.trndate).format('YYYY-MM-DD') <= toDate && a.etype === 'Payment');
        setFilteredList([]); setExportList([]);
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
        setExportList(prevArray => [...prevArray, newElement]);
    };

    useEffect(() => {     
        let salesArray = [];
        let expenseArray = [];
        let seriestotalSale = 0; let seriestotalExpense = 0; let seriesProfitLoss = 0;    

            months.map((a,index) => {
                let date = currentYear + '-' + String(index + 1).padStart(2, '0')+'-02T00:00:00';
                let frm = dayjs(firstDateOfMonth(new Date(date))).format("YYYY-MM-DD");
                let to = dayjs(lastDateOfMonth(new Date(date))).format("YYYY-MM-DD");
                let totalSale = 0; let totalExpense = 0;
                 orderList.filter(a => dayjs(a.trndate).format('YYYY-MM-DD') >= frm && dayjs(a.trndate).format('YYYY-MM-DD') <= to).map(b =>{           
                        totalSale += parseFloat(b.total);
                });
                 expensesList.filter(a => dayjs(a.trndate).format('YYYY-MM-DD') >= frm && dayjs(a.trndate).format('YYYY-MM-DD') <= to).map(b =>{
                    totalExpense += parseFloat(b.grossamount);
                });
                salesArray.push(totalSale);
                expenseArray.push(totalExpense);

                seriestotalSale += parseFloat(totalSale);
                seriestotalExpense += parseFloat(totalExpense);

            })
        seriesProfitLoss = parseFloat(seriestotalSale) - parseFloat(seriestotalExpense);
        let isProfitOrLoss='Profit'
        if (seriesProfitLoss < 0)
        {
            seriesProfitLoss = seriesProfitLoss*-1;
            isProfitOrLoss='Loss';
        }

        let seriesArray = [seriestotalSale, seriestotalExpense, seriesProfitLoss];   
        setBarChart(<Bar sales={salesArray} expense={expenseArray} categories={months} />)     
        setPieChart(<Pie series={seriesArray} />)
    }, [currentYear])

    const onYearChanged = e => { setCurrentYear(e.key) };
    const menuProps = { items: yearList, onClick: onYearChanged, };

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
                <ExportToExcel data={exportList} fileName="Sales" servicesList={[]} userList={userList} />
            </div>

            <div class='flex flex-col gap-4 w-full md:flex-row'>

                <div class='flex flex-col gap-4 w-full md:w-1/2 '>
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
                            {barChart}
                        </div>
                    </div>
                    <div class='flex flex-col gap-4 w-full'>  
                        <span class=" text-gray-800 italic ps-4">Annual report </span>                    
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