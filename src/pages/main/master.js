
import { useState } from "react";
import Header from "../../components/Main/Header/header.js";
import Sidebar from "../../components/Main/Sidebar/sidebar.js";
import Dashboard from '../Dashboard/dashboard.js'
import Order from '../Order/order.js'

const MasterPage = () => {
const [content, setContent] = useState('Dashboard');

  const onSelected = (newContent) => {
    setContent(newContent);
  };

  let displayedContent;
  if (content === 'Dashboard') {
    displayedContent = <Dashboard />;
  } else if (content === 'Order') {
    displayedContent = <Order />;
  }


    return( 
        <div>
            <Header/>
            <div class='h-screen w-screen bg-gray-100 flex fixed mt-16 '>
                <Sidebar onSelected={onSelected} />
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