import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  // UploadOutlined,
  FileAddOutlined,
  UserOutlined,
  UsergroupAddOutlined,
  // VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { BrowserRouter,NavLink,Route,Routes,useNavigate,Navigate } from 'react-router-dom'
import { UIContext } from '../context/UIContext';
import { CreateTicket } from './CreateTicket';
import { Desktop } from './Desktop';
import { GetInto } from './GetInto';
import { Queue } from './Queue';


const { Header, Sider, Content } = Layout;

export const RouterPage = () => {
  const [collapsed, setCollapsed] = useState(false);

  const navitate = useNavigate()

  const { isHideMenu } = useContext(UIContext)

  return (
      <Layout style={ { height:'100vh' } }>
        <Sider trigger={null} collapsible collapsed={collapsed} breakpoint='md'
        hidden={isHideMenu}

        onBreakpoint={broken => {
          setCollapsed(broken)
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        >
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            items={[
              {
                key: '1',
                icon: <UserOutlined />,
                label: 'Ingresar',
                
                onClick:()=>{
                  navitate('/ingresar')
                }
              },
              {
                key: '2',
                // icon: <VideoCameraOutlined />,
                icon: <UsergroupAddOutlined />,
                label: 'Cola de tickets',
                onClick:()=>{
                  navitate('/cola')
                }
              },
              {
                key: '3',
                // icon: <UploadOutlined />,
                icon: <FileAddOutlined />,
                label: 'Crear ticket',
                onClick:()=>{
                  navitate('/crear')
                }
              },
            ]}
          />
            
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed),
            })}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            <Routes>
              <Route path='/ingresar' element={<GetInto />} />
              <Route path='/cola' element={<Queue />} />
              <Route path='/crear' element={<CreateTicket />} />
              <Route path='/escritorio' element={<Desktop />} />
              <Route path='/*' element={<Navigate to={'/ingresar'} />} />
              <Route  />
            </Routes>
          </Content>
        </Layout>
      </Layout>
  );
}
