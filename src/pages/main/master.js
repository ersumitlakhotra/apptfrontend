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
import { apiCalls, loginAuth } from "../../hook/apiCall.js";
import useAlert from "../../common/alert.js";
import { get_Date, LocalDate } from "../../common/localDate.js";
import Sales from "../Sales/sales.js";
import Payment from "../Payment/payment.js";
import { setLocalStorageWithExpiry } from "../../common/localStorage.js";
import Customer from "../Customer/customer.js";
import Schedule from "../Schedule/schedule.js";
import warning from "antd/es/_util/warning.js";
import Collection from "../Collection/collection.js";

const MasterPage = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState('Dashboard');
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [signout, setSignout] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [open, setOpen] = useState(true);
  const { contextHolder, success, error } = useAlert();
  const [uid, setUid] = useState('0');

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
  const [billingList, setBillingList] = useState([]);
  const [customerList, setCustomerList] = useState([]);
  const [scheduleList, setScheduleList] = useState([]);
  const [userPermissionList, setUserPermissionList] = useState([]);

  const [storeName, setStoreName] = useState('');
  const [storeCell, setStoreCell] = useState('');
  const [storeId, setStoreId] = useState('');
  const [emailUser, setEmailUser] = useState('');
  const [emailPass, setEmailPass] = useState('');

  const onSelected = (newContent) => {
    setIsLoading(true);
    setContent(newContent);
    setRefresh(refresh + 1)
    setIsLoading(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
   
    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); 
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      isUserValid();
    }, 7200000); // 7200000  2 hours
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (companyList.length !== 0) {
      setStoreName(companyList.name);
      setStoreCell(companyList.cell);
      setStoreId(companyList.store);
      setEmailUser(companyList.emailuser);
      setEmailPass(companyList.emailpass);
    }

  }, [companyList])

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
    if (!isUserValid() || !companyId) {
      navigate("/");
    }
  }, [navigate, signout]);

  const onSetSignout = () => {
    clearLocalStorage();
    setSignout(true);
  }
  const clearLocalStorage = () => {
    localStorage.removeItem('cid');
    localStorage.removeItem('uid');
    localStorage.removeItem('email');
    localStorage.removeItem('password');
  }

  const getData = async (setList, endPoint, eventDate = false, isLoadingShow = true) => {
    isLoadingShow && setIsLoading(true);
    try {
      const companyId = localStorage.getItem('cid');
      const res = await apiCalls("GET", endPoint, companyId, null, null, eventDate);   
      setList(res.data.data);
    }
    catch (e) {
      setList([])
      //error(error.message)
    }
    isLoadingShow && setIsLoading(false);
  }

  const saveData = async (label, method, endPoint, id = null, body = null, notify = true, logs = true) => {
    setIsLoading(true);
    try {

      const companyId = localStorage.getItem('cid');
      const result = await apiCalls(method, endPoint, companyId, id, body);

      if (result.status === 500 || result.status === 404) {
        notify && error(result.message);      
      }
      else {
        let status = result.status === 201 ? 'Created' : result.status === 200 ? 'Modified' : 'Deleted/Cancelled';
        if (logs) {
          const Log = JSON.stringify({
            ltype: label,
            lid: result.data.data.id,
            lname: '',
            userid: localStorage.getItem('uid'),
            status: status,
            datainfo: [body]
          });

          await apiCalls('POST', 'logs', companyId, null, Log);
        }
        if (label === 'Order' && result.data.data.status !== 'Completed') {
          let order_no = result.data.data.order_no;
          let customerName = result.data.data.name; 
          let customerEmail = result.data.data.email;
          let serviceinfo = result.data.data.serviceinfo;
         let employeeName = '';
          userList.filter(a => a.id === result.data.data.assignedto).map(b =>
            employeeName = b.fullname
          )

          let trndate = result.data.data.trndate;
          let slot = result.data.data.slot;
          let isCancelled = result.data.data.status === 'Cancelled' ? true : false;
          let isEmailSend = sendEmail(companyId, id, order_no, serviceinfo, customerName, customerEmail, employeeName, trndate, slot, isCancelled);
          if (!isEmailSend)
            error('There is some issue while send the email. Please try again later.')
        }

        notify && success(`The ${label} has been ${status} successfully.`);
        setRefresh(refresh + 1)
      }
    }
    catch (e) {
      notify && error(e.message)
    }
    setIsLoading(false);
  }

  const sendEmail = async (cid, id, order_no, servicesItem, customerName, customerEmail, employeeName, trndate, slot, isCancelled) => {
    let isEmailSend = false;
    const Subject = isCancelled ? 'Booking Cancellation' : id === null ? "Booking Confirmation" : "Re-Schedule Confirmation";
    const link = 'https://appointstack.com/book-appointment?store=' + storeId;
    let serviceNames = '';
    servicesList.filter(a => servicesItem.some(b => b === a.id)).map(item =>
      serviceNames += item.name + ', '
    )

    let message = '<p>Hi ' + customerName + '</p>';
    message += `<p>This is a ${isCancelled ? 'cancellation' : 'confirmation'} of your <b>` + serviceNames + ' </b> booking on ' + get_Date(trndate, 'DD MMM YYYY') + ' at ' + slot + '.</p>';
    message += '<p>Your <b>Booking# :</b> ' + order_no + ' and <b>Booked With : </b>' + employeeName + '</p>';
    message += '<p>If you have any questions, please contact the business at ( ' + storeCell + ' )</p>';
    message += '<p>In case for New booking/Rescheduling/Cancellation, please click on this link:</p><a href="' + link + '">' + link + '</a>';

    const Body = JSON.stringify({
      emailUser: emailUser,
      emailPass: emailPass,
      storeName: storeName,
      to: customerEmail,
      subject: Subject,
      message: message,
    });
    try {
      const result = await apiCalls("POST", "sendmail", cid, null, Body);
      if (result.status === 200)
        isEmailSend = true;
    }
    catch (e) {
      isEmailSend = false;
    }

    return isEmailSend;
  }

  const isUserValid =async () => {
    let result = true;
    const now = new Date();
    setUid(localStorage.getItem('uid'));
    const itemString = localStorage.getItem('email');
    if (itemString) {
      const item = JSON.parse(itemString);
      if (now.getTime() > item.expiry) {
        const email = JSON.parse(localStorage.getItem('email')).value;
        const password = JSON.parse(localStorage.getItem('password')).value;
        clearLocalStorage();
        result = await onSubmit(email, password);
      }

      if (!result) {
        onSetSignout();
      }
    }
    else {
      onSetSignout();
    }

    return result;
  };

  const onSubmit = async (email, password) => {
    setIsLoading(true);
    try {
      const res = await loginAuth(email, password);
      if (res.status === 200 && Boolean(res.data.data.active)) {
        setLocalStorageWithExpiry('cid', res.data.data.cid);
        setLocalStorageWithExpiry('uid', res.data.data.id);
        setLocalStorageWithExpiry('email', email, 1);
        setLocalStorageWithExpiry('password', password, 1);
        return true;
      }
      else
        return false;
    }
    catch (err) {
      return false;
    }
    finally {
      setIsLoading(false);
    }
  }


  useEffect(() => {
    switch (content) {
      case "Dashboard":
        {
          getData(setCompanyList, "company");
          getData(setServicesList, "services");
          getData(setUserList, "user");
          getData(setExpenseList, "payment");
          getData(setEventList, "event", true);
          getData(setLogsList, "logs");
          getData(setScheduleList, "schedule");
          getData(setOrderList, "order");
          break;
        }
      case "Order":
        {
          getData(setServicesList, "services");
          getData(setUserList, "user");
          getData(setCompanyList, "company");
          getData(setEventList, "event", true);
          getData(setCustomerList, "customer");
          getData(setLogsList, "logs");
          getData(setOrderList, "order");
          break;
        }
      case 'Tasks':
        {
          getData(setCustomerList, "customer");
          getData(setEventList, "event", true);
          getData(setUserList, "user");
          getData(setServicesList, "services");
          getData(setOrderList, "order");
          getData(setCompanyList, "company");
          break;
        }
      case 'Event':
        {
          getData(setUserList, "user");
          getData(setLogsList, "logs");
          getData(setEventList, "event", true);
          getData(setServicesList, "services");
          break;
        }
      case 'Payment':
        {
          getData(setLogsList, "logs");
          getData(setUserList, "user");
          getData(setExpenseList, "payment");
          break;
        }
      case 'Customers':
        {
          getData(setCustomerList, "customer");
          break;
        }
      case 'Services':
        {
          getData(setUserList, "user");
          getData(setLogsList, "logs");
          getData(setServicesList, "services");
          break;
        }
      case 'Sales':
        {
          getData(setCompanyList, "company");
          getData(setUserList, "user");
          getData(setExpenseList, "payment");
          getData(setOrderList, "order");
          break;
        }
      case 'Collection':
        {
          getData(setOrderList, "order");
          break;
        }
      case 'Users':
        {
          getData(setLogsList, "logs");
          getData(setScheduleList, "schedule");
          getData(setUserPermissionList, "userpermission");
          getData(setUserList, "user");
          break;
        }
      case 'Schedule':
        {
          getData(setLogsList, "logs");
          getData(setScheduleList, "schedule");
          getData(setUserPermissionList, "userpermission");
          getData(setUserList, "user");
          break;
        }
      case 'Setting':
        {
          getData(setCompanyList, "company");
          getData(setLogoList, "logo");
          getData(setBillingList, "billing");
          break;
        }
      default: { break }
    }
  }, [refresh]);

  let displayedContent;
  if (content === 'Dashboard') {
    displayedContent =
      <Dashboard
        orderList={orderList}
        servicesList={servicesList}
        userList={userList}
        expensesList={expenseList}
        eventList={eventList}
        logsList={logsList}
        companyList={companyList}
        scheduleList={scheduleList}
        saveData={saveData}
        onSelected={onSelected}
        refresh={refresh} 
        setFromDate={setFromDate}    
        setToDate={setToDate}
      />;
  } else if (content === 'Tasks') {
    displayedContent =
      <Tasks
        orderList={orderList}
        userList={userList}
        servicesList={servicesList}
        companyList={companyList}
        customerList={customerList}
        eventList={eventList}
        saveData={saveData}
        reload={refresh}
        setReload={setRefresh}
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
        customerList={customerList}
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
        logsList={logsList}
        userList={userList}
        saveData={saveData}
      />;
  } else if (content === 'Payment') {
    displayedContent =
      <Payment
        expensesList={expenseList}
        userList={userList}
        logsList={logsList}
        saveData={saveData}
        tabActiveKey={paymentActiveTab}
        setTabActiveKey={setPaymentActiveTab}
      />;
  } else if (content === 'Customers') {
    displayedContent =
      <Customer
        customerList={customerList}
        setCustomerList={setCustomerList}
        saveData={saveData}
      />;
  } else if (content === 'Services') {
    displayedContent =
      <Services
        servicesList={servicesList}
        logsList={logsList}
        userList={userList}
        setServicesList={setServicesList}
        saveData={saveData}
      />;
  } else if (content === 'Users') {
    displayedContent =
      <Users
        userList={userList}
        userPermissionList={userPermissionList}
        logsList={logsList}
        scheduleList={scheduleList}
        saveData={saveData}
      />;
  } else if (content === 'Schedule') {
    displayedContent =
      <Schedule
        userList={userList}
        scheduleList={scheduleList}
        saveData={saveData}
      />;
  } else if (content === 'Sales') {
    displayedContent =
      <Sales
        orderList={orderList}
        userList={userList}
        expensesList={expenseList}
        companyList={companyList}
      />;
  } else if (content === 'Collection') {
    displayedContent =
      <Collection
      orderList={orderList}     
      />;
  } else if (content === 'Setting') {
    displayedContent =
      <Setting
        companyList={companyList}
        billingList={billingList}
        saveData={saveData}
        setRefresh={setRefresh}
        logoList={logoList}
        tabActiveKey={settingActiveTab}
        setTabActiveKey={setSettingActiveTab}
        onSetSignout={onSetSignout}
      />;
  }

  return (
    <div class='h-screen w-full flex flex-row '>
      <Sidebar onSelected={onSelected} content={content} open={open} uid={uid} getData={getData} />
      <div class='flex flex-col w-full bg-gray-50 '>
        <header class='h-16 border-b bg-white '>
          <Header onSignout={onSetSignout} open={open} setOpen={setOpen} getData={getData} saveData={saveData} refresh={refresh} uid={uid}  />
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