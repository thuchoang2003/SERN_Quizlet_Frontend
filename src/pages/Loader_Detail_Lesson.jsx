import React from "react";
import { Skeleton, Row, Col } from "antd";
import "../assets/scss/Loader_Detail_Lesson.scss";
const Loader_Detail_Lesson = (props) => {
  return (
    <>
      <Row
        gutter={[20, 20]}
        style={{ maxWidth: "1440px", margin: "0 auto", padding: "50px 0px" }}
      >
        <Row style={{ width: "100%" }}>
          <Col span={6} offset={2}>
            <Skeleton.Input active={true} block={true} />
          </Col>
        </Row>
        <Row style={{ width: "100%" }}>
          <Col span={2} offset={2}>
            <Skeleton.Input active={true} block={true} />
          </Col>
          <Col span={2} offset={2}>
            <Skeleton.Input active={true} block={true} />
          </Col>
          <Col span={2} offset={2}>
            <Skeleton.Input active={true} block={true} />
          </Col>
        </Row>
        <Row style={{ width: "100%" }}>
          <Col span={16} offset={2}>
            <Skeleton.Input
              active={true}
              block={true}
              style={{ width: "100%", height: 350 }}
            />
          </Col>
        </Row>
        <Row style={{ width: "100%" }}>
          <Col span={1} offset={2}>
            <Skeleton.Avatar size={"large"} />
          </Col>
          <Col span={2}>
            <Skeleton.Input active={true} block={true} style={{ height: 40 }} />
          </Col>
          <Col span={2} offset={10}>
            <Skeleton.Input active={true} block={true} style={{ height: 40 }} />
          </Col>
        </Row>
        <Row style={{ width: "100%" }}>
          <Col span={8} offset={2}>
            <Skeleton.Input active={true} block={true} style={{ height: 40 }} />
          </Col>
        </Row>
        <Row style={{ width: "100%" }}>
          <Col span={16} offset={2}>
            <Skeleton active={true} />
          </Col>
        </Row>
      </Row>
    </>
  );
};
export default Loader_Detail_Lesson;
