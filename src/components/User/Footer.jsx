import { Breadcrumb, Layout, Menu, theme } from "antd";
const { Header, Content, Footer, Sider } = Layout;
const FooterComponents = () => {
  return (
    <>
      <Footer
        style={{
          textAlign: "center",
          backgroundColor: "white",
        }}
      >
        Ant Design ©{new Date().getFullYear()} Created by ThucHoang2003
      </Footer>
    </>
  );
};
export default FooterComponents;
