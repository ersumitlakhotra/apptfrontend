import {
    Routes,
    Route
   } from "react-router-dom";
import Header from "../../components/Main/Header/header.js";
import Sidebar from "../../components/Main/Sidebar/sidebar.js";
import Dashboard from '../Dashboard/dashboard.js'
import Order from '../Order/order.js'

const MasterPage = () => {
    return( 
        <div class='h-full w-screen bg-gray-100 border m-0'>
            <Header/>
            <div class='h-full w-full bg-gray-100 flex fixed mt-16'>
            <Sidebar/>
            <div>Content</div>

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