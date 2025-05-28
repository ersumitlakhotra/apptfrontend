import { Avatar,  Space , Dropdown} from 'antd';
import ProfileItems from './profilemenu.js';
import { Link } from 'react-router-dom';

const Header = ({onSignout}) => {
  const items=ProfileItems;

  const handleMenuClick = e => {
    switch(e.key)
    {
      case '9': // Sign Out
        {
          localStorage.removeItem('cid');
          onSignout();
          break;
        }
      default:{ console.log('click left button', e.key); break;}
    }
   
  };
  const menuProps = {
    items,
    onClick:handleMenuClick
  };
    return (
        <div class='h-16 border border-gray-300 bg-white flex items-center justify-between px-5 w-full fixed top-0 left-0 overflow-x-hidden'>       
          <Link href="#" class="flex items-center gap-2">
            <img class="w-10 h-10 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="Rounded avatar"/>
            <span class='text-2xl font-semibold text-gray-600 dark:text-white'>{process.env.REACT_APP_PROJECT_NAME}</span>
          </Link>
          <Dropdown menu={menuProps} overlayStyle={{width:'250px',gap:5}}>           
              <Space>
                <Avatar size={40} src={<img src='https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg' alt="Rounded avatar"></img>} />                     
              </Space>
          </Dropdown>
        </div>
    )
}
export default Header;