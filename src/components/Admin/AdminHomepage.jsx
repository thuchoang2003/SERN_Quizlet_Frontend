import { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  DownOutlined,
  AppstoreOutlined,
  SettingOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import "../../assets/scss/Admin.scss";
import { Layout, Menu, Button, theme, Dropdown, Space } from "antd";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";

const { Header, Sider, Content } = Layout;
const AdminHomepage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [activeMenu, setActiveMenu] = useState("dashboard");

  const items = [
    {
      label: "Quản lý tài khoản",
      key: "1",
    },
    {
      label: "Đăng xuất",
      key: "2",
    },
  ];
  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  useEffect(() => {
    if (window.location.pathname.includes("/book"))
      setActiveMenu("managerBook");
    else if (window.location.pathname.includes("/order"))
      setActiveMenu("managerOrder");
    else if (window.location.pathname.includes("/user"))
      setActiveMenu("managerUser");
  }, []);
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed} width={"16%"}>
        <div className="demo-logo-vertical" />
        <div className="sidebar-admin_title">Admin</div>
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[activeMenu]}
          items={[
            getItem(
              <Link to="/admin">Dashboard</Link>,
              "dashboard",
              <HomeOutlined />
            ),
            getItem(
              <Link to="user">Manager User</Link>,
              "managerUser",
              <UserOutlined />
            ),
            getItem(
              <Link to="lesson">Manager Lesson</Link>,
              "managerLesson",
              <AppstoreOutlined />
            ),
            getItem(
              <Link to="vocabulary">Manager Vocabulary</Link>,
              "managerVocabulary",
              <SettingOutlined />
            ),
          ]}
          onClick={(e) => setActiveMenu(e.key)}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            paddingLeft: 30,
            paddingRight: 30,
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: 50,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <Dropdown
            menu={{
              items,
            }}
            placement="topRight"
          >
            <a>
              <Space>
                Welcome, Admin
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </Header>

        <Content
          style={{
            margin: "5px 5px",
            padding: 5,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          {/* <TableUser /> */}
          <Outlet />
        </Content>
        {/* <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©2023 Created by Ant UED
        </Footer> */}
      </Layout>
    </Layout>
  );
};
export default AdminHomepage;
