import React, { useEffect, useState } from "react";
import { Input, Modal, Form, Select, message } from "antd";
import {
  DownloadOutlined,
  ImportOutlined,
  PlusOutlined,
  ReloadOutlined,
  DeleteOutlined,
  EditOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { getAllUser } from "../../../apiService/user.service";
import { createNewLesson } from "../../../apiService/lesson.service";
const ModalCreateNewLesson = (props) => {
  const { openModalCreateLesson, setOpenModalCreateLesson, fetchDataLesson } =
    props;
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [selectedItems, setSelectedItems] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const callAPIAddLesson = async (name, userid) => {
    const res = await createNewLesson(name, userid);
    if (res) {
      message.success("Create new lesson successfull!");
      await fetchDataLesson();
    } else message.error("Create new lesson failed!");
  };
  const handleOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        console.log("Received values:", values); // You can access form values here
        callAPIAddLesson(values.lessonTitle, values.username);
        setOpenModalCreateLesson(false);
        form.resetFields();
      })
      .catch((errorInfo) => {
        console.log("Validation failed:", errorInfo);
      });
  };

  const handleCancel = () => {
    setOpenModalCreateLesson(false);
  };
  const callAPIFetchUser = async () => {
    const res = await getAllUser();
    if (res && res.data) {
      let OPTIONS = res.data.map((item) => {
        const data = {
          fullname: item.fullname,
          id: item.id,
        };
        return data;
      });
      setFilteredOptions(OPTIONS.filter((o) => !selectedItems.includes(o)));
    }
    return null;
  };
  useEffect(() => {
    callAPIFetchUser();
  }, []);
  return (
    <>
      <Modal
        title="Tạo học phần mới"
        open={openModalCreateLesson}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width={600}
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
            rules={[
              {
                required: true,
                message: "Please input lesson title!",
              },
            ]}
            name="lessonTitle"
          >
            <Input
              placeholder={`Nhập tiêu đề, ví dụ "Sinh học - Chương 22 : Tiến hoá"`}
            />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please select user!",
              },
            ]}
            name="username"
          >
            <Select
              mode="single"
              placeholder="Select a username"
              value={selectedItems}
              onChange={setSelectedItems}
              style={{
                width: "100%",
              }}
              options={filteredOptions.map((item) => ({
                value: item.id,
                label: `${item.fullname} (${item.id})`,
              }))}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default ModalCreateNewLesson;
