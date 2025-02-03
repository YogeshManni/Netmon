import React from 'react';
import { Layout, Menu, ConfigProvider, theme } from 'antd';
import Dashboard from '../pages/Dashboard';

const { Header, Content, Footer, Sider } = Layout;

const App: React.FC = () => {
  return (
    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>  {/* 👈 Ant Design dark theme */}
      <Layout className="min-h-screen bg-gray-900">  {/* Tailwind dark bg */}
        <Sider 
          collapsible 
          theme="dark" 
          width={250}
          className="!bg-gray-800"  // Custom dark sider
        >
          <div className="p-4 text-white text-xl font-bold">NetMonitor</div>
          <Menu 
            theme="dark" 
            defaultSelectedKeys={['dashboard']} 
            mode="inline"
            className="bg-gray-800"  // Custom dark menu
          >
            <Menu.Item key="dashboard">Dashboard</Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header className="bg-gray-800 shadow-sm p-4 h-auto">
            <h1 className="text-2xl text-white">Network Monitoring & Operations</h1>
          </Header>
          <Content className="p-6 bg-gray-900">  {/* Tailwind dark bg */}
            <Dashboard />
          </Content>
          <Footer className="text-center bg-gray-800 text-gray-300">
            NetMonitor 2025
          </Footer>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default App;