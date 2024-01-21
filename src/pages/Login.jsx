import "../assets/scss/LoginPage.scss";
import ImageLogin from "../assets/images/ImageLogin.png";
import React from "react";
import { GoogleOutlined, FacebookFilled, AppleFilled } from "@ant-design/icons";
import { Dropdown, Space, Row, Col, Button, Input, Divider, Form } from "antd";
import { useState } from "react";
const Login = (props) => {
  const [openLogin, setOpenLogin] = useState(true);
  const [openRegister, setOpenRegister] = useState(false);
  const [form] = Form.useForm();
  const onFinish = (value) => {
    console.log(value);
  };
  const onFinishFailed = (error) => {
    console.log(error);
  };
  const onFinishRegister = (value) => {
    console.log(value);
  };
  const onFinishFailedRegister = (error) => {
    console.log(error);
  };

  return (
    <>
      <div className="login-container">
        <div className="login-left">
          <img src={ImageLogin} alt="" />
          <div className="login-left__text">
            <span className="title">Học hiệu quả mà thật thoải mái.</span>
          </div>
          <span className="logo">Quizlet</span>
        </div>
        <div className="login-right">
          {openLogin && (
            <>
              <div className="div-login">
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                  }}
                >
                  <Button
                    type="text"
                    style={{
                      width: "160px",
                      height: "45px",
                      fontWeight: 700,
                      fontSize: "23px",
                      color: "#586380",
                    }}
                    onClick={() => {
                      setOpenRegister(true);
                      setOpenLogin(false);
                    }}
                  >
                    Đăng ký
                  </Button>
                  <Button
                    type="text"
                    style={{
                      width: "160px",
                      height: "45px",
                      fontWeight: 700,
                      fontSize: "25px",
                    }}
                    onClick={() => {
                      setOpenRegister(false);
                      setOpenLogin(true);
                    }}
                  >
                    Đăng nhập
                  </Button>
                </div>
                <div className="div-threeBtn">
                  <Button
                    className="item"
                    type="text"
                    icon={<GoogleOutlined style={{ fontSize: "19px" }} />}
                  >
                    Đăng nhập bằng Google
                  </Button>
                  <Button
                    className="item"
                    type="text"
                    icon={<FacebookFilled style={{ fontSize: "19px" }} />}
                  >
                    Đăng nhập bằng Facebook
                  </Button>
                  <Button
                    className="item"
                    type="text"
                    icon={<AppleFilled style={{ fontSize: "19px" }} />}
                  >
                    Đăng nhập bằng Apple
                  </Button>
                </div>
                <div
                  className="divider"
                  style={{ width: "100%", marginTop: "-10px" }}
                >
                  <Divider>Or Email</Divider>
                </div>
                <div className="formInput">
                  <Form
                    name="formLogin"
                    labelCol={{
                      span: 8,
                    }}
                    wrapperCol={{
                      span: 24,
                    }}
                    style={{
                      maxWidth: "100%",
                    }}
                    initialValues={{
                      remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    layout="vertical"
                    // size="large"
                  >
                    <Form.Item label="Email" name="Email">
                      <Input
                        placeholder="Nhập địa chỉ Email của bạn"
                        rules={[
                          {
                            required: true,
                            message: "Hãy nhập địa chỉ Email",
                          },
                        ]}
                        initialValues={{
                          layout: "vertical",
                        }}
                        style={{
                          height: "50px",
                          backgroundColor: "#f6f7fb",
                          fontSize: "16px",
                          fontWeight: 700,
                          borderRadius: "10px",
                        }}
                      />
                    </Form.Item>
                    <Form.Item label="Password" name="Password">
                      <Input
                        placeholder="Nhập địa chỉ  mật khẩu của bạn"
                        rules={[
                          {
                            required: true,
                            message: "Hãy nhập mật khẩu",
                          },
                        ]}
                        type="password"
                        style={{
                          height: "50px",
                          backgroundColor: "#f6f7fb",
                          fontSize: "16px",
                          fontWeight: 700,
                          borderRadius: "10px",
                        }}
                      />
                    </Form.Item>
                    <div style={{ height: "70px", padding: "0px 100px" }}>
                      <span style={{ textAlign: "center", display: "block" }}>
                        Bằng cách nhấp Đăng nhập, bạn chấp nhận{" "}
                        <a href="">Điều khoản dịch vụ</a> Và{" "}
                        <a href="">Chính sách quyền riêng tư</a> của Quizlet
                      </span>
                    </div>
                    <Form.Item>
                      <Button
                        style={{
                          width: "100%",
                          height: "60px",
                          backgroundColor: "#4255ff",
                          color: "white",
                          fontSize: "17px",
                          fontWeight: 600,
                          borderRadius: "10px",
                        }}
                        htmlType="submit"
                      >
                        Đăng nhập
                      </Button>
                    </Form.Item>
                    <Form.Item>
                      <Button
                        style={{
                          width: "100%",
                          height: "55px",
                          color: "#586380",
                          fontSize: "17px",
                          fontWeight: 600,
                          borderRadius: "10px",
                          border: "2px solid #cccc",
                        }}
                        onClick={() => {
                          setOpenLogin(false);
                          setOpenRegister(true);
                        }}
                      >
                        Mới sử dụng Quizlet? Tạo tài khoản ngay
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              </div>
            </>
          )}
          {openRegister && (
            <>
              <div className="div-login">
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                  }}
                >
                  <Button
                    type="text"
                    style={{
                      width: "160px",
                      height: "45px",
                      fontWeight: 700,
                      fontSize: "25px",
                    }}
                    onClick={() => {
                      setOpenRegister(true);
                      setOpenLogin(false);
                    }}
                  >
                    Đăng ký
                  </Button>
                  <Button
                    type="text"
                    style={{
                      width: "160px",
                      height: "45px",
                      fontWeight: 700,
                      fontSize: "23px",
                      color: "#586380",
                    }}
                    onClick={() => {
                      setOpenRegister(false);
                      setOpenLogin(true);
                    }}
                  >
                    Đăng nhập
                  </Button>
                </div>
                <div className="div-threeBtn">
                  <Button
                    className="item"
                    type="text"
                    icon={<GoogleOutlined style={{ fontSize: "19px" }} />}
                  >
                    Đăng nhập bằng Google
                  </Button>
                </div>
                <div
                  className="divider"
                  style={{ width: "100%", marginTop: "-10px" }}
                >
                  <Divider>Or Email</Divider>
                </div>
                <div className="formInput">
                  <Form
                    name="formRegister"
                    labelCol={{
                      span: 8,
                    }}
                    wrapperCol={{
                      span: 24,
                    }}
                    style={{
                      maxWidth: "100%",
                    }}
                    initialValues={{
                      remember: true,
                    }}
                    onFinish={onFinishRegister}
                    onFinishFailed={onFinishFailedRegister}
                    autoComplete="off"
                    layout="vertical"
                    // size="large"
                  >
                    <Form.Item label="Email" name="Email">
                      <Input
                        placeholder="Nhập địa chỉ Email của bạn"
                        rules={[
                          {
                            required: true,
                            message: "Hãy nhập địa chỉ Email",
                          },
                        ]}
                        initialValues={{
                          layout: "vertical",
                        }}
                        style={{
                          height: "50px",
                          backgroundColor: "#f6f7fb",
                          fontSize: "16px",
                          fontWeight: 700,
                          borderRadius: "10px",
                        }}
                      />
                    </Form.Item>
                    <Form.Item label="Tên người dùng" name="username">
                      <Input
                        placeholder="Nhập địa chỉ tên của bạn"
                        rules={[
                          {
                            required: true,
                            message: "Hãy nhập tên người dùng",
                          },
                        ]}
                        style={{
                          height: "50px",
                          backgroundColor: "#f6f7fb",
                          fontSize: "16px",
                          fontWeight: 700,
                          borderRadius: "10px",
                        }}
                      />
                    </Form.Item>
                    <Form.Item label="Mật khẩu" name="password">
                      <Input
                        placeholder="Nhập địa chỉ  mật khẩu của bạn"
                        rules={[
                          {
                            required: true,
                            message: "Hãy nhập mật khẩu",
                          },
                        ]}
                        type="password"
                        style={{
                          height: "50px",
                          backgroundColor: "#f6f7fb",
                          fontSize: "16px",
                          fontWeight: 700,
                          borderRadius: "10px",
                        }}
                      />
                    </Form.Item>
                    <div style={{ height: "70px", padding: "0px 100px" }}>
                      <span style={{ textAlign: "center", display: "block" }}>
                        Bằng cách nhấp Đăng ký, bạn chấp nhận{" "}
                        <a href="">Điều khoản dịch vụ</a> Và{" "}
                        <a href="">Chính sách quyền riêng tư</a> của Quizlet
                      </span>
                    </div>
                    <Form.Item>
                      <Button
                        style={{
                          width: "100%",
                          height: "60px",
                          backgroundColor: "#4255ff",
                          color: "white",
                          fontSize: "17px",
                          fontWeight: 600,
                          borderRadius: "10px",
                        }}
                        htmlType="submit"
                      >
                        Đăng ký
                      </Button>
                    </Form.Item>
                    <Form.Item>
                      <Button
                        style={{
                          width: "100%",
                          height: "55px",
                          color: "#586380",
                          fontSize: "17px",
                          fontWeight: 600,
                          borderRadius: "10px",
                          border: "2px solid #cccc",
                        }}
                        onClick={() => {
                          setOpenLogin(true);
                          setOpenRegister(false);
                        }}
                      >
                        Bạn đã có tài khoản rồi? Đăng nhập ngay
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default Login;
