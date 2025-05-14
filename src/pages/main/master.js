import React, { useState } from 'react';
import {
  DesktopOutlined,
  UnorderedListOutlined,
  TagOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Breadcrumb, Col, Layout, Menu, Row, theme } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem('Dashboard', '1', <DesktopOutlined />),
  getItem('Orders', '2', <UnorderedListOutlined />),
  getItem('Promotions', '3', <TagOutlined />),
  getItem('User', '4', <UserOutlined />),
  getItem('Reports', 'sub1', <UserOutlined />, [
    getItem('Sales', '6'),
    getItem('Purchase', '7'),
    getItem('Profit', '8'),
  ]),
  getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  getItem('Files', '9', <FileOutlined />),
];
const MasterPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout style={{ minHeight: '100vh' }} theme="light">
      <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)} theme='light' width={240 } > 
        <Header style={{ padding: 0, background: colorBgContainer }}>
        <Row>
          <Col span={8} align={'middle'} justify={'center'}> 
            <Avatar size={36} style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
          </Col>
          <Col span={16}>Company name</Col>
        </Row>
        </Header>       
        <Menu defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            Bill is a cat.
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
export default MasterPage;