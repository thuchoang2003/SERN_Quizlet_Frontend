import React from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space, message } from "antd";
import "../../../assets/scss/FormAddVocabulary.scss";
import { createMultipleVocabulary } from "../../../apiService/vocabulary.service";

const FormAddMultipleVocabulary = (props) => {
  const { valueDefaultSelect, fetchListVocabulary } = props;
  const onFinish = async (values) => {
    console.log("Received values of form:", values);
    let dataTmp = values.vocabulary.map((item, index) => {
      return {
        value_en: item.value_en,
        value_vi: item.value_vi,
        lessonId: valueDefaultSelect,
      };
    });
    const res = await createMultipleVocabulary(dataTmp);
    if (res) {
      message.success("Create multiple vocabulary successfully!");
      values.vocabulary.forEach((item, index) => {
        console.log(index);
        handleRemove(0);
      });
      fetchListVocabulary(valueDefaultSelect);
    } else message.error("Create multiple vocabulary failed!");
  };
  let removeFunc;

  const handleRemove = (index) => {
    removeFunc(index);
  };
  return (
    <>
      <div className="div-FormAddVocabulary">
        <Form
          name="dynamic_form_nest_item"
          onFinish={onFinish}
          style={{
            maxWidth: "100%",
            padding: 15,
          }}
          autoComplete="off"
          wrapperCol={{
            span: 24,
          }}
        >
          <Form.List
            name="vocabulary"
            {...{
              remove: handleRemove,
            }}
          >
            {(fields, { add, remove }) => {
              removeFunc = remove;
              return (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space
                      key={key}
                      style={{
                        display: "flex",
                        marginBottom: 8,
                      }}
                      align="baseline"
                    >
                      <Form.Item {...restField} name={[name, "value_en"]}>
                        <Input placeholder="Term" size="large" />
                      </Form.Item>
                      <Form.Item {...restField} name={[name, "value_vi"]}>
                        <Input placeholder="Definition" size="large" />
                      </Form.Item>
                      <MinusCircleOutlined
                        onClick={() => {
                          console.log(name);
                          remove(name);
                        }}
                      />
                    </Space>
                  ))}
                  <Form.Item>
                    <Button
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                      style={{
                        width: "100%",
                        height: "40px",
                        fontSize: "20px",
                      }}
                    >
                      Add Card
                    </Button>
                  </Form.Item>
                </>
              );
            }}
          </Form.List>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};
export default FormAddMultipleVocabulary;
