import React, { useEffect } from "react";
import { SearchOutlined } from "@ant-design/icons";
import {
  Dropdown,
  Space,
  Row,
  Col,
  Button,
  Input,
  Divider,
  Form,
  message,
  Avatar,
  Menu,
  Tabs,
} from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import "../assets/scss/Profile.scss";
import imageLogin from "../assets/images/imageLogin.png";
import { useState } from "react";
import { getAllLessonByUserId } from "../apiService/lesson.service";
import { useSelector } from "react-redux";
import { getAllScoreByUserID } from "../apiService/score.service";
const { TabPane } = Tabs;

const ContentTab1 = (props) => {
  const { id, userData } = props;
  const listLessonRedux = useSelector((state) => state.lesson.data);
  const [listLesson, setListLesson] = useState([]);
  const navigate = useNavigate();
  const fetchDataLessonById = async (id) => {
    const response = await getAllLessonByUserId(id);
    if (response && response.data.length > 0) {
      setListLesson(response.data);
    }
  };
  const handleChangeInputSearch = (e) => {
    const valueSearch = e.target.value;
    let arrayTmp = [...listLessonRedux];
    setListLesson(
      arrayTmp.filter((item, index) => item.name.includes(valueSearch))
    );
  };
  useEffect(() => {
    fetchDataLessonById(id);
  }, []);

  const nonAccentVietnamese = (str) => {
    str = str.replace(/A|Á|À|Ã|Ạ|Â|Ấ|Ầ|Ẫ|Ậ|Ă|Ắ|Ằ|Ẵ|Ặ/g, "A");
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/E|É|È|Ẽ|Ẹ|Ê|Ế|Ề|Ễ|Ệ/, "E");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/I|Í|Ì|Ĩ|Ị/g, "I");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/O|Ó|Ò|Õ|Ọ|Ô|Ố|Ồ|Ỗ|Ộ|Ơ|Ớ|Ờ|Ỡ|Ợ/g, "O");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/U|Ú|Ù|Ũ|Ụ|Ư|Ứ|Ừ|Ữ|Ự/g, "U");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/Y|Ý|Ỳ|Ỹ|Ỵ/g, "Y");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/Đ/g, "D");
    str = str.replace(/đ/g, "d");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
    return str;
  };
  const convertSlug = (str) => {
    str = nonAccentVietnamese(str);
    str = str.replace(/^\s+|\s+$/g, ""); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    const from =
      "ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆĞÍÌÎÏİŇÑÓÖÒÔÕØŘŔŠŞŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇğíìîïıňñóöòôõøðřŕšşťúůüùûýÿžþÞĐđßÆa·/_,:;";
    const to =
      "AAAAAACCCDEEEEEEEEGIIIIINNOOOOOORRSSTUUUUUYYZaaaaaacccdeeeeeeeegiiiiinnooooooorrsstuuuuuyyzbBDdBAa------";
    for (let i = 0, l = from.length; i < l; i++) {
      str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
    }

    str = str
      .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
      .replace(/\s+/g, "-") // collapse whitespace and replace by -
      .replace(/-+/g, "-"); // collapse dashes

    return str;
  };
  const handleNavigateLessonPage = (item) => {
    let result = convertSlug(item.name);
    navigate(`/lesson/${result}?id=${item.id}`);
  };
  return (
    <>
      <div style={{ width: "100%", height: "100%" }}>
        <div
          className="div-search"
          style={{
            marginTop: "25px",
            width: "50%",
            height: "50px",
            padding: 0,
            display: "flex",
            alignItems: "center",
            position: "relative",
          }}
        >
          <Input
            placeholder="Tìm kiếm học phần"
            style={{
              width: "100%",
              height: "100%",
              fontSize: "1rem",
              fontWeight: "600",
              borderRadius: "10px",
              color: "#282e3e",
              paddingLeft: "30px !important",
              filter: "none",
              cursor: "text",
              backgroundColor: "white",
              border: "1px solid #bdbdbd",
            }}
            bordered={false}
            onChange={(e) => handleChangeInputSearch(e)}
          />
          <div className="div-iconSearch">
            <SearchOutlined
              style={{
                color: "#6d7790",
                fontSize: "1.3rem",
                position: "absolute",
                zIndex: 1,
                bottom: "12px",
                right: "10px",
              }}
            />
          </div>
        </div>
        <Divider style={{ marginTop: "40px" }} />
        <div
          style={{
            width: "100%",
            marginTop: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            paddingBottom: "50px",
          }}
        >
          {listLesson &&
            listLesson.length > 0 &&
            listLesson.map((item, index) => {
              return (
                <div
                  style={{
                    padding: "5px 10px 0px 10px",
                    height: "80px",
                    //   boxSizing: "border-box",
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "white",
                    borderRadius: "5px",
                    gap: "5px",
                    boxShadow: " 2px 2px 4px rgba(0,0,0,0.2)",
                    cursor: "pointer",
                  }}
                  key={item.id}
                  className="div-itemLesson"
                  onClick={() => {
                    handleNavigateLessonPage(item);
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <Avatar src={userData.image} />
                    <span>{userData.fullname}</span>
                  </div>
                  <div>
                    <span
                      style={{
                        display: "inline",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        fontWeight: 600,
                        fontSize: "1.3rem",
                        lineHeight: 1.2,
                        wordBreak: "normal",
                        wordWrap: "break-word",
                      }}
                    >
                      {item.name}
                    </span>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

const ContentTab2 = (props) => {
  const { id, userData } = props;
  const [dataHistory, setDataHistory] = useState([]);
  const [dataHistoryTmp, setDataHistoryTmp] = useState([]);
  const fetchHistoryScore = async (id) => {
    const response = await getAllScoreByUserID(id);
    if (response && response.data.length > 0) {
      setDataHistory(response.data);
      setDataHistoryTmp(response.data);
    }
  };
  const handleChangeInputSearch = (e) => {
    const valueSearch = e.target.value;
    let arrayTmp = [...dataHistory];
    setDataHistoryTmp(
      arrayTmp.filter((item, index) => item.name.includes(valueSearch))
    );
  };
  useEffect(() => {
    fetchHistoryScore(id);
  }, []);
  function formatDateWithTime(utcTimestamp) {
    const date = new Date(utcTimestamp);

    // Extract day, month, and year
    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getUTCFullYear();
    return `${day}-${month}-${year}`;
  }
  return (
    <>
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "var(--background-color)",
        }}
      >
        <div
          className="div-search"
          style={{
            marginTop: "30px",
            width: "50%",
            height: "50px",
            padding: 0,
            display: "flex",
            alignItems: "center",
            position: "relative",
          }}
        >
          <Input
            placeholder="Tìm kiếm học phần"
            style={{
              width: "100%",
              height: "100%",
              fontSize: "1rem",
              fontWeight: "600",
              borderRadius: "10px",
              color: "#282e3e",
              paddingLeft: "30px !important",
              filter: "none",
              cursor: "text",
              backgroundColor: "white",
              border: "1px solid #bdbdbd",
            }}
            bordered={false}
            onChange={(e) => handleChangeInputSearch(e)}
          />
          <div className="div-iconSearch">
            <SearchOutlined
              style={{
                color: "#6d7790",
                fontSize: "1.3rem",
                position: "absolute",
                zIndex: 1,
                bottom: "12px",
                right: "10px",
              }}
            />
          </div>
        </div>
        <Divider style={{ marginTop: "40px" }} />
        <div
          style={{
            width: "100%",
            marginTop: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            paddingBottom: "50px",
          }}
        >
          {dataHistoryTmp &&
            dataHistoryTmp.length > 0 &&
            dataHistoryTmp.map((item, index) => {
              return (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: "white",
                    borderRadius: "5px",
                    gap: "5px",
                    boxShadow: " 2px 2px 4px rgba(0,0,0,0.2)",
                    padding: "5px 10px 0px 10px",
                    height: "80px",
                  }}
                >
                  <div
                    style={{
                      //   boxSizing: "border-box",
                      display: "flex",
                      flexDirection: "column",

                      flex: 3,
                    }}
                    key={item.id}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <Avatar src={userData.image} />
                      <span>{userData.fullname}</span>
                    </div>
                    <div>
                      <span
                        style={{
                          display: "inline",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          fontWeight: 600,
                          fontSize: "1.3rem",
                          lineHeight: 1.2,
                          wordBreak: "normal",
                          wordWrap: "break-word",
                        }}
                      >
                        {item.name}
                      </span>
                    </div>
                  </div>
                  <div>{formatDateWithTime(item.date)}</div>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        textAlign: "center",
                        fontSize: "1.3rem",
                        fontWeight: 400,
                      }}
                    >
                      {item.correctAnswer} /
                      {item.correctAnswer + item.incorrectAnswer}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

const Profile = (props) => {
  const location = useLocation();
  let params = new URLSearchParams(location.search);
  const id = params.get("id");
  const userData = useSelector((state) => state.account.user);
  return (
    <>
      <div className="div-backgroundProfile">
        <div className="container">
          <div className="header">
            <Avatar className="avatar" src={userData.image} />
            <div className="information">
              <div className="email">
                <span>{userData.email}</span>
              </div>
              <div className="username">
                <span>{userData.fullname}</span>
              </div>
            </div>
          </div>
          <div className="div-menu" style={{ height: "100%" }}>
            <Tabs
              defaultActiveKey="lesson"
              className="main"
              style={{
                backgroundColor: "var(--background-color)",
                height: "100%",
              }}
            >
              <TabPane
                tab={<span style={{ fontSize: "1rem" }}>Học phần</span>}
                key="lesson"
              >
                <ContentTab1 id={id} userData={userData} />
              </TabPane>
              <TabPane
                tab={<span style={{ fontSize: "1rem" }}>Kết quả kiểm tra</span>}
                key="result"
              >
                <ContentTab2 id={id} userData={userData} />
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
