import "../assets/scss/LoginPage.scss";
import imageLogin from "../assets/images/imageLogin.png";
import React from "react";
import {
  GoogleOutlined,
  FacebookFilled,
  AppleFilled,
  CloseOutlined,
} from "@ant-design/icons";
import {
  Dropdown,
  Space,
  Row,
  Col,
  Button,
  Input,
  Divider,
  Form,
  message,
} from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createNewUser } from "../apiService/user.service";
import { postLogin } from "../apiService/auth.service";
import { useDispatch } from "react-redux";
import { doLogin } from "../redux/counter/accountSlice";
import { getLesson } from "../redux/counter/lessonSlice";
import { getAllLessonByUserId } from "../apiService/lesson.service";
const Login = (props) => {
  const [openLogin, setOpenLogin] = useState(true);
  const [openRegister, setOpenRegister] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispath = useDispatch();
  const onFinish = async (value) => {
    const { Email, Password } = value;
    const response = await postLogin(Email, Password);
    if (response && response.data) {
      message.success("Đăng nhập thành công !");
      localStorage.setItem("access_token", response.token.access.token);
      localStorage.setItem("refresh_token", response.token.refresh.token);
      dispath(doLogin(response.data));
      const result = await getLessonByUserID(response.data.id);
      dispath(getLesson(result));
      // if (response.data.role === "Admin") navigate("/admin");
      // else navigate("/home");
      navigate("/home");
    } else message.error("Đăng nhập thất bại. Hãy thử lại !");
  };
  const onFinishFailed = (error) => {
    console.log(error);
  };
  const onFinishRegister = async (value) => {
    console.log(value);
    const { email, username, password } = value;
    const role = "User";
    const response = await createNewUser(email, password, username, role);
    if (response && response.data) {
      message.success("Đăng ký tài khoản thành công !");
      setTimeout(() => {
        setOpenLogin(true);
        setOpenRegister(false);
      }, 1000);
    } else if (response.message === "Email is existed!") {
      message.error("Email đã tồn tại. Hãy thử lại !");
    } else message.error("Đăng ký tài khoản thất bại. Hãy thử lại !");
  };
  const onFinishFailedRegister = (error) => {
    console.log(error);
  };

  const getLessonByUserID = async (id) => {
    const result = await getAllLessonByUserId(id);
    if (result && result.data.length > 0) {
      return result.data;
    } else return [];
  };

  return (
    <>
      <div className="login-container">
        <div className="login-left">
          <img src={imageLogin} alt="" />
          <div className="login-left__text">
            <span className="title">Học hiệu quả mà thật thoải mái.</span>
          </div>
          <span className="logo">Quizlet</span>
        </div>
        <div className="login-right">
          {openLogin && (
            <>
              <div className="div-login">
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    icon={<CloseOutlined style={{ fontSize: "20px" }} />}
                    type="text"
                    onClick={() => {
                      navigate("/");
                    }}
                  />
                </div>

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
                        placeholder="Nhập địa chỉ email của bạn"
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
                      <Input.Password
                        placeholder="Nhập địa chỉ mật khẩu của bạn"
                        rules={[
                          {
                            required: true,
                            message: "Hãy nhập mật khẩu",
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
                    <div
                      style={{
                        height: "70px",
                        padding: "0px 30px",
                      }}
                    >
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
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    icon={<CloseOutlined style={{ fontSize: "20px" }} />}
                    type="text"
                    onClick={() => {
                      navigate("/");
                    }}
                  />
                </div>
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
                    <Form.Item
                      label="Email"
                      name="email"
                      rules={[
                        {
                          required: true,
                          message: "Hãy nhập địa chỉ Email",
                        },
                      ]}
                    >
                      <Input
                        placeholder="Nhập địa chỉ Email của bạn"
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
                        type="email"
                      />
                    </Form.Item>
                    <Form.Item
                      label="Tên người dùng"
                      name="username"
                      rules={[
                        {
                          required: true,
                          message: "Hãy nhập tên người dùng",
                        },
                      ]}
                    >
                      <Input
                        placeholder="Nhập tên của bạn"
                        style={{
                          height: "50px",
                          backgroundColor: "#f6f7fb",
                          fontSize: "16px",
                          fontWeight: 700,
                          borderRadius: "10px",
                        }}
                      />
                    </Form.Item>
                    <Form.Item
                      label="Mật khẩu"
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: "Hãy nhập mật khẩu",
                        },
                      ]}
                    >
                      <Input.Password
                        placeholder="Nhập mật khẩu của bạn"
                        // type="password"
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
