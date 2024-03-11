import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "antd";
import {
  TeamOutlined,
  InboxOutlined,
  StockOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import "../../assets/scss/DashboardAdmin.scss";
import { getAllUser } from "../../apiService/user.service";
import { getAllLessons } from "../../apiService/lesson.service";
import { getAllVocabulary } from "../../apiService/vocabulary.service";
const Dashboard = () => {
  const [userInformation, setUserInformation] = useState();
  const [lessonInformation, setLessonInformation] = useState();
  const [vocabulariesInformation, setVocabulariesInformation] = useState();
  const fetchAPIData = async () => {
    try {
      const [userData, lessonData, vocabularies] = await Promise.all([
        getAllUser(),
        getAllLessons(),
        getAllVocabulary(),
      ]);
      setUserInformation(userData.data);
      setLessonInformation(lessonData);
      setVocabulariesInformation(vocabularies);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchAPIData();
  }, []);
  return (
    <>
      <div className="container-dashboard">
        <Row gutter={16}>
          <Col span={6} offset={2}>
            <Card>
              <div className="div-card">
                <div>
                  <span className="count">{userInformation?.length}</span>
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
                  <span className="count">{lessonInformation?.length}</span>
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
                  <span className="count">
                    {vocabulariesInformation?.length}
                  </span>
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
