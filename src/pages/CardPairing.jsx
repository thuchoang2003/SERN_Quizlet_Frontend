import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  LeftOutlined,
  PlusOutlined,
  SettingOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Input, Result } from "antd";
import "../assets/scss/CardPairing.scss";
import _ from "lodash";
import { getAllVocabularyByLessonID } from "../apiService/vocabulary.service";
import { getLessonByLessonId } from "../apiService/lesson.service";
import imageRemember from "../assets/images/imageRemember.jpg";
const CardPairing = () => {
  let location = useLocation();
  let navigate = useNavigate();
  let params = new URLSearchParams(location.search);

  const id = params.get("id");

  //state
  const [dataListVocabularies, setDataListVocabularies] = useState([]);
  const [dataLesson, setListDataLesson] = useState({});
  const [dataExamToView, setDataExamToView] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [randomizedList, setRandomizedList] = useState([]);
  const fetchDataLessonByID = async (id) => {
    const [dataListVocabulary, dataDetailLesson] = await Promise.all([
      getAllVocabularyByLessonID(id),
      getLessonByLessonId(id),
    ]);

    if (dataListVocabulary && dataDetailLesson) {
      setDataListVocabularies(dataListVocabulary);
      setListDataLesson(dataDetailLesson.data);
      if (randomizedList.length === 0) {
        const randomList = getRandomObjects(dataListVocabulary);
        setRandomizedList(randomList);
        setDataExamToView(randomList);
      }
    }
  };
  const getRandomObjects = (inputArray) => {
    if (!Array.isArray(inputArray) || inputArray.length === 0) {
      return [];
    }

    const resultArray = [];
    const arrayLength = inputArray.length;

    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * arrayLength);
      resultArray.push(inputArray[randomIndex]);
    }

    return addTmpValueEn(resultArray);
  };
  const addTmpValueEn = (data) => {
    const uniqueValuesEn = data.map((item) => item.value_en); // Lấy tất cả các giá trị value_en
    const usedValuesEn = []; // Mảng để theo dõi giá trị value_en đã được sử dụng

    // Duyệt qua mảng và thêm thuộc tính tmp_value_en cho từng đối tượng
    const newData = data.map((item) => {
      const remainingValuesEn = uniqueValuesEn.filter(
        (value) => !usedValuesEn.includes(value)
      );

      if (remainingValuesEn.length === 0) {
        // Nếu đã sử dụng hết tất cả giá trị, có thể xử lý theo ý muốn của bạn, ví dụ như để tmp_value_en là null hoặc giữ nguyên giá trị hiện tại.
        return {
          ...item,
          tmp_value_en: null,
        };
      }

      const randomValueEn =
        remainingValuesEn[Math.floor(Math.random() * remainingValuesEn.length)];
      usedValuesEn.push(randomValueEn); // Đánh dấu giá trị đã được sử dụng

      return {
        ...item,
        tmp_value_en: randomValueEn,
      };
    });

    return newData;
  };

  //mảng theo dõi những index bị xoá

  let pairDivUserSelected = [];

  const compareValue = (value_vi, value_en) => {
    for (let i = 0; i < dataExamToView.length; i++) {
      if (
        value_vi === dataExamToView[i].value_vi &&
        value_en === dataExamToView[i].value_en
      )
        return true;
    }
    return false;
  };

  const handleClickCard = (index, value, type) => {
    for (let i = 0; i < 6; i++) {
      const cardElementVi = document.getElementById(`exam-${i}-vi`);
      const cardElementEn = document.getElementById(`exam-${i}-en`);

      if (cardElementVi && i !== index) {
        cardElementVi.classList.remove("clicked");
      }

      if (cardElementEn && i !== index) {
        cardElementEn.classList.remove("clicked");
      }
    }

    // Get the element by ID
    const cardElement = document.getElementById(`exam-${index}-${type}`);

    // Check if the element already has the "clicked" class
    if (cardElement) {
      if (cardElement.classList.contains("clicked")) {
        // If it has the class, remove it
        cardElement.classList.remove("clicked");
      } else {
        // If it doesn't have the class, add it
        cardElement.classList.add("clicked");
      }
    }

    pairDivUserSelected.push({
      value: value,
      type: type,
    });
    if (pairDivUserSelected.length === 2) {
      const [firstItem, secondItem] = pairDivUserSelected;
      if (firstItem.type === secondItem.type) pairDivUserSelected = [];
      else if (firstItem.type === "vi") {
        if (compareValue(firstItem.value, secondItem.value)) {
          setMatchedPairs([...matchedPairs, firstItem, secondItem]);

          // Clear the user's selected pair array
          pairDivUserSelected = [];
        } else {
          for (let i = 0; i < 6; i++) {
            const cardElementVi = document.getElementById(`exam-${i}-vi`);
            const cardElementEn = document.getElementById(`exam-${i}-en`);
            if (cardElementVi.classList.contains("clicked") && cardElementVi)
              cardElementVi.classList.remove("clicked");
            if (cardElementEn.classList.contains("clicked") && cardElementEn)
              cardElementEn.classList.remove("clicked");
          }
          pairDivUserSelected = [];
        }
      } else {
        if (compareValue(secondItem.value, firstItem.value)) {
          setMatchedPairs([...matchedPairs, firstItem, secondItem]);
          pairDivUserSelected = [];
        } else {
          for (let i = 0; i < 6; i++) {
            const cardElementVi = document.getElementById(`exam-${i}-vi`);
            const cardElementEn = document.getElementById(`exam-${i}-en`);
            if (cardElementVi.classList.contains("clicked") && cardElementVi)
              cardElementVi.classList.remove("clicked");
            if (cardElementEn.classList.contains("clicked") && cardElementEn)
              cardElementEn.classList.remove("clicked");
          }
          pairDivUserSelected = [];
        }
      }
    }
  };

  useEffect(() => {
    fetchDataLessonByID(id);
  }, [matchedPairs]);
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
      <div className="div-backgroundPairingCard">
        {matchedPairs && matchedPairs.length !== 12 && (
          <>
            <Button
              icon={
                <CloseOutlined
                  style={{ fontSize: "1.3rem", fontWeight: 600 }}
                />
              }
              className="btnBack"
              type="text"
              onClick={() => handleNavigateLessonPage(dataLesson)}
            />
          </>
        )}
        <div className="container-pairingCard">
          {matchedPairs && matchedPairs.length === 12 && (
            <>
              <Result
                status="success"
                title="Bạn thật cừ! Liệu bạn có thể ghép nhanh hơn nữa?"
                // subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
                extra={[
                  <Button
                    style={{
                      width: "150px",
                      height: "40px",
                      border: "1px solid rgba(204, 204, 204, 0.8)",
                      // backgroundColor: "#4255ff",
                      color: "black",
                      fontWeight: 400,
                      fontSize: "1.1rem",
                      borderRadius: "5px",
                    }}
                    onClick={() => navigate("/home")}
                  >
                    Trang chủ
                  </Button>,
                  <Button
                    style={{
                      width: "150px",
                      height: "40px",
                      border: "1px solid rgba(204, 204, 204, 0.8)",
                      backgroundColor: "#4255ff",
                      color: "white",
                      fontWeight: 600,
                      fontSize: "1.1rem",
                      borderRadius: "5px",
                    }}
                    onClick={() => {
                      window.location.reload();
                    }}
                  >
                    Chơi lại
                  </Button>,
                ]}
              />
            </>
          )}
          {dataListVocabularies &&
            randomizedList.map((item, index) => {
              const isMatchedEn = matchedPairs.some(
                (pair) => pair.value === item.tmp_value_en && pair.type === "en"
              );
              const isMatchedVi = matchedPairs.some(
                (pair) => pair.value === item.value_vi && pair.type === "vi"
              );
              if (index % 3 === 0) {
                return (
                  <>
                    <div
                      className={`item ${isMatchedVi ? "hidden" : ""}`}
                      id={`exam-${index}-vi`}
                      onClick={() =>
                        handleClickCard(index, item.value_vi, "vi")
                      }
                    >
                      <span className="text">{item.value_vi}</span>
                    </div>
                    <div
                      className={`item ${isMatchedEn ? "hidden" : ""}`}
                      id={`exam-${index}-en`}
                      onClick={() =>
                        handleClickCard(index, item.tmp_value_en, "en")
                      }
                    >
                      <span className="text">{item.tmp_value_en}</span>
                    </div>
                  </>
                );
              } else {
                return (
                  <>
                    <div
                      className={`item ${isMatchedEn ? "hidden" : ""}`}
                      id={`exam-${index}-en`}
                      onClick={() =>
                        handleClickCard(index, item.tmp_value_en, "en")
                      }
                    >
                      <span className="text">{item.tmp_value_en}</span>
                    </div>
                    <div
                      className={`item ${isMatchedVi ? "hidden" : ""}`}
                      id={`exam-${index}-vi`}
                      onClick={() =>
                        handleClickCard(index, item.value_vi, "vi")
                      }
                    >
                      <span className="text">{item.value_vi}</span>
                    </div>
                  </>
                );
              }
            })}
        </div>
      </div>
    </>
  );
};
export default CardPairing;
