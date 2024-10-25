import React from 'react';
import { Layout as AntLayout, Menu, Breadcrumb, theme, Dropdown, Space, Avatar, Typography } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  DashboardOutlined,
  DatabaseOutlined,
  SafetyCertificateOutlined,
  AimOutlined,
  HomeOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  SecurityScanTwoTone
} from '@ant-design/icons';
import './Layout.module.css';

const { Header, Sider, Content } = AntLayout;
const { Title } = Typography;

const navItems = [
  { key: '/', label: 'Dashboard', icon: <DashboardOutlined /> },
  { key: '/schemas', label: 'Schemas', icon: <DatabaseOutlined /> },
  { key: '/rules', label: 'Rules', icon: <SafetyCertificateOutlined /> },
  { key: '/hunts', label: 'Hunts', icon: <AimOutlined /> }
];

const breadcrumbNameMap: Record<string, string> = {
  '/': 'Dashboard',
  '/schemas': 'Schemas',
  '/schemas/editor': 'Create Schema',
  '/rules': 'Rules',
  '/rules/editor': 'Create Rule',
  '/hunts': 'Hunts',
  '/hunts/create': 'Create Hunt',
};

function Layout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = React.useState(false);
  const { token } = theme.useToken();

  const pathSnippets = location.pathname.split('/').filter(i => i);
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    return {
      key: url,
      title: breadcrumbNameMap[url] || pathSnippets[index],
    };
  });

  const breadcrumbItems = [
    {
      key: '/',
      title: <><HomeOutlined /> Home</>,
    },
  ].concat(extraBreadcrumbItems);

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profile',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Account Settings',
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Sign Out',
    },
  ];

  const handleUserMenuClick = ({ key }: { key: string }) => {
    switch (key) {
      case 'profile':
        navigate('/profile');
        break;
      case 'settings':
        navigate('/settings');
        break;
      case 'logout':
        // Handle logout
        break;
    }
  };

  return (
    <AntLayout style={{ minHeight: '100vh' }}>
      <Sider 
        collapsible 
        collapsed={collapsed} 
        onCollapse={setCollapsed}
        theme="light"
        style={{
          backgroundColor: token.colorBgContainer,
          borderRight: `1px solid ${token.colorBorderSecondary}`
        }}
      >
        <div style={{ 
          padding: '16px', 
          textAlign: 'center',
          borderBottom: `1px solid ${token.colorBorderSecondary}`,
          marginBottom: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px'
        }}>
          <SecurityScanTwoTone 
            style={{ 
              fontSize: collapsed ? '24px' : '28px',
              twoToneColor: token.colorPrimary
            }} 
          />
          {!collapsed && (
            <Title level={4} style={{ margin: 0, color: token.colorPrimary }}>
              HyperSec
            </Title>
          )}
        </div>
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={navItems}
          onClick={({ key }) => navigate(key)}
          theme="light"
          style={{
            backgroundColor: 'transparent'
          }}
        />
      </Sider>
      <AntLayout>
        <Header style={{ 
          padding: '0 24px', 
          background: token.colorBgContainer,
          borderBottom: `1px solid ${token.colorBorderSecondary}`,
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center'
        }}>
          <Dropdown 
            menu={{ 
              items: userMenuItems,
              onClick: handleUserMenuClick,
            }} 
            trigger={['click']}
          >
            <Space style={{ cursor: 'pointer' }}>
              <Avatar 
                icon={<UserOutlined />} 
                style={{ 
                  backgroundColor: token.colorPrimary,
                  cursor: 'pointer'
                }} 
              />
            </Space>
          </Dropdown>
        </Header>
        <Content style={{ margin: '24px' }}>
          <Breadcrumb 
            items={breadcrumbItems}
            style={{ marginBottom: '16px' }}
          />
          <div style={{ 
            padding: 24, 
            background: token.colorBgContainer,
            borderRadius: token.borderRadiusLG,
            minHeight: 'calc(100vh - 112px)'
          }}>
            {children}
          </div>
        </Content>
      </AntLayout>
    </AntLayout>
  );
}

export default Layout;