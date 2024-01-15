import { Button, Col, Form, Input, Row, theme } from "antd";
const InputSearchLesson = (props) => {
  const { token } = theme.useToken();
  const [form] = Form.useForm();
  const { handleChangeInputSearch } = props;
  const formStyle = {
    maxWidth: "none",
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    padding: 24,
  };

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    if (values.id === undefined) values.id = "";
    if (values.lesson === undefined) values.lesson = "";
    if (values.username === undefined) values.username = "";
    handleChangeInputSearch(values.id, values.lesson, values.username);
  };
  return (
    <>
      <Form
        form={form}
        name="advanced_search"
        style={formStyle}
        onFinish={onFinish}
      >
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item
              labelCol={{ span: 24 }} //whole column
              name={`id`}
              label={`ID`}
            >
              <Input
                placeholder="ID"
                autoSize={{ minRows: 2, maxRows: 6 }}
                size="large"
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              labelCol={{ span: 24 }} //whole column
              name={`lesson`}
              label={`Lesson Title`}
              autoSize={{ minRows: 2, maxRows: 6 }}
              size="large"
            >
              <Input
                placeholder="Lesson Title"
                autoSize={{ minRows: 2, maxRows: 6 }}
                size="large"
              />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              labelCol={{ span: 24 }} //whole column
              name={`username`}
              label={`Username`}
            >
              <Input
                placeholder="Username"
                autoSize={{ minRows: 2, maxRows: 6 }}
                size="large"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24} style={{ textAlign: "right" }}>
            <Button type="primary" htmlType="submit">
              Search
            </Button>
            <Button
              style={{ margin: "0 8px" }}
              onClick={() => {
                form.resetFields();
                handleChangeInputSearch("", "", "");
              }}
            >
              Clear
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};
export default InputSearchLesson;
