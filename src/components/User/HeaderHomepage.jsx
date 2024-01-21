import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  DownOutlined,
  SmileOutlined,
  SearchOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Dropdown, Space, Row, Col, Button, Input } from "antd";
import "../../assets/scss/HeaderHomepage.scss";

const HeaderHomepage = (props) => {
  const navigate = useNavigate();
  const itemsDropdownTest = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          //       href="https://www.antgroup.com"
        >
          Bài Thi Toeic
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          //       href="https://www.aliyun.com"
        >
          Bài Thi IELTS
        </a>
      ),
    },
  ];

  return (
    <>
      <div className="header_Container">
        <Row gutter={16} style={{ width: "100%" }}>
          <Col className="gutter-row" span={9}>
            <div className="header_Container--left">
              <div className="logo">
                <a href="#">Quizlet</a>
              </div>
              <div className="divTwo">
                <>
                  <Dropdown
                    menu={{ items: itemsDropdownTest }}
                    placement="bottom"
                    arrow={{
                      pointAtCenter: true,
                    }}
                  >
                    <a onClick={(e) => e.preventDefault()}>
                      <span className="title">Thư viện của bạn</span>
                      <DownOutlined style={{ color: "black" }} />
                    </a>
                  </Dropdown>
                </>
              </div>
              <div className="divThree">
                <a href="">Lời giải chuyên gia</a>
              </div>
            </div>
          </Col>
          <Col className="gutter-row" span={9}>
            <div className="header_Container--middle">
              <div className="div-iconSearch">
                <SearchOutlined />
              </div>
              <div className="div-InputSearch">
                <Input
                  placeholder="Hỏi Quizlet bất cứ điều gì"
                  variant="filled"
                  autocomplete="off"
                  style={{
                    height: "100%",
                    padding: "0px 30px",
                    borderRadius: "20px",
                    backgroundColor: "#f6f7fb",
                    fontSize: "17px",
                    fontWeight: "500",
                  }}
                ></Input>
              </div>
            </div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div className="header_Container--right">
              <Button
                type="primary"
                icon={<PlusOutlined />}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  fontSize: "20px",
                }}
              />
              <Button
                style={{
                  width: "fit-content",
                  height: "40px",
                  borderRadius: "10px",
                  fontWeight: 500,
                  fontSize: "15px",
                }}
                onClick={() => {
                  navigate("/login");
                }}
              >
                Đăng nhập
              </Button>
              <Button
                style={{
                  width: "fit-content",
                  height: "40px",
                  borderRadius: "10px",
                  backgroundColor: "#ffcd1f",
                  fontWeight: 500,
                  fontSize: "15px",
                }}
              >
                Đăng ký
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};
export default HeaderHomepage;
