
import { useState,useEffect } from "react";
import Header from "../../components/Main/Header/header.js";
import Sidebar from "../../components/Main/Sidebar/sidebar.js";
import Dashboard from '../Dashboard/dashboard.js'
import Order from '../Order/order.js'

const MasterPage = () => {
const [content, setContent] = useState('Dashboard');
const [screenWidth, setScreenWidth] = useState (window.innerWidth);
const [screenValue, setScreenValue] = useState ('');

  const onSelected = (newContent) => {
    setContent(newContent);
  };

  let displayedContent;
  if (content === 'Dashboard') {
    displayedContent = <Dashboard />;
  } else if (content === 'Order') {
    displayedContent = <Order />;
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

    return( 
        <div>
            <Header/>
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
       
        </div>
    )
}

export default MasterPage