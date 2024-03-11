import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../assets/scss/Edit_Lesson.scss";
import { LeftOutlined, PlusOutlined, SettingOutlined } from "@ant-design/icons";
import { Button, Dropdown, Input } from "antd";
import ListVocabularies from "../components/User/ListVocabularies";
import { getAllVocabularyByLessonID } from "../apiService/vocabulary.service";
import { getLessonByLessonId } from "../apiService/lesson.service";
import _ from "lodash";
import ModalImportVocabularies from "../components/User/ModalImportVocabularies";

const Edit_Lesson = (props) => {
  let location = useLocation();
  let navigate = useNavigate();
  let params = new URLSearchParams(location.search);
  const id = params.get("id");
  const [dataListVocabularies, setDataListVocabularies] = useState([]);
  const [dataLesson, setDataLesson] = useState(null);
  const [openModalImportVocabularies, setOpenModalImportVocabularies] =
    useState(false);
  const inputRef = useRef();
  const fetchDataVocabularies = async () => {
    try {
      const [vocabularyData, lessonData] = await Promise.all([
        getAllVocabularyByLessonID(id),
        getLessonByLessonId(id),
      ]);
      if (vocabularyData && lessonData) {
        // Assuming setDataListVocabularies and setDataLesson are functions to update state
        setDataListVocabularies(vocabularyData);
        setDataLesson(lessonData.data);
        // Uncomment if needed
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchDataVocabularies();
  }, []);

  const handleChangeNameLesson = (e) => {
    const dataTmp = _.cloneDeep(dataLesson);
    dataTmp.name = e.target.value;
    setDataLesson(dataTmp);
  };
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
  return (
    <>
      <div
        style={{
          maxWidth: "100%",
          backgroundColor: "#f6f7fb",
        }}
      >
        <div className="container_editLesson">
          <div className="header">
            <div className="item_1">
              <LeftOutlined style={{ fontSize: "0.8rem" }} />
              <span
                onClick={() => {
                  let result = convertSlug(dataLesson.name);
                  navigate(`/lesson/${result}?id=${dataLesson.id}`);
                }}
              >
                Trở về học phần
              </span>
            </div>
            <div className="item_2"></div>
          </div>
          <div className="title">
            <Input
              placeholder='Nhập tiêu đề, ví dụ "Sinh học - Chương 22: Tiến hóa"'
              style={{
                width: "100%",
                height: "100%",
                fontSize: "1.1rem",
                fontWeight: "600",
                borderRadius: "10px",
                color: "#282e3e",
                paddingLeft: "30px !important",
                filter: "none",
                cursor: "text",
                backgroundColor: "white",
              }}
              bordered={false}
              value={dataLesson?.name}
              onChange={(e) => handleChangeNameLesson(e)}
              ref={inputRef}
            />
          </div>
          <div className="div-action">
            <Button
              icon={
                <PlusOutlined
                  style={{
                    fontSize: "1.3rem",
                    color: "#586380",
                    lineHeight: "40px",
                  }}
                />
              }
              type="text"
              className="btnItem_add"
              onClick={() =>
                setOpenModalImportVocabularies(!openModalImportVocabularies)
              }
            >
              Nhập
            </Button>
            <Button
              type="text"
              icon={
                <SettingOutlined
                  style={{
                    fontSize: "17px",
                    lineHeight: "35px",
                    color: "#586380",
                  }}
                />
              }
              className="btnItem_setting"
            />
          </div>
          <ListVocabularies
            dataListVocabularies={dataListVocabularies}
            setDataListVocabularies={setDataListVocabularies}
            fetchDataVocabularies={fetchDataVocabularies}
            dataLesson={dataLesson}
            convertSlug={convertSlug}
            nonAccentVietnamese={nonAccentVietnamese}
            trackingDataListVocabularies={dataListVocabularies}
            ref={inputRef}
          />
          <ModalImportVocabularies
            openModalImportVocabularies={openModalImportVocabularies}
            setOpenModalImportVocabularies={setOpenModalImportVocabularies}
            fetchDataVocabularies={fetchDataVocabularies}
            id={id}
          />
        </div>
      </div>
    </>
  );
};
export default Edit_Lesson;
