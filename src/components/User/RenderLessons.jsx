import "../../assets/scss/RenderLessons.scss";
import imageLogin from "../../assets/images/imageLogin.png";
import { useEffect, useState } from "react";
import { getAllLessonByUserId } from "../../apiService/lesson.service";
import { getAllVocabularyByLessonID } from "../../apiService/vocabulary.service";
import _ from "lodash";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const RenderLessons = (props) => {
  const [listLessons, setListLessons] = useState();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.account.user);
  const fetchAPILessons = async () => {
    const response = await getAllLessonByUserId();
    if (response && response.data) {
      try {
        const listDataResolved = response.data.map((item, index) => ({
          id: item.id,
          name: item.name,
          length: item.count,
        }));
        setListLessons(listDataResolved);
      } catch (error) {
        console.error("Error fetching vocabulary lengths:", error);
      }
    }
  };

  useEffect(() => {
    fetchAPILessons();
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
      {listLessons && listLessons.length > 0 && (
        <div className="container-lessonComponent">
          <span className="title">Gần đây</span>
          <div className="lessonComponent-listItems">
            {/* <div className="lessonComponent-item">
              <div className="lessonComponent-item__header">
                <div className="label">
                  <span>Từ vựng sách listening 1</span>
                </div>
                <div className="count">
                  <span>150 thuật ngữ</span>
                </div>
              </div>
              <div className="lessonComponent-item__footer">
                <div className="image">
                  <img src={imageLogin} alt="" />
                </div>
                <div className="username">
                  <span>nguyenthuchoang</span>
                </div>
              </div>
            </div>
            <div className="lessonComponent-item">
              <div className="lessonComponent-item__header">
                <div className="label">
                  <span>Từ vựng sách listening 1</span>
                </div>
                <div className="count">
                  <span>150 thuật ngữ</span>
                </div>
              </div>
              <div className="lessonComponent-item__footer">
                <div className="image">
                  <img src={imageLogin} alt="" />
                </div>
                <div className="username">
                  <span>nguyenthuchoang</span>
                </div>
              </div>
            </div>
            <div className="lessonComponent-item">
              <div className="lessonComponent-item__header">
                <div className="label">
                  <span>Từ vựng sách listening 1</span>
                </div>
                <div className="count">
                  <span>150 thuật ngữ</span>
                </div>
              </div>
              <div className="lessonComponent-item__footer">
                <div className="image">
                  <img src={imageLogin} alt="" />
                </div>
                <div className="username">
                  <span>nguyenthuchoang</span>
                </div>
              </div>
            </div> */}
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
                      <span>{item.length} thuật ngữ</span>
                    </div>
                  </div>
                  <div className="lessonComponent-item__footer">
                    <div className="image">
                      <img src={userData.image} alt="" />
                    </div>
                    <div className="username">
                      <span>{userData.fullname}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};
export default RenderLessons;
