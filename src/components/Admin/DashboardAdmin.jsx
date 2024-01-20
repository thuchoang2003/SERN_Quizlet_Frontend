import React from "react";
import { Card, Col, Row } from "antd";
import {
  TeamOutlined,
  InboxOutlined,
  StockOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import "../../assets/scss/DashboardAdmin.scss";
const Dashboard = () => {
  return (
    <>
      <div className="container-dashboard">
        <Row gutter={16}>
          <Col span={6} offset={2}>
            <Card>
              <div className="div-card">
                <div>
                  <span className="count">100</span>
                  <span className="tag">Users</span>
                </div>

                <TeamOutlined style={{ fontSize: "50px", color: "#fa556f" }} />
              </div>
            </Card>
          </Col>
          <Col span={6} offset={1}>
            <Card>
              <div className="div-card">
                <div>
                  <span className="count">100</span>
                  <span className="tag">Lessons</span>
                </div>
                <StockOutlined style={{ fontSize: "50px", color: "#fa556f" }} />
              </div>
            </Card>
          </Col>
          <Col span={6} offset={1}>
            <Card>
              <div className="div-card">
                <div>
                  <span className="count">100</span>
                  <span className="tag">Vocabularies</span>
                </div>
                <HeartOutlined style={{ fontSize: "50px", color: "#fa556f" }} />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};
export default Dashboard;
