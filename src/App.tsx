/* eslint-disable @typescript-eslint/no-unused-vars */
import { Layout, Menu, Typography, theme } from "antd";
import React from "react";
import { Outlet } from "react-router-dom";
import { navItems } from "./constant";

const { Header, Content, Sider } = Layout;

const App: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        breakpoint='lg'
        collapsedWidth='0'
        onBreakpoint={(_broken) => {
          //console.log(broken);
        }}
        onCollapse={(_collapsed, _type) => {
          //console.log(collapsed, type);
        }}
      >
        <div className='demo-logo-vertical' />
        <Menu theme='dark' mode='inline' defaultSelectedKeys={["1"]} items={navItems} />
      </Sider>
      <Layout>
        <Header
          style={{
            background: colorBgContainer,
            display: "flex",
            alignItems: "center",
            width: "100%",
          }}
          className='header'
        >
          <Typography.Title className='title' level={3}>
            Product Management System
          </Typography.Title>
        </Header>
        <Content style={{ margin: "24px 16px 0", overflow: "hidden" }}>
          <div
            style={{
              padding: 24,
              height: "100%",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              overflowX: "auto",
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
