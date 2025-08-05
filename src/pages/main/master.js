
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
 


  const [orderList, setOrderList] = useState([]);
  const [eventList, setEventList] = useState([]);
  const [companyList, setCompanyList] = useState([]);
  const [servicesList, setServicesList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [logoList, setLogoList] = useState([]);

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

  const getData = async (setList, method, endPoint, id = null, body = null) => {
    setIsLoading(true);
    try {
      const res = await apiCalls(method, endPoint, id, body);
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
      if (result.status === 201)
        success(`The ${label} has been successfully created.`);
      if (result.status === 200)
        success(`The ${label} has been modified successfully.`);
     // console.log(result)
      if (result.status === 201 || result.status === 200)
        setRefresh(refresh + 1)
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
          getData(setOrderList, "GET", "order");
          getData(setServicesList, "GET", "services");
          getData(setUserList, "GET", "user");
          break;
        } 
        case "Order":
        {
          getData(setOrderList, "GET", "order");
          getData(setServicesList, "GET", "services");
          getData(setUserList, "GET", "user");
          getData(setCompanyList, "GET", "company");
          //getData(setServicesList, "GET", "services");
          break;
        }
      case 'Tasks':
        {
          getData(setUserList, "GET", "user");
          getData(setServicesList, "GET", "services");
          getData(setOrderList, "GET", "order");
          getData(setCompanyList, "GET", "company");
          break;
        }
      case 'Event':
        {
          getData(setEventList, "GET", "event");
          getData(setServicesList, "GET", "services");
          break;
        }
      case 'Services':
        {
          getData(setServicesList, "GET", "services");
          break;
        }
      case 'Users':
        {
          getData(setUserList, "GET", "user");
          break;
        }
      case 'Setting':
        {
          getData(setCompanyList, "GET", "company");
          getLogo("GET", "logo");
          break;
        }
      default: { break }
    }

  },
    [refresh]);

  let displayedContent;
  if (content === 'Dashboard') {
    displayedContent = <Dashboard orderList={orderList} servicesList={servicesList} userList={userList} />;
  } else if (content === 'Tasks') {
    displayedContent = <Tasks orderList={orderList} userList={userList} servicesList={servicesList} companyList={companyList} />;
  } else if (content === 'Order') {
    displayedContent = <Order orderList={orderList} servicesList={servicesList} userList={userList} companyList={companyList} saveData={saveData} />;
  } else if (content === 'Event') {
    displayedContent = <Event eventList={eventList} servicesList={servicesList} saveData={saveData} />;
  } else if (content === 'Services') {
    displayedContent = <Services servicesList={servicesList} setServicesList={setServicesList} saveData={saveData} />;
  } else if (content === 'Users') {
    displayedContent = <Users userList={userList} saveData={saveData} />;
  } else if (content === 'Setting') {
    displayedContent = <Setting companyList={companyList} saveData={saveData} setRefresh={setRefresh} logoList={logoList} tabActiveKey={settingActiveTab} setTabActiveKey={setSettingActiveTab} />;
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