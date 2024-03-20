import imageLogin from "../../assets/images/imageLogin.png";
import { useEffect, useState } from "react";
import { getAllLessonByUserId } from "../../apiService/lesson.service";
import { getAllVocabularyByLessonID } from "../../apiService/vocabulary.service";
import _ from "lodash";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../../assets/scss/RenderLessons.scss";
import {
  getAllLessonWithPaginate,
  getAllLessons,
  getAllLessonWithPaginateByAnotherUser,
} from "../../apiService/lesson.service";
import { getUserByID } from "../../apiService/user.service";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import { Button, Pagination } from "antd";
const RenderLessonByAnotherUser = (props) => {
  const [listLessons, setListLessons] = useState();
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [total, setTotal] = useState();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.account.user);
  const dataLessonByUser = useSelector((state) => state.lesson.data);

  const fetchAPILessons = async () => {
    const response = await getAllLessonWithPaginateByAnotherUser(
      current,
      pageSize,
      userData.id
    );
    if (response && response.data) {
      setListLessons(response.data.rows);
      setTotal(response.data.totalCount);
    }
  };

  useEffect(() => {
    fetchAPILessons();
  }, [current]);

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
  const onChangePage = (current) => {
    setCurrent(current);
  };
  return (
    <>
      {listLessons && listLessons.length > 0 && (
        <div
          className="container-lessonComponent"
          style={{ paddingBottom: "100px" }}
        >
          <span className="title">Các học phần khác </span>
          <div className="lessonComponent-listItems">
            {listLessons.map((item, index) => {
              return (
                <div
                  className="lessonComponent-item"
                  onClick={() => handleNavigateLessonPage(item)}
                >
                  <div className="lessonComponent-item__header">
                    <div className="label">
                      <span>{item.name}</span>
                    </div>
                    <div className="count">
                      <span>{item.count} thuật ngữ</span>
                    </div>
                  </div>
                  <div className="lessonComponent-item__footer">
                    <div className="image">
                      <img src={item.image} alt="" />
                    </div>
                    <div className="username">
                      <span>{item.fullname}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <Pagination
            defaultCurrent={current}
            total={total}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              marginTop: "20px",
            }}
            onChange={onChangePage}
            defaultPageSize={3}
          />
        </div>
      )}
    </>
  );
};
export default RenderLessonByAnotherUser;
