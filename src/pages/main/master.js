
import { useState,useEffect } from "react";
import Header from "../../components/Main/Header/header.js";
import Sidebar from "../../components/Main/Sidebar/sidebar.js";
import Dashboard from '../Dashboard/dashboard.js'
import Order from '../Order/order.js'
import Users from "../Users/users.js";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';

const MasterPage = () => {
const navigate = useNavigate();
const [content, setContent] = useState('Dashboard');
const [screenWidth, setScreenWidth] = useState(window.innerWidth);
const [screenValue, setScreenValue] = useState('');
const [signout, setSignout] = useState(false);
const [isLoading, setIsLoading] = useState(false);

  const onSelected = (newContent) => {
    setContent(newContent);
  };

  const onLoadingHandler = (value) =>{
    setIsLoading(value);
  };

  let displayedContent;
  if (content === 'Dashboard') {
    displayedContent = <Dashboard />;
  } else if (content === 'Order') {
    displayedContent = <Order />;
  }else if (content === 'Users') {
    displayedContent = <Users setLoading={onLoadingHandler} />;
  }

useEffect (() => {
  const handleResize = () => {
    setScreenWidth (window.innerWidth);
  };

  window.addEventListener ('resize', handleResize);

  // Clean up the event listener on component unmount
  return () => {
    window.removeEventListener ('resize', handleResize);
  };
}, []);

useEffect (
  () => {
    // Update myValue based on screenWidth
    if (screenWidth < 768) {
      setScreenValue ('sm');
    } else if (screenWidth >= 768 && screenWidth < 1200) {
      setScreenValue ('md');
    } else {
      setScreenValue ('lg');
    }
  },
  [screenWidth]
);

useEffect(() => {
  const companyId = localStorage.getItem('cid');
  if (!companyId) {
    navigate("/"); 
  }
},[navigate, signout]);

const onSetSignout=()=>
{
  setSignout(true);
}


    return( 
        <div>
            <Header onSignout={onSetSignout}/>
            <div class='h-screen w-screen bg-gray-100 flex fixed mt-16 '>
                <Sidebar onSelected={onSelected} screen={screenValue} />
               <div class='overflow-y-scroll w-full p-4'>{displayedContent}</div> 
            </div>
            

          {/*  <div>
                <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/order" element={<Order />} />
                </Routes>
            </div>
            */}
            {isLoading && (
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
      )}
       
        </div>
    )
}

export default MasterPage