import "../assets/scss/Test_Lesson.scss";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../assets/scss/Detail_Lesson.scss";
import {
  FolderOpenFilled,
  FileTextFilled,
  SnippetsFilled,
  BuildFilled,
  EditOutlined,
  UploadOutlined,
  EllipsisOutlined,
  PlusCircleOutlined,
  DeleteOutlined,
  ImportOutlined,
  ExportOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, message, Popconfirm, Input } from "antd";
import { getAllVocabularyByLessonID } from "../apiService/vocabulary.service";
import { getLessonByLessonId } from "../apiService/lesson.service";
import { useSelector, useDispatch } from "react-redux";
const Test_Lesson = (props) => {
  let location = useLocation();
  let navigate = useNavigate();
  let params = new URLSearchParams(location.search);
  let dataAnswerByUser = [];
  const id = params.get("id");
  const dispatch = useDispatch();
  //state
  const [dataListVocabularies, setDataListVocabularies] = useState([]);
  const [dataLesson, setDataLesson] = useState(null);
  const [listResult, setListResult] = useState([]);

  const answerRandomByVerson1 = [];
  const answerRandomByVerson2 = [];

  const fetchDataVocabularies = async () => {
    try {
      const [vocabularyData, lessonData] = await Promise.all([
        getAllVocabularyByLessonID(id),
        getLessonByLessonId(id),
      ]);
      if (vocabularyData && lessonData) {
        // Assuming setDataListVocabularies and setDataLesson are functions to update state
        setDataListVocabularies(vocabularyData);
        setDataLesson(lessonData.data); // Uncomment if needed
        let arrTmp = vocabularyData.map((element) => {
          return element.value_vi;
        });
        setListResult(arrTmp);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  console.log(dataListVocabularies);
  useEffect(() => {
    fetchDataVocabularies();
  }, []);
  const getRandomResults = (arr) => {
    if (arr.length < 4) {
      console.error("Mảng phải có ít nhất 3 phần tử");
      return [];
    }

    // Clone mảng để tránh thay đổi mảng gốc
    const clonedArr = [...arr];

    // Mảng chứa 4 kết quả ngẫu nhiên
    const randomResults = [];

    // Lấy ngẫu nhiên 4 kết quả từ mảng
    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * clonedArr.length);
      const randomResult = clonedArr.splice(randomIndex, 1)[0];
      randomResults.push(randomResult);
    }

    return randomResults;
  };
  const getRandomElementWithBias = (index, arr, biasPercentage = 60) => {
    const randomNumber = Math.random();
    const threshold = biasPercentage / 100;

    if (randomNumber < threshold) {
      // Chọn giá trị theo chiến lược bias
      return arr[index];
    } else {
      // Chọn giá trị một cách ngẫu nhiên thông thường
      const randomIndex = Math.floor(Math.random() * arr.length);
      return index !== randomIndex
        ? arr[randomIndex]
        : getRandomElementWithBias(index, arr, biasPercentage);
    }
  };
  const getRandomThreeOption = () => {
    return Math.floor(Math.random() * 4); // Sinh số ngẫu nhiên từ 0 đến 2
  };

  //userChooseAnswer
  const handleChooseAnswerV1 = (questionId, isCorrect) => {
    const questionElement = document.getElementById(questionId);

    if (questionElement) {
      // Lấy giá trị của class "text" bên trong câu hỏi
      const textElements = questionElement.querySelectorAll(".text");

      // Lấy giá trị của class "text" đầu tiên và thứ hai
      const firstTextValue = textElements[0].innerText;
      const secondTextValue = textElements[1].innerText;
      // dataAnswerByUser.push({
      //   questionId: questionId,
      //   value_en: firstTextValue,
      //   value_vi: secondTextValue,
      //   isCorrect: isCorrect,
      // });
      const existingAnswerIndex = dataAnswerByUser.findIndex(
        (answer) => answer.questionId === questionId
      );
      if (existingAnswerIndex !== -1) {
        dataAnswerByUser[existingAnswerIndex] = {
          questionId: questionId,
          value_en: firstTextValue,
          value_vi: secondTextValue,
          isCorrect: isCorrect,
        };
      } else
        dataAnswerByUser.push({
          questionId: questionId,
          value_en: firstTextValue,
          value_vi: secondTextValue,
          isCorrect: isCorrect,
        });
      const btnElements = questionElement.querySelectorAll(".btn");
      if (isCorrect) {
        btnElements[0].classList.add("answer");
        btnElements[1].classList.remove("answer");
      } else {
        btnElements[1].classList.add("answer");
        btnElements[0].classList.remove("answer");
      }
    } else {
      console.log("Không tìm thấy câu hỏi có ID:", questionId);
    }
  };
  const handleChooseAnswerV2 = (questionId, value_vi, index, arrayTmp) => {
    const questionElement = document.getElementById(questionId);

    if (questionElement) {
      // Lấy giá trị của class "text" bên trong câu hỏi
      const textElements = questionElement.querySelectorAll(".text");
      console.log(textElements);

      // Lấy giá trị của class "text" đầu tiên;
      const firstTextValue = textElements[0].innerText;

      const existingAnswerIndex = dataAnswerByUser.findIndex(
        (answer) => answer.questionId === questionId
      );
      arrayTmp[index] = value_vi;
      if (existingAnswerIndex !== -1) {
        dataAnswerByUser[existingAnswerIndex] = {
          questionId: questionId,
          value_en: firstTextValue,
          value_vi: value_vi,
          listAnswer: arrayTmp,
        };
      } else
        dataAnswerByUser.push({
          questionId: questionId,
          value_en: firstTextValue,
          value_vi: value_vi,
          listAnswer: arrayTmp,
        });
      const btnElements = questionElement.querySelectorAll(".btn");
      for (let i = 0; i < 4; i++) {
        if (index == i) {
          btnElements[i].classList.add("answer");
        } else btnElements[i].classList.remove("answer");
      }
    } else {
      console.log("Không tìm thấy câu hỏi có ID:", questionId);
    }
  };
  const handleInputChange = (questionId, value_vi) => {
    const questionElement = document.getElementById(questionId);
    // value_vi = nonAccentVietnamese(value_vi);
    if (questionElement) {
      // Lấy giá trị của class "text" bên trong câu hỏi
      const textElements = questionElement.querySelectorAll(".text");

      // Lấy giá trị của class "text" đầu tiên;
      const firstTextValue = textElements[0].innerText;

      const existingAnswerIndex = dataAnswerByUser.findIndex(
        (answer) => answer.questionId === questionId
      );
      if (existingAnswerIndex !== -1) {
        dataAnswerByUser[existingAnswerIndex] = {
          questionId: questionId,
          value_en: firstTextValue,
          value_vi: value_vi,
        };
      } else
        dataAnswerByUser.push({
          questionId: questionId,
          value_en: firstTextValue,
          value_vi: value_vi,
        });
    } else {
      console.log("Không tìm thấy câu hỏi có ID:", questionId);
    }
  };
  const handleSubmitTest = () => {
    navigate(`/lesson/result?id=${id}`, {
      state: {
        id: id,
        answer: dataAnswerByUser,
        answerRandomByVerson1: answerRandomByVerson1,
        answerRandomByVerson2: answerRandomByVerson2,
      },
    });
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
  const handleNavigateLessonPage = (item) => {
    let result = convertSlug(item.name);
    navigate(`/lesson/${result}?id=${item.id}`);
  };
  return (
    <>
      <div className="div-background">
        <div className="test_container">
          <div className="main">
            {dataListVocabularies &&
              dataListVocabularies.length > 0 &&
              dataListVocabularies.map((item, index) => {
                if (index < dataListVocabularies.length / 3) {
                  const partialListResult = listResult.slice(
                    0,
                    listResult.length / 3
                  );
                  const randomValueVi = getRandomElementWithBias(
                    index,
                    partialListResult
                  );
                  // const questionId = `question-${index + 1}`;
                  const questionId = item.id;
                  answerRandomByVerson1.push(randomValueVi);
                  return (
                    <div
                      className={`question`}
                      id={questionId}
                      key={questionId}
                    >
                      <div className="header">
                        <div className="left">
                          <div className="title1">Định nghĩa</div>
                          <div className="text">{item.value_en}</div>
                        </div>
                        <div className="right">
                          <div className="title1">
                            <div className="content">Thuật ngữ</div>
                            <div className="count">
                              {index + 1} / {dataListVocabularies.length}
                            </div>
                          </div>
                          <div className="text">{randomValueVi}</div>
                        </div>
                      </div>
                      <div className="footer">
                        <div className="label">Chọn câu trả lời</div>
                        <div className="div-btnAction">
                          <Button
                            className={`btn`}
                            type="text"
                            data-question-id={questionId}
                            onClick={() =>
                              handleChooseAnswerV1(questionId, true)
                            }
                          >
                            Đúng
                          </Button>
                          <Button
                            className={`btn`}
                            type="text"
                            data-question-id={questionId}
                            onClick={() =>
                              handleChooseAnswerV1(questionId, false)
                            }
                          >
                            Sai
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                } else if (
                  index >= dataListVocabularies.length / 3 &&
                  index < (2 * dataListVocabularies.length) / 3
                ) {
                  let arrayTmp = getRandomResults(listResult);
                  let positionCorrectAnswer = getRandomThreeOption();
                  const value_Correct = item.value_vi;
                  // const questionId = `question-${index + 1}`;
                  const questionId = item.id;
                  answerRandomByVerson2.push({
                    fourAnswer: arrayTmp,
                    positionCorrectAnswer: positionCorrectAnswer,
                    value_Correct: value_Correct,
                    questionId: questionId,
                  });
                  return (
                    <div
                      className="question_v2"
                      id={questionId}
                      key={questionId}
                    >
                      <div className="header">
                        <div className="title1">
                          <div className="content">Định nghĩa</div>
                          <div className="count">
                            {index + 1} / {dataListVocabularies.length}
                          </div>
                        </div>
                        <div className="text">{item.value_en}</div>
                      </div>
                      <div className="footer">
                        <div className="label">Chọn thuật ngữ đúng</div>
                        <div className="div-btnAction">
                          {arrayTmp.map((item, index) => {
                            if (index == positionCorrectAnswer)
                              return (
                                <Button
                                  className={`btn btn-${index + 1}`}
                                  type="text"
                                  onClick={() =>
                                    handleChooseAnswerV2(
                                      questionId,
                                      value_Correct,
                                      index,
                                      arrayTmp
                                    )
                                  }
                                >
                                  {value_Correct}
                                </Button>
                              );
                            else
                              return (
                                <Button
                                  className={`btn btn-${index + 1}`}
                                  type="text"
                                  onClick={() =>
                                    handleChooseAnswerV2(
                                      questionId,
                                      item,
                                      index,
                                      arrayTmp
                                    )
                                  }
                                >
                                  {item}
                                </Button>
                              );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                } else {
                  // const questionId = `question-${index + 1}`;
                  const questionId = item.id;
                  return (
                    <div
                      className="question_v3"
                      id={questionId}
                      key={questionId}
                    >
                      <div className="header">
                        <div className="title1">
                          <div className="content">Định nghĩa</div>
                          <div className="count">
                            {index + 1} / {dataListVocabularies.length}
                          </div>
                        </div>
                        <div className="text">{item.value_en}</div>
                      </div>
                      <div className="footer">
                        <div className="label">Đáp án của bạn</div>
                        <div className="div-btnAction">
                          <Input
                            placeholder="Nhập đáp án"
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
                              backgroundColor: "var(--background-color)",
                            }}
                            bordered={false}
                            // onChange={(e) => handleChangeNameLesson(e)}
                            onChange={(e) =>
                              handleInputChange(questionId, e.target.value)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
            {/* <div className="question_v2">
            <div className="header">
              <div className="title1">
                <div className="content">Định nghĩa</div>
                <div className="count">1/20</div>
              </div>
              <div className="text">interfere with Sth</div>
            </div>
            <div className="footer">
              <div className="label">Chọn thuật ngữ đúng</div>
              <div className="div-btnAction">
                <Button className="btn" type="text">
                  Đúng
                </Button>
                <Button className="btn" type="text">
                  Sai
                </Button>
                <Button className="btn" type="text">
                  Đúng
                </Button>
                <Button className="btn" type="text">
                  Sai
                </Button>
              </div>
            </div>
          </div> */}

            {/* <div className="question_v3">
            <div className="header">
              <div className="title1">
                <div className="content">Định nghĩa</div>
                <div className="count">1/20</div>
              </div>
              <div className="text">interfere with Sth</div>
            </div>
            <div className="footer">
              <div className="label">Đáp án của bạn</div>
              <div className="div-btnAction">
                <Input
                  placeholder="Nhập đáp án"
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
                    backgroundColor: "var(--background-color)",
                  }}
                  bordered={false}
                  //   onChange={(e) => handleChangeNameLesson(e)}
                />
              </div>
            </div>
          </div> */}
            <div className="btnSubmit">
              <Button
                className="btnBack"
                onClick={() => handleNavigateLessonPage(dataLesson)}
              >
                Quay lại
              </Button>
              <Button className="btn" onClick={handleSubmitTest}>
                Gửi bài kiểm tra
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Test_Lesson;
