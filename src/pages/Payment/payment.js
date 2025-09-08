import { useEffect, useRef, useState } from "react";
import { Button, Drawer,Space, Tabs, Tooltip } from "antd";
import { DownloadOutlined, PlusOutlined, SaveOutlined } from '@ant-design/icons';
import { getTabItems } from "../../common/items";
import { firstDateOfMonth,lastDateOfMonth } from "../../common/localDate.js";
import Payments from '../../components/Payment/payments.js'
import Expenses from '../../components/Payment/expenses.js'
import dayjs from 'dayjs';
import ExpensesDetail from "../../components/Payment/expenses_detail.js";
import PaymentsDetail from "../../components/Payment/payments_detail.js";

const Payment = ({ expensesList, userList, saveData, tabActiveKey, setTabActiveKey }) => {
    const ref = useRef();
    const [openExpense, setOpenExpense] = useState(false);
    const [titleExpense, setTitleExpense] = useState('New');
    const [idExpense, setIdExpense] = useState(0);
    const [openPayment, setOpenPayment] = useState(false);
    const [titlePayment, setTitlePayment] = useState('New');
    const [idPayment, setIdPayment] = useState(0);
    const [refresh, setRefresh] = useState(0);

    const [fromDateExpenses, setFromDateExpenses] = useState(dayjs(firstDateOfMonth(new Date())).format("YYYY-MM-DD"));
    const [toDateExpenses, setToDateExpenses] = useState(dayjs(lastDateOfMonth(new Date())).format("YYYY-MM-DD"));

    const [fromDatePayment, setFromDatePayment] = useState(dayjs(firstDateOfMonth(new Date())).format("YYYY-MM-DD"));
    const [toDatePayment, setToDatePayment] = useState(dayjs(lastDateOfMonth(new Date())).format("YYYY-MM-DD"));


    const [expensesData, setExpensesData] = useState([]);
    const [paymentData, setPaymentData] = useState([]);

    useEffect(() => {
        setExpensesData(expensesList.filter(a => a.etype.toUpperCase() === 'EXPENSE' && dayjs(a.trndate).format('YYYY-MM-DD') >= fromDateExpenses && dayjs(a.trndate).format('YYYY-MM-DD') <= toDateExpenses));
        setPaymentData(expensesList.filter(a => a.etype.toUpperCase() === 'PAYMENT' && dayjs(a.trndate).format('YYYY-MM-DD') >= fromDatePayment && dayjs(a.trndate).format('YYYY-MM-DD') <= toDatePayment));
    }, [expensesList, fromDateExpenses, toDateExpenses, fromDatePayment, toDatePayment])

    const btn_Click_Expense = (id) => {
        setTitleExpense(id === 0 ? "New Expense" : "Edit Expense");
        setRefresh(refresh + 1);
        setIdExpense(id);
        setOpenExpense(true);
    }
    const btn_Click_Payment = (id) => {
        setTitlePayment(id === 0 ? "New Payment" : "Edit Payment");
        setRefresh(refresh + 1);
        setIdPayment(id);
        setOpenPayment(true);
    }
    const btnSave = async () => {
        await ref.current?.save();
    }
 
    const tabItems = [
        getTabItems('1', 'Expenses', null, <Expenses key={1} expensesList={expensesData} userList={userList} btn_Click={btn_Click_Expense} fromDate={fromDateExpenses} setFromDate={setFromDateExpenses} toDate={toDateExpenses} setToDate={setToDateExpenses} saveData={saveData} /> ),
        getTabItems('2', 'Payments', null, <Payments key={2} expensesList={paymentData} userList={userList} btn_Click={btn_Click_Payment} fromDate={fromDatePayment} setFromDate={setFromDatePayment} toDate={toDatePayment} setToDate={setToDatePayment} saveData={saveData} /> )
    ];

    return (
        <div class="flex flex-col gap-4 mb-12">

            <div class='flex items-center justify-between'>
                <span class="text-lg font-semibold text-gray-800">Payment</span>
                <div class="flex gap-2">
                    <Button type='default' icon={<DownloadOutlined />} size="large">Export</Button>
                    <Button type="primary" icon={<PlusOutlined />} size="large" onClick={() => btn_Click_Expense(0)}>Create expense</Button>
                    <Button type="primary" icon={<PlusOutlined />} size="large" onClick={() => btn_Click_Payment(0)}>Create payment</Button>
                </div>
            </div>

            <div class='w-full'>
               <Tabs items={tabItems} activeKey={tabActiveKey} onChange={(e) => { setTabActiveKey(e) }} />
            </div>

            <Drawer title={titleExpense} placement='right' width={500} onClose={() => setOpenExpense(false)} open={openExpense}
                extra={<Space><Button type="primary" icon={<SaveOutlined />} onClick={btnSave} >Save</Button></Space>}>

                <ExpensesDetail id={idExpense} refresh={refresh} ref={ref} expensesList={expensesData} saveData={saveData} setOpen={setOpenExpense} />
            </Drawer> 

            <Drawer title={titlePayment} placement='right' width={500} onClose={() => setOpenPayment(false)} open={openPayment}
                extra={<Space><Button type="primary" icon={<SaveOutlined />} onClick={btnSave} >Save</Button></Space>}>

                <PaymentsDetail id={idPayment} refresh={refresh} ref={ref} expensesList={paymentData} userList={userList} saveData={saveData} setOpen={setOpenPayment} />
            </Drawer>

        </div>
    )
}

export default Payment