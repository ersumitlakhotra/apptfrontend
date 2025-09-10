/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect } from "react";
import Header from "../../components/Main/Header/header.js";
import Sidebar from "../../components/Main/Sidebar/sidebar.js";
import Dashboard from '../Dashboard/dashboard.js'
import Order from '../Order/order.js'
import Users from "../Users/users.js";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import Services from "../Services/services.js";
import Event from "../Event/event.js";
import Tasks from "../Tasks/tasks.js";
import Setting from "../Setting/setting.js";
import { apiCalls } from "../../hook/apiCall.js";
import useAlert from "../../common/alert.js";
import { LocalDate } from "../../common/localDate.js";
import Sales from "../Sales/sales.js";
import Expenses from "../Expense/expense.js";
import Payment from "../Payment/payment.js";

const MasterPage = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState('Dashboard');
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [signout, setSignout] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [open, setOpen] = useState(true);
  const {contextHolder, success, error } = useAlert();

  const [settingActiveTab, setSettingActiveTab] = useState('1');
  const [paymentActiveTab, setPaymentActiveTab] = useState('1');

  const [fromDate, setFromDate] = useState(LocalDate());
  const [toDate, setToDate] = useState(LocalDate());

  const [orderList, setOrderList] = useState([]);
  const [eventList, setEventList] = useState([]);
  const [companyList, setCompanyList] = useState([]);
  const [servicesList, setServicesList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [logoList, setLogoList] = useState([]);
  const [expenseList, setExpenseList] = useState([]);
  const [logsList, setLogsList] = useState([]);

  const onSelected = (newContent) => {
    setIsLoading(true);
    setContent(newContent);
    setRefresh(refresh+1)
    setIsLoading(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    setRefresh(refresh + 1);
    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(
    () => {
      // Update myValue based on screenWidth
      if (screenWidth < 768) {
        setOpen(false)
      } else if (screenWidth >= 768 && screenWidth < 1200) {
        setOpen(false)
      } else {
        setOpen(true)
      }
    },
    [screenWidth]
  );

  useEffect(() => {
    const companyId = localStorage.getItem('cid');
    if (!companyId) {
      navigate("/");
      console.log("ref")
    }
  }, [navigate, signout]);

  const onSetSignout = () => {
    setSignout(true);
  }

  const getLogo = async ( method, endPoint, id = null, body = null) => {
    setIsLoading(true);
    try {
      const res = await apiCalls(method, endPoint, id, body);
      if (res.data.status === 200)
        setLogoList(res.data.data);
    else
        setLogoList([]);
    }
    catch (e) {
      setLogoList([]);
    }
    setIsLoading(false);
  }

  const getData = async (setList, endPoint, eventDate=false) => {
    setIsLoading(true);
    try {
      const res = await apiCalls("GET", endPoint,null,null,eventDate);
      setList(res.data.data);
    }
    catch (e) {
      setList([])
      //error(error.message)
    }
    setIsLoading(false);
  } 
  
  const saveData = async (label, method, endPoint, id = null, body = null) => {
    setIsLoading(true);
    try {
      const result = await apiCalls(method, endPoint, id, body);

      if (result.status === 500 || result.status === 404)
        error(result.message);
      else {
        let status = result.status === 201 ? 'Created' : result.status === 200 ? 'Modified' : 'Deleted'
        const Log = JSON.stringify({
          ltype: label,
          lid: result.data.data.id,
          lname: '',
          userid: localStorage.getItem('uid'),
          status: status,
          datainfo: [body] 
        });
        await apiCalls('POST', 'logs', null, Log);
        success(`The ${label} has been ${status} successfully.`);
        setRefresh(refresh + 1)
      }

    }
    catch (e) {
      error(error.message)
    }  
    setIsLoading(false);
  }
  useEffect(() => {
    switch (content) {
      case "Dashboard":
        {
          getData(setServicesList,"services");
          getData(setUserList,"user");
          getData(setExpenseList,"payment");
          getData(setEventList,"event",true);
          getData(setOrderList,"order");
          break;
        } 
        case "Order":
        {
          getData(setServicesList,"services");
          getData(setUserList,"user");
          getData(setCompanyList,"company");
          getData(setEventList,"event", true);
          getData(setLogsList,"logs");
          getData(setOrderList,"order");
          //getData(setServicesList, "services");
          break;
        }
      case 'Tasks':
        {
          getData(setUserList,"user");
          getData(setServicesList,"services");
          getData(setOrderList,"order");
          getData(setCompanyList,"company");
          break;
        }
      case 'Event':
        {
          getData(setEventList,"event", true);
          getData(setServicesList, "services");
          break;
        }
      case 'Payment':
        {
          getData(setUserList,"user");
          getData(setExpenseList,"payment");
          break;
        }
      case 'Services':
        {
          getData(setServicesList,"services");
          break;
        }
      case 'Sales':
        {     
          getData(setUserList,"user");  
          getData(setExpenseList,"payment");
          getData(setOrderList,"order");
          break;
        }
      case 'Expenses':
        {
          getData(setUserList,"user"); 
          getData(setExpenseList,"payment");
          break;
        }
      case 'Users':
        {
          getData(setUserList,"user");
          break;
        }
      case 'Setting':
        {
          getData(setCompanyList,"company");
          getLogo("GET", "logo");
          break;
        }
      default: { break }
    }
  },[refresh]);

  let displayedContent;
  if (content === 'Dashboard') {
    displayedContent =
      <Dashboard
        orderList={orderList}
        servicesList={servicesList}
        userList={userList}
        expensesList={expenseList}
        eventList={eventList}
        onSelected={onSelected}
        refresh={refresh}
      />;
  } else if (content === 'Tasks') {
    displayedContent =
      <Tasks
        orderList={orderList}
        userList={userList}
        servicesList={servicesList}
        companyList={companyList}
        screenWidth={500}
      />;
  } else if (content === 'Order') {
    displayedContent =
      <Order
        orderList={orderList}
        servicesList={servicesList}
        userList={userList}
        companyList={companyList}
        eventList={eventList}
        logsList={logsList}
        saveData={saveData}
        fromDate={fromDate}
        setFromDate={setFromDate}
        toDate={toDate}
        setToDate={setToDate}
      />;
  } else if (content === 'Event') {
    displayedContent =
      <Event
        eventList={eventList}
        servicesList={servicesList}
        saveData={saveData}
      />;
  } else if (content === 'Payment') {
    displayedContent =
      <Payment
        expensesList={expenseList}
        userList={userList}
        saveData={saveData}
        tabActiveKey={paymentActiveTab}
        setTabActiveKey={setPaymentActiveTab}
      />;
  } else if (content === 'Services') {
    displayedContent =
      <Services
        servicesList={servicesList}
        setServicesList={setServicesList}
        saveData={saveData}
      />;
  } else if (content === 'Users') {
    displayedContent =
      <Users
        userList={userList}
        saveData={saveData}
      />;
  } else if (content === 'Sales') {
    displayedContent =
      <Sales
        orderList={orderList}
        userList={userList}
        expensesList={expenseList}
      />;
  } else if (content === 'Expenses') {
    displayedContent =
      <Expenses
        expensesList={expenseList}
        userList={userList}
        saveData={saveData}
      />;
  } else if (content === 'Setting') {
    displayedContent =
      <Setting
        companyList={companyList}
        saveData={saveData}
        setRefresh={setRefresh}
        logoList={logoList}
        tabActiveKey={settingActiveTab}
        setTabActiveKey={setSettingActiveTab}
      />;
  }

  return (
    <div class='h-screen w-full flex flex-row '>
      <Sidebar onSelected={onSelected} content={content} open={open} />
      <div class='flex flex-col w-full bg-gray-50 '>
        <header class='h-16 border-b bg-white '>
          <Header onSignout={onSetSignout} open={open} setOpen={setOpen} />
        </header>
        <section class='overflow-y-scroll p-8 w-full'>
          {isLoading ? (
            <div
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 9999, // Ensure it's on top
              }}
            >
              <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
            </div>
          ) :
            displayedContent
          }
        </section>
      </div>
      {contextHolder}
    </div>
  )
}

export default MasterPage