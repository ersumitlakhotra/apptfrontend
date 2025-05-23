import { Avatar,  Space , Dropdown} from 'antd';
import ProfileItems from './profilemenu.js';
import { Link } from 'react-router-dom';

const Header = () => {
  const items=ProfileItems;
    return (
        <div class='h-16 border border-gray-300 bg-white flex items-center justify-between px-5 w-full fixed top-0 left-0 overflow-x-hidden'>       
            <img class="w-10 h-10 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="Rounded avatar"/>
            <Dropdown menu={{ items }} overlayStyle={{width:'250px',gap:5}}>
                <Link onClick={e => e.preventDefault()}>
                <Space>
                        <Avatar size={40} src={<img src='https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg' alt="Rounded avatar"></img>} />
                </Space>
                  </Link>
            </Dropdown>
        </div>
    )
}
export default Header;