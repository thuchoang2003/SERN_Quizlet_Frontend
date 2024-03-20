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
import { updateUser } from "../../apiService/user.service";
import { useDispatch, useSelector } from "react-redux";
import { doUpdateUsername } from "../../redux/counter/accountSlice";
const ModalChangeUsername = (props) => {
  const [form] = Form.useForm();
  const { openModalChangeUsername, setOpenModalChangeUsername, valueUsername } =
    props;
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [formValues, setFormValues] = useState({});
  const userData = useSelector((state) => state.account.user);
  const dispatch = useDispatch();
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const handleOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        await callAPIUpdateUsername(userData.id, values.username); // You can access form values here
        setOpenModalChangeUsername(false);
        dispatch(doUpdateUsername(values.username));
        form.resetFields();
      })
      .catch((errorInfo) => {
        console.log("Validation failed:", errorInfo);
      });
  };
  const callAPIUpdateUsername = async (id, fullname) => {
    const response = await updateUser(id, fullname);
    if (response) {
      message.success("Cập nhật tên tài khoản thành công !");
    }
  };
  const fillDataUpdate = () => {
    if (valueUsername) {
      form.setFieldValue("username", valueUsername);
    }
  };

  const handleCancel = () => {
    setOpenModalChangeUsername(false);
  };
  useEffect(() => {
    fillDataUpdate();
  }, []);

  return (
    <>
      <Modal
        title="Chỉnh sửa tên người dùng"
        open={openModalChangeUsername}
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
            label="Tên tài khoản"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
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
export default ModalChangeUsername;
