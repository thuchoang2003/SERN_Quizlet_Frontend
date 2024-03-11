import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  DownOutlined,
  SmileOutlined,
  SearchOutlined,
  PlusOutlined,
  BellOutlined,
  SettingOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import {
  Dropdown,
  Space,
  Row,
  Col,
  Button,
  Input,
  Menu,
  Empty,
  Divider,
  Avatar,
} from "antd";
import "../../assets/scss/HeaderHomepage.scss";
import { useSelector, useDispatch } from "react-redux";
import imageLogin from "../../assets/images/imageLogin.png";
import { doLogout } from "../../redux/counter/accountSlice";
const HeaderHomepage = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authenticated = useSelector((state) => state.account.isAuthenticated);
  const userData = useSelector((state) => state.account.user);
  const listLesson = useSelector((state) => state.lesson.data);
  const base64Avatar = userData.image;
  const handleClickLogout = (e) => {
    e.preventDefault();
    //remove redux
    dispatch(doLogout());
    navigate("/");
  };

  const [itemsDropDownNotification, SetItemsDropDownNotification] = useState(
    []
  );
  const [itemsDropdownTest, setItemsDropdownTest] = useState([]);
  const itemsDropDownSetting = [
    {
      key: "1",
      label: (
        <>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              height: "50px",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                position: "relative",
                borderRadius: "50%",
              }}
            >
              <img
                src={base64Avatar}
                alt=""
                style={{
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  left: 0,
                  right: 0,
                  objectFit: "cover",
                  objectPosition: "center",
                  borderRadius: "50%",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignContent: "center",
                justifyItems: "center",
                height: "45px",
                rowGap: "2px",
              }}
            >
              <span
                style={{
                  fontWeight: 500,
                  fontSize: "1rem",
                  display: "block",
                  width: "100%",
                  height: "15px",
                }}
              >
                {userData.fullname}
              </span>
              <span
                style={{
                  fontSize: "1rem",
                  display: "block",
                  width: "100%",
                  height: "15px",
                }}
              >
                {userData.email}
              </span>
            </div>
          </div>
        </>
      ),
    },
    {
      label: <Divider style={{ margin: "5px 0px !important" }} />,
    },
    {
      key: "2",
      label: (
        <>
          <div
            onClick={() => navigate(`/profile?id=${userData.id}`)}
            style={{ width: "100%" }}
          >
            <PieChartOutlined style={{ fontSize: "1.2rem" }} />
            <span
              style={{
                fontSize: "1rem",
                fontWeight: "500",
                marginLeft: "10px",
              }}
            >
              Hồ sơ
            </span>
          </div>
        </>
      ),
    },
    {
      key: "3",
      label: (
        <>
          <div
            onClick={() => navigate(`/setting?id=${userData.id}`)}
            style={{ width: "100%" }}
          >
            <SettingOutlined style={{ fontSize: "1.2rem" }} />
            <span
              style={{
                fontSize: "1rem",
                fontWeight: "500",
                marginLeft: "10px",
              }}
            >
              Cài đặt
            </span>
          </div>
        </>
      ),
    },

    {
      key: "4",
      label: (
        <>
          <Divider style={{ margin: " 0px !important" }} />
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="#"
            style={{
              fontSize: "1rem",
              fontWeight: "500",
              marginLeft: "10px",
            }}
            onClick={(e) => {
              handleClickLogout(e);
            }}
          >
            Đăng xuất
          </a>
          <Divider style={{ margin: " 0px !important" }} />
        </>
      ),
    },
  ];

  const setItemLessonHeader = (listLesson) => {
    let listDataTmp = listLesson.map((item, index) => {
      return {
        key: index,
        label: (
          <div
            style={{ width: "350px", height: "50px" }}
            onClick={() => handleNavigateLessonPage(item)}
          >
            <div style={{ fontWeight: "600", fontSize: "1rem" }}>
              {item.name}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <Avatar
                src={base64Avatar}
                style={{
                  cursor: "pointer",
                  width: "20px",
                  height: "20px",
                }}
              />
              <div
                style={{
                  color: "#586380",
                  fontSize: "0.8rem",
                  fontWeight: "600",
                }}
              >
                user
              </div>
            </div>
          </div>
        ),
      };
    });
    if (listDataTmp) setItemsDropdownTest(listDataTmp);
  };

  useEffect(() => {
    setItemLessonHeader(listLesson);
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
      <div className="header_Container">
        <Row gutter={16} style={{ width: "100%" }}>
          <Col className="gutter-row" span={9}>
            <div className="header_Container--left">
              <div className="logo">
                <a href="/home">Quizlet</a>
              </div>
              <div className="divThree">
                <a href="/home">Trang chủ</a>
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
                onClick={() => {
                  !authenticated
                    ? navigate("/login")
                    : navigate("/lesson/create");
                }}
              />
              {!authenticated && (
                <>
                  {" "}
                  <Button
                    style={{
                      width: "fit-content",
                      height: "40px",
                      borderRadius: "10px",
                      fontWeight: 500,
                      fontSize: "15px",
                      border: "1px solid #cccc",
                    }}
                    onClick={() => {
                      navigate("/login");
                    }}
                    type="text"
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
                      border: "1px solid #cccc",
                    }}
                    onClick={() => {
                      navigate("/login");
                    }}
                  >
                    Đăng ký
                  </Button>
                </>
              )}
              {authenticated && (
                <>
                  <Dropdown
                    overlay={
                      itemsDropDownNotification.length > 0 &&
                      itemsDropDownNotification ? (
                        <Menu>
                          {itemsDropDownNotification.map((item, index) => (
                            <Menu.Item key={index}>{item}</Menu.Item>
                          ))}
                        </Menu>
                      ) : (
                        <Menu>
                          <Empty style={{ width: "450px", height: "250px" }} />
                        </Menu>
                      )
                    }
                    placement="topRight"
                  >
                    <Button
                      icon={<BellOutlined style={{ fontSize: "1rem" }} />}
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        border: "2px solid #cccc",
                      }}
                      type="text"
                    />
                  </Dropdown>
                  <Dropdown
                    menu={{
                      items: itemsDropDownSetting,
                    }}
                    placement="topRight"
                  >
                    {/* <Button
                      icon={<Avatar src={userData.image} />}
                      style={{
                        width: "40px",
                        height: "40px",
                        // borderRadius: "50%",
                        border: "2px solid #cccc",
                      }}
                      type="text"
                      
                    /> */}
                    <Avatar
                      src={base64Avatar}
                      style={{
                        cursor: "pointer",
                        width: "40px",
                        height: "40px",
                      }}
                    />
                  </Dropdown>
                  <Button
                    style={{
                      width: "fit-content",
                      height: "40px",
                      borderRadius: "10px",
                      backgroundColor: "#ffcd1f",
                      fontWeight: 500,
                      fontSize: "15px",
                      border: "1px solid #cccc",
                    }}
                  >
                    <span style={{ maxWidth: "max(7.5rem, 15vw)" }}>
                      Nâng cấp
                    </span>
                  </Button>
                </>
              )}
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};
export default HeaderHomepage;
