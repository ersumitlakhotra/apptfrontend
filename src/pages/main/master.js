
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

const MasterPage = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState('Dashboard');
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [signout, setSignout] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(true);
  const onSelected = (newContent) => {
    setContent(newContent);
  };

  const onLoadingHandler = (value) => {
    setIsLoading(value);
  };

  let displayedContent;
  if (content === 'Dashboard') {
    displayedContent = <Dashboard setLoading={onLoadingHandler} />;
  } else if (content === 'Tasks') {
    displayedContent = <Tasks setLoading={onLoadingHandler} />;
  } else if (content === 'Order') {
    displayedContent = <Order setLoading={onLoadingHandler} />;
  } else if (content === 'Event') {
    displayedContent = <Event setLoading={onLoadingHandler} />;
  } else if (content === 'Users') {
    displayedContent = <Users setLoading={onLoadingHandler} />;
  } else if (content === 'Services') {
    displayedContent = <Services setLoading={onLoadingHandler} />;
  }

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


  return (
    <div class='h-screen w-full flex flex-row '>
      <Sidebar onSelected={onSelected} open={open} />
      <div class='flex flex-col w-full bg-gray-50 '>
        <header class='h-16 border-b bg-white '>
          <Header onSignout={onSetSignout} open={open} setOpen={setOpen} />
        </header>
        <section class='overflow-y-scroll p-8 w-full'>
          {displayedContent}
        </section>
      </div>
      {/* <div class='h-screen w-screen bg-gray-50 flex flex-row '>
      <Sidebar onSelected={onSelected} open={open} />
      <div class='flex flex-col w-full'>
        <header class='h-16 border-b bg-white '>
          <Header onSignout={onSetSignout} open={open} setOpen={setOpen} />
        </header>
        <section class='overflow-y-scroll p-8 w-full'>
          {displayedContent}
        </section>
      </div>




      <Header onSignout={onSetSignout} />
      <div class='h-screen w-screen bg-gray-50 flex fixed mt-16 '>
        <Sidebar onSelected={onSelected} screen={screenValue} />
        <div class='overflow-y-scroll w-full p-8'>
          {displayedContent}
        </div>
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