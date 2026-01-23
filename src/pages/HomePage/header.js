
import Search from '../../common/custom/search'
import logo from '../../Images/logo.png'

import { Space, Dropdown, Drawer,  Badge, Button } from 'antd';
import { BellFilled } from '@ant-design/icons';
import AssignedTo from '../../common/assigned_to';

const Header = () => {
    return (
        <header class="p-2 bg-white border-b shadow-sm flex flex-row gap-2">

            {/* logo */}
            <div class={`w-1/12 md:w-3/12  flex items-center  cursor-pointer`} onClick={() => window.location.reload()} >
                <img class="w-10 h-10 rounded-full bg-white" src={logo} alt="Rounded avatar" />
                <span class={`font-medium font-sans text-primary-500  whitespace-nowrap duration-150 scale-0 md:scale-100`}>{process.env.REACT_APP_PROJECT_NAME}</span>
            </div>

            {/* Search */}
            <div class='w-8/12 md:w-6/12 flex flex-row items-center'>
                <Search />
            </div>  
            
            {/* notification and profile */}
            <div class='w-3/12 pr-4 flex flex-row justify-end items-center'>
                <Badge count={5}>
                    <BellFilled style={{ fontSize: '22px', marginTop: 6, color: 'gray', cursor:'pointer' }} />
                </Badge>
                
            </div>

        </header>
    )
}

export default Header