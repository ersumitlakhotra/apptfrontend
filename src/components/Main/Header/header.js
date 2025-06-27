import { Avatar, Space, Dropdown } from 'antd';
import ProfileItems from './profilemenu.js';

import { MenuUnfoldOutlined } from '@ant-design/icons';

const Header = ({ onSignout, open, setOpen }) => {
  const items = ProfileItems;

  const handleMenuClick = e => {
    switch (e.key) {
      case '9': // Sign Out
        {
          localStorage.removeItem('cid');
          onSignout();
          break;
        }
      default: { console.log('click left button', e.key); break; }
    }

  };
  const menuProps = {
    items,
    onClick: handleMenuClick
  };
  return (
    <div class='flex items-center justify-between p-3 overflow-x-hidden '>
      <MenuUnfoldOutlined className='cursor-pointer' onClick={() => setOpen(!open)} />
      <Dropdown menu={menuProps} overlayStyle={{ width: '250px', gap: 5 }}>
        <Space>
          <Avatar size={40} src={<img src='https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg' alt="Rounded avatar"></img>} />
        </Space>
      </Dropdown>
    </div>
  )
}
export default Header;