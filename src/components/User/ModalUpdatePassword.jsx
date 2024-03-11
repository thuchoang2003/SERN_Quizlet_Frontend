import React, { useEffect, useState } from "react";
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
// import { updateUser } from "../../apiService/user.service";
import { useDispatch, useSelector } from "react-redux";
// import { doUpdateUsername } from "../../redux/counter/accountSlice";
import { resetPassword } from "../../apiService/auth.service";
const ModalUpdatePassword = (props) => {
  const [form] = Form.useForm();
  const { openModalUpdatePassword, setOpenModalUpdatePassword } = props;
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [formValues, setFormValues] = useState({});
  const userData = useSelector((state) => state.account.user);
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const handleOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        console.log("Received values:", values);
        const { current_password, new_password, confirm_new_password } = values;
        if (new_password !== confirm_new_password) {
          message.error("Mật khẩu mới và mật khẩu xác thực phải trùng nhau !");
          form.resetFields();
        } else {
          await callAPIUpdatePassword(current_password, new_password);
          setOpenModalUpdatePassword(false);
        }
        // await callAPIUpdateUsername(userData.id, values.username); // You can access form values here
        // setOpenModalUpdatePassword(false);
        // dispatch(doUpdateUsername(values.username));
        form.resetFields();
      })
      .catch((errorInfo) => {
        console.log("Validation failed:", errorInfo);
      });
  };
  const callAPIUpdatePassword = async (current_password, new_password) => {
    const response = await resetPassword(current_password, new_password);
    if (response) {
      message.success("Cập nhật tên tài khoản thành công !");
    } else {
      message.error("Cập nhật tên tài khoản thất bại!");
    }
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpenModalUpdatePassword(false);
  };

  return (
    <>
      <Modal
        title="Thay đổi mật khẩu"
        open={openModalUpdatePassword}
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
            label="Mật khẩu hiện tại"
            name="current_password"
            rules={[
              {
                required: true,
                message: "Please input your current password!",
              },
            ]}
          >
            <Input type="password" />
          </Form.Item>
          <Form.Item
            label="Mật khẩu mới"
            name="new_password"
            rules={[
              {
                required: true,
                message: "Please input your new password!",
              },
            ]}
          >
            <Input type="password" />
          </Form.Item>
          <Form.Item
            label="Nhập lại mật khẩu mới"
            name="confirm_new_password"
            rules={[
              {
                required: true,
                message: "Please input your confirm password!",
              },
            ]}
          >
            <Input type="password" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default ModalUpdatePassword;
