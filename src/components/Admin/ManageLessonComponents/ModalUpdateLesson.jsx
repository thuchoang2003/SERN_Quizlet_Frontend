import React, { useEffect, useState } from "react";
import { Modal, Form, Input, notification, Select } from "antd";
import { getAllUser } from "../../../apiService/user.service";
import { updateALesson } from "../../../apiService/lesson.service";
const ModalUpdateLesson = (props) => {
  const [form] = Form.useForm();
  const {
    openModalUpdateLesson,
    setOpenModalUpdateLesson,
    fetchDataLesson,
    dataUpdateLesson,
  } = props;

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [selectedItems, setSelectedItems] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const fillDataUpdate = async () => {
    console.log(dataUpdateLesson);
    if (dataUpdateLesson) {
      form.setFieldValue("id", dataUpdateLesson.id);
      form.setFieldValue("lessonTitle", dataUpdateLesson.name);
      form.setFieldValue("username", dataUpdateLesson.fullname);
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
    }
  };
  useEffect(() => {
    fillDataUpdate();
  }, [dataUpdateLesson]);
  const callAPIUpdateLesson = async (id, name, userid) => {
    const res = await updateALesson(id, name, userid);
    return res;
  };
  const handleOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        console.log("Received values:", values); // You can access form values here
        // callAPIUpdateLesson;
        console.log(dataUpdateLesson);
        if (values.username == dataUpdateLesson.fullname) {
          console.log("call here");
          await callAPIUpdateLesson(
            values.id,
            values.lessonTitle,
            dataUpdateLesson.userid
          );
        } else
          await callAPIUpdateLesson(
            values.id,
            values.lessonTitle,
            values.username
          );
        setOpenModalUpdateLesson(false);
        fetchDataLesson();
        notification.success({
          message: "Success",
          description: "Update a lesson successfully!",
          duration: 5,
        });
      })
      .catch((errorInfo) => {
        console.log("Validation failed:", errorInfo);
      });
  };

  const handleCancel = () => {
    setOpenModalUpdateLesson(false);
  };

  return (
    <>
      <Modal
        title="Cập nhật người dùng"
        open={openModalUpdateLesson}
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
          initialValues={{
            remember: true,
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
            name="id"
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please input lesson title!",
              },
            ]}
            name="lessonTitle"
          >
            <Input />
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
export default ModalUpdateLesson;
