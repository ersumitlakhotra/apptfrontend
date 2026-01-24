
import Search from '../../common/custom/search'
import logo from '../../Images/logo.png'

import {  Badge } from 'antd';
import { BellFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Header = () => {
    const navigate = useNavigate();
    const [search,setSearch]=useState('');
    return (
        <header class="p-2 bg-blue-500 border-b shadow-sm flex flex-row gap-2 sticky  z-50 top-0">

            {/* logo */}
            <div class={`w-1/12 md:w-3/12  flex items-center gap-2  cursor-pointer`} onClick={() => navigate("/home")} >
                <img class="w-10 h-10 rounded-full bg-white" src={logo} alt="Rounded avatar" />
                <span class={`font-medium font-sans text-white text-lg whitespace-nowrap duration-150 scale-0 md:scale-100`}>{process.env.REACT_APP_PROJECT_NAME}</span>
            </div>

            {/* Search */}
            <div class='w-8/12 md:w-6/12 flex flex-row items-center'>
                <Search value={search} onChange={setSearch} />
            </div>  
            
            {/* notification and profile */}
            <div class='w-3/12 pr-4 flex flex-row justify-end items-center'>
                <Badge count={5}>
                    <BellFilled style={{ fontSize: '22px', marginTop: 6, color: 'white', cursor:'pointer' }} />
                </Badge>
                
            </div>

        </header>
    )
}

export default Header