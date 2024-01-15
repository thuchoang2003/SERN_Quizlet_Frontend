import React, { useState } from "react";
import {
  Modal,
  Button,
  Checkbox,
  Form,
  Input,
  notification,
  message,
} from "antd";
// import { postNewUser } from "../../apiService/apiServices.js";
import { createNewUser } from "../../../apiService/user.service";
const ModalCreateUser = (props) => {
  const [form] = Form.useForm();
  const { open, setOpenModalCreateUser, fetchDataUser } = props;
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [formValues, setFormValues] = useState({});
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const callAPIAddUser = async (fullName, password, email, role) => {
    let response = await createNewUser(email, password, fullName, role);
    if (response && response.data) {
      message.success("Create new user successfull!");
      await fetchDataUser();
    } else {
      console.log(response.message);
    }
  };
  const handleOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        console.log("Received values:", values); // You can access form values here
        await callAPIAddUser(
          values.fullname,
          values.password,
          values.email,
          values.role
        );
        setOpenModalCreateUser(false);
        form.resetFields();
      })
      .catch((errorInfo) => {
        console.log("Validation failed:", errorInfo);
      });
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpenModalCreateUser(false);
  };

  return (
    <>
      <Modal
        title="Tạo tài khoản người dùng mới"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 24,
          }}
          style={{
            maxWidth: 600,
          }}
          onFinish={(values) => {
            setFormValues(values); // Update the state with form values
          }}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
          size="large"
        >
          <Form.Item
            label="Fullname"
            name="fullname"
            rules={[
              {
                required: true,
                message: "Please input your fullname!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Role"
            name="role"
            rules={[
              {
                required: true,
                message: "Please input your role!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default ModalCreateUser;
