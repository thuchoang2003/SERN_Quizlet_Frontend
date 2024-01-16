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
import { updateVocabulary } from "../../../apiService/vocabulary.service";
const ModalUpdateVocabulary = (props) => {
  const [form] = Form.useForm();
  const {
    openModalUpdateVocabulary,
    setOpenModalUpdateVocabulary,
    dataUpdateVocabulary,
    valueDefaultSelect,
    fetchListVocabulary,
  } = props;

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [formValues, setFormValues] = useState({});

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const fillDataUpdate = () => {
    if (dataUpdateVocabulary) {
      form.setFieldValue("value_en", dataUpdateVocabulary.value_en);
      form.setFieldValue("value_vi", dataUpdateVocabulary.value_vi);
    }
  };
  useEffect(() => {
    fillDataUpdate();
  }, [dataUpdateVocabulary]);
  const callAPIUpdateVocabulary = async (id, value_en, value_vi, lessonId) => {
    const res = await updateVocabulary(id, value_en, value_vi, lessonId);
    if (res) return res;
  };
  const handleOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        console.log("Received values:", values); // You can access form values here
        setOpenModalUpdateVocabulary(false);
        await callAPIUpdateVocabulary(
          dataUpdateVocabulary.id,
          values.value_en,
          values.value_vi,
          dataUpdateVocabulary.lessonId
        );
        await fetchListVocabulary(valueDefaultSelect);
        notification.success({
          message: "Success",
          description: "Update vocabulary successfully!",
          duration: 5,
        });
      })
      .catch((errorInfo) => {
        console.log("Validation failed:", errorInfo);
      });
  };

  const handleCancel = () => {
    setOpenModalUpdateVocabulary(false);
  };

  return (
    <>
      <Modal
        title="Update information vocabulary"
        open={openModalUpdateVocabulary}
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
            label="Thuật ngữ"
            name="value_en"
            rules={[
              {
                required: true,
                message: "Please input your fullname!",
              },
            ]}
            span={12}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Định nghĩa"
            name="value_vi"
            rules={[
              {
                required: true,
                message: "Please input your role!",
              },
            ]}
            span={12}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default ModalUpdateVocabulary;
