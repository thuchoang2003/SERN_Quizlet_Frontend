import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, Dropdown, message, Popconfirm, Input } from "antd";

import { useSelector, useDispatch } from "react-redux";
import { getAllVocabularyByLessonID } from "../apiService/vocabulary.service";
import Chart from "chart.js/auto";
import { Doughnut, Pie } from "react-chartjs-2";
import "../assets/scss/Result_Test.scss";
import { create } from "../apiService/score.service";
const Result_Test = (props) => {
  const location = useLocation();
  const answerDataByUser = location.state && location.state.answer;

  const id = location.state && location.state.id;
  const userData = useSelector((state) => state.account.user);
  const answerRandomByVerson1 =
    location.state && location.state.answerRandomByVerson1;
  const answerRandomByVerson2 =
    location.state && location.state.answerRandomByVerson2;
  console.log("check answerDataByUser", answerDataByUser);
  console.log("check answerRandomByVerson1", answerRandomByVerson1);
  console.log("check answerRandomByVerson2", answerRandomByVerson2);
  const [countTrueAnswer, setCountTrueAnswer] = useState(0);
  const [countFalseAnswer, setCountFalseAnswer] = useState(0);
  const [dataListVocabulary, setDataListVocabularies] = useState([]);
  const [listResult, setListResult] = useState([]);
  const navigate = useNavigate();
  const convertIdToFormat = (id) => {
    if (id) {
      while (id.length < 3) {
        id = "0" + id;
      }

      return "VC" + id;
    }
    // Thêm các số 0 vào trước để đảm bảo có độ dài là 3
  };
  const getIdQuestion = (str) => {
    const parts = str.split("-")[1];
    return convertIdToFormat(parts);
  };
  const fetchDataVocabularies = async () => {
    const dataListVocabularies = await getAllVocabularyByLessonID(id);
    console.log(dataListVocabularies);
    setDataListVocabularies(dataListVocabularies);
    let arrTmp = dataListVocabularies.map((element) => {
      return element.value_vi;
    });
    setListResult(arrTmp);
    if (dataListVocabularies) {
      let countTrue = 0;
      let countFalse = 0;
      for (let i = 0; i < answerDataByUser.length; i++) {
        // let idQuestionByUser = getIdQuestion(answerDataByUser[i].questionId);
        // let idQuestionByUser = answerDataByUser[i].questionId;
        // for (let j = 0; j < dataListVocabularies.length; j++) {
        //   const element = dataListVocabularies[j];
        //   if (element.id == idQuestionByUser) {
        //     if (answerDataByUser[i].isCorrect !== undefined) {
        //       if (answerDataByUser[i].isCorrect) {
        //         if (
        //           element.value_vi === answerDataByUser[i].value_vi &&
        //           element.value_en === answerDataByUser[i].value_en
        //         ) {
        //           countTrue++;
        //         } else {
        //           countFalse++;
        //         }
        //       } else {
        //         if (
        //           element.value_vi !== answerDataByUser[i].value_vi &&
        //           element.value_en === answerDataByUser[i].value_en
        //         ) {
        //           countTrue++;
        //         } else {
        //           countFalse++;
        //         }
        //       }
        //     }
        //     else if (answerDataByUser[i].listAnswer !== undefined) {
        //       if (
        //         answerDataByUser[i].value_vi === element.value_vi &&
        //         element.value_en === answerDataByUser[i].value_en
        //       )
        //         countTrue++;
        //       else countFalse++;
        //     } else {
        //       if (
        //         answerDataByUser[i].value_vi === element.value_vi &&
        //         element.value_en === answerDataByUser[i].value_en
        //       )
        //         countTrue++;
        //       else countFalse++;
        //     }
        //   }
        // }
        const userAnswer = answerDataByUser[i];
        const questionId = userAnswer.questionId;
        const vocabulary = dataListVocabularies.find(
          (v) => v.id === questionId
        );
        console.log("check vola", vocabulary);
        if (userAnswer.isCorrect !== undefined) {
          if (userAnswer.isCorrect) {
            if (userAnswer.value_vi == vocabulary.value_vi) countTrue++;
          } else if (!userAnswer.isCorrect) {
            if (userAnswer.value_vi !== vocabulary.value_vi) countTrue++;
          }
        } else if (userAnswer.listAnswer !== undefined) {
          if (userAnswer.value_vi == vocabulary.value_vi) countTrue++;
        } else {
          if (userAnswer.value_vi == vocabulary.value_vi) countTrue++;
        }
      }

      setCountTrueAnswer(countTrue);
      setCountFalseAnswer(dataListVocabularies.length - countTrue);
      // if (!hasMounted.current) {
      console.log("check call");
      await create(userData.id, id, countTrue, dataListVocabularies.length);
      // }
    }
  };

  useEffect(() => {
    fetchDataVocabularies();
  }, []);
  const data = {
    labels: ["Đúng", "Sai"],
    datasets: [
      {
        label: "True/False",
        data: [countTrueAnswer, countFalseAnswer],
        backgroundColor: ["#59e7b5", "#fe973c"],
        hoverOffset: 3,
      },
    ],
  };

  const findAnswerdV1 = (arrayAnswerByUser, vocabularyItem) => {
    let optionByUser = undefined;
    for (let i = 0; i < arrayAnswerByUser.length; i++) {
      if (
        // vocabularyItem.id === getIdQuestion(arrayAnswerByUser[i].questionId)
        vocabularyItem.id === arrayAnswerByUser[i].questionId
      ) {
        optionByUser = arrayAnswerByUser[i].isCorrect;
        if (
          (arrayAnswerByUser[i].isCorrect &&
            vocabularyItem.value_vi === arrayAnswerByUser[i].value_vi) ||
          (!arrayAnswerByUser[i].isCorrect &&
            vocabularyItem.value_vi !== arrayAnswerByUser[i].value_vi)
        ) {
          return {
            isCorrect: true,
            optionChooseByUser: arrayAnswerByUser[i].isCorrect,
          };
        }
      }
    }
    return {
      isCorrect: false,
      optionChooseByUser: optionByUser,
    };
  };

  const findAnswerV2 = (arrayAnswerByUser, vocabularyItem) => {
    let optionByUser = undefined;
    for (let i = 0; i < arrayAnswerByUser.length; i++) {
      if (
        // vocabularyItem.id === getIdQuestion(arrayAnswerByUser[i].questionId)
        vocabularyItem.id === arrayAnswerByUser[i].questionId
      ) {
        optionByUser = arrayAnswerByUser[i].value_vi;
        if (
          vocabularyItem.value_vi === arrayAnswerByUser[i].value_vi &&
          vocabularyItem.value_en === arrayAnswerByUser[i].value_en
        ) {
          return {
            isCorrect: true,
            optionChooseByUser: arrayAnswerByUser[i].value_vi,
          };
        }
      }
    }
    return {
      isCorrect: false,
      optionChooseByUser: optionByUser,
    };
  };
  const getFourAnswerRandomV2 = (answerRandomByVerson2, vocabularyItem) => {
    for (let i = 0; i < answerRandomByVerson2.length; i++) {
      if (
        // vocabularyItem.id === getIdQuestion(answerRandomByVerson2[i].questionId)
        vocabularyItem.id === answerRandomByVerson2[i].questionId
      ) {
        return {
          fourAnswer: answerRandomByVerson2[i]?.fourAnswer,
          positionCorrectAnswer: answerRandomByVerson2[i].positionCorrectAnswer,
          value_Correct: answerRandomByVerson2[i].value_Correct,
        };
      }
    }
  };
  const findAnswerV3 = (arrayAnswerByUser, vocabularyItem) => {
    let optionChooseByUser = undefined;
    for (let i = 0; i < arrayAnswerByUser.length; i++) {
      if (
        // vocabularyItem.id === getIdQuestion(arrayAnswerByUser[i].questionId)
        vocabularyItem.id === arrayAnswerByUser[i].questionId
      ) {
        optionChooseByUser = arrayAnswerByUser[i].value_vi;
        if (
          vocabularyItem.value_vi === arrayAnswerByUser[i].value_vi &&
          vocabularyItem.value_en === arrayAnswerByUser[i].value_en
        ) {
          return {
            isCorrect: true,
            optionChooseByUser: arrayAnswerByUser[i].value_vi,
          };
        }
      }
    }
    return {
      isCorrect: false,
      optionChooseByUser: optionChooseByUser,
    };
  };

  return (
    <>
      <div className="div-background">
        <div className="div-result">
          <div className="main">
            <span className="title">Kết quả bài kiểm tra</span>
            <div className="main-content">
              <Doughnut data={data} />
              <div className="div-count">
                <div className="true">
                  <span className="label">Đúng</span>
                  <span className="count">{countTrueAnswer}</span>
                </div>
                <div className="false">
                  <span className="label">Sai</span>
                  <span className="count">{countFalseAnswer}</span>
                </div>
                <Button
                  type="text"
                  className="btn"
                  onClick={() => navigate("/home")}
                >
                  Trở lại trang chủ
                </Button>
              </div>
            </div>
            {dataListVocabulary &&
              dataListVocabulary.length > 0 &&
              dataListVocabulary.map((item, index) => {
                if (index < dataListVocabulary.length / 3) {
                  return (
                    <div className="question">
                      <div className="header">
                        <div className="left">
                          <div className="title1">Định nghĩa</div>
                          <div className="text">{item.value_en}</div>
                        </div>
                        <div className="right">
                          <div className="title1">
                            <div className="content">Thuật ngữ</div>
                            <div className="count">
                              {index + 1} / {dataListVocabulary.length}
                            </div>
                          </div>
                          <div className="text">
                            {answerRandomByVerson1[index]}
                          </div>
                        </div>
                      </div>
                      <div className="footer">
                        {findAnswerdV1(answerDataByUser, item).isCorrect && (
                          <div className="label" style={{ color: "#22b17f" }}>
                            Tuyệt vời
                          </div>
                        )}
                        {findAnswerdV1(answerDataByUser, item).isCorrect ===
                          false &&
                          findAnswerdV1(answerDataByUser, item)
                            .optionChooseByUser !== undefined && (
                            <div className="label" style={{ color: "#b40e2c" }}>
                              Đừng lo, bạn vẫn đang học mà!
                            </div>
                          )}
                        {findAnswerdV1(answerDataByUser, item)
                          .optionChooseByUser === undefined && (
                          <div className="label" style={{ color: "#b40e2c" }}>
                            Sai mất rồi, Đừng bỏ sót câu hỏi nhé!
                          </div>
                        )}
                        <div className="div-btnAction">
                          <Button
                            className={`btn`}
                            style={{
                              borderColor: findAnswerdV1(answerDataByUser, item)
                                .optionChooseByUser
                                ? findAnswerdV1(answerDataByUser, item)
                                    .isCorrect
                                  ? "green"
                                  : "#ff7873"
                                : findAnswerdV1(answerDataByUser, item)
                                    .optionChooseByUser === undefined &&
                                  answerRandomByVerson1[index] === item.value_vi
                                ? "green"
                                : "",
                              backgroundColor: findAnswerdV1(
                                answerDataByUser,
                                item
                              ).optionChooseByUser
                                ? findAnswerdV1(answerDataByUser, item)
                                    .isCorrect
                                  ? "#e7fcf5"
                                  : "white"
                                : findAnswerdV1(answerDataByUser, item)
                                    .optionChooseByUser === undefined &&
                                  answerRandomByVerson1[index] === item.value_vi
                                ? "#e7fcf5"
                                : "", // Set an empty string or any default color when optionChooseByUser is false
                            }}
                            icon={
                              findAnswerdV1(answerDataByUser, item)
                                .optionChooseByUser ? (
                                findAnswerdV1(answerDataByUser, item)
                                  .isCorrect ? (
                                  <CheckOutlined
                                    style={{
                                      color: "green",
                                      fontSize: "1.1rem",
                                    }}
                                  />
                                ) : (
                                  <CloseOutlined
                                    style={{
                                      color: "#ff7873",
                                      fontSize: "1.1rem",
                                    }}
                                  />
                                )
                              ) : (
                                <></>
                              )
                            }
                          >
                            Đúng
                          </Button>
                          <Button
                            className={`btn`}
                            type="text"
                            style={{
                              borderColor:
                                findAnswerdV1(answerDataByUser, item)
                                  .optionChooseByUser === false
                                  ? findAnswerdV1(answerDataByUser, item)
                                      .isCorrect
                                    ? "green"
                                    : "#ff7873"
                                  : findAnswerdV1(answerDataByUser, item)
                                      .optionChooseByUser === undefined &&
                                    answerRandomByVerson1[index] !==
                                      item.value_vi
                                  ? "green"
                                  : "",
                              backgroundColor:
                                findAnswerdV1(answerDataByUser, item)
                                  .optionChooseByUser === false
                                  ? findAnswerdV1(answerDataByUser, item)
                                      .isCorrect
                                    ? "#e7fcf5"
                                    : "rgba(180,14,44,0.1)"
                                  : findAnswerdV1(answerDataByUser, item)
                                      .optionChooseByUser === undefined &&
                                    answerRandomByVerson1[index] !==
                                      item.value_vi
                                  ? "#e7fcf5"
                                  : "",
                              // Set an empty string or any default color when optionChooseByUser is false
                            }}
                            icon={
                              findAnswerdV1(answerDataByUser, item)
                                .optionChooseByUser === false ? (
                                findAnswerdV1(answerDataByUser, item)
                                  .isCorrect ? (
                                  <CheckOutlined
                                    style={{
                                      color: "green",
                                      fontSize: "1.1rem",
                                    }}
                                  />
                                ) : (
                                  <CloseOutlined
                                    style={{
                                      color: "#ff7873",
                                      fontSize: "1.1rem",
                                    }}
                                  />
                                )
                              ) : (
                                <></>
                              )
                            }
                          >
                            Sai
                          </Button>
                        </div>
                        <div
                          style={{
                            fontSize: "1rem",
                            height: "40px",
                            color: "#586380",
                            margin: "20px 0px 0px 0px",
                          }}
                        >
                          Thuật ngữ chính xác:
                        </div>
                        <div style={{ fontSize: "1.4rem", fontWeight: 100 }}>
                          {item.value_vi}
                        </div>
                      </div>
                    </div>
                  );
                } else if (
                  index >= dataListVocabulary.length / 3 &&
                  index < (2 * dataListVocabulary.length) / 3
                ) {
                  const checkAnswer = findAnswerV2(answerDataByUser, item);
                  const checkFourAnswer = getFourAnswerRandomV2(
                    answerRandomByVerson2,
                    item
                  );

                  return (
                    <div className="question_v2">
                      <div className="header">
                        <div className="title1">
                          <div className="content">Định nghĩa</div>
                          <div className="count">
                            {index + 1} / {dataListVocabulary.length}
                          </div>
                        </div>
                        <div className="text">{item.value_en}</div>
                      </div>
                      <div className="footer">
                        {checkAnswer.isCorrect && (
                          <div className="label" style={{ color: "#22b17f" }}>
                            Tuyệt vời
                          </div>
                        )}
                        {checkAnswer.isCorrect === false &&
                          checkAnswer.optionChooseByUser !== undefined && (
                            <div className="label" style={{ color: "#b40e2c" }}>
                              Đừng lo, bạn vẫn đang học mà!
                            </div>
                          )}
                        {checkAnswer.optionChooseByUser === undefined && (
                          <div className="label" style={{ color: "#b40e2c" }}>
                            Sai mất rồi, Đừng bỏ sót câu hỏi nhé!
                          </div>
                        )}

                        <div className="div-btnAction">
                          {checkFourAnswer?.fourAnswer?.map((item, index) => {
                            if (index == checkFourAnswer.positionCorrectAnswer)
                              return (
                                <Button
                                  className={`btn btn-${index + 1}`}
                                  type="text"
                                  style={{
                                    borderColor:
                                      checkAnswer.optionChooseByUser ===
                                      checkFourAnswer.value_Correct
                                        ? checkAnswer.isCorrect
                                          ? "green"
                                          : "#ff7873"
                                        : checkAnswer.optionChooseByUser !==
                                          checkFourAnswer.value_Correct
                                        ? "green"
                                        : "",
                                    backgroundColor:
                                      checkAnswer.optionChooseByUser ===
                                      checkFourAnswer.value_Correct
                                        ? checkAnswer.isCorrect
                                          ? "#e7fcf5"
                                          : "#ff7873"
                                        : checkAnswer.optionChooseByUser !==
                                          checkFourAnswer.value_Correct
                                        ? "#e7fcf5"
                                        : "", // Set an empty string or any default color when optionChooseByUser is false
                                  }}
                                  icon={
                                    checkAnswer.optionChooseByUser ===
                                    checkFourAnswer.value_Correct ? (
                                      checkAnswer.isCorrect ? (
                                        <CheckOutlined
                                          style={{
                                            color: "green",
                                            fontSize: "1.1rem",
                                          }}
                                        />
                                      ) : (
                                        <CloseOutlined
                                          style={{
                                            color: "#ff7873",
                                            fontSize: "1.1rem",
                                          }}
                                        />
                                      )
                                    ) : checkAnswer.optionChooseByUser !==
                                      checkFourAnswer.value_Correct ? (
                                      <CheckOutlined
                                        style={{
                                          color: "green",
                                          fontSize: "1.1rem",
                                        }}
                                      />
                                    ) : (
                                      ""
                                    )
                                  }
                                >
                                  {checkFourAnswer.value_Correct}
                                </Button>
                              );
                            else
                              return (
                                <Button
                                  className={`btn btn-${index + 1}`}
                                  type="text"
                                  style={{
                                    borderColor:
                                      checkAnswer.optionChooseByUser === item
                                        ? checkAnswer.isCorrect
                                          ? "green"
                                          : "#ff7873"
                                        : "", // Set an empty string or any default color when optionChooseByUser is false
                                  }}
                                  icon={
                                    checkAnswer.optionChooseByUser === item ? (
                                      checkAnswer.isCorrect ? (
                                        <CheckOutlined
                                          style={{
                                            color: "green",
                                            fontSize: "1.1rem",
                                          }}
                                        />
                                      ) : (
                                        <CloseOutlined
                                          style={{
                                            color: "#ff7873",
                                            fontSize: "1.1rem",
                                          }}
                                        />
                                      )
                                    ) : (
                                      ""
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
                  const checkAnswerV3 = findAnswerV3(answerDataByUser, item);
                  return (
                    <div className="question_v3">
                      <div className="header">
                        <div className="title1">
                          <div className="content">Định nghĩa</div>
                          <div className="count">
                            {index + 1} / {dataListVocabulary.length}
                          </div>
                        </div>
                        <div className="text">{item.value_en}</div>
                      </div>
                      <div className="footer">
                        <div className="label">Đáp án của bạn</div>
                        <div className="div-btnAction">
                          {/* <Input
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
                          value={
                            checkAnswerV3.optionChooseByUser
                              ? checkAnswerV3.optionChooseByUser
                              : "Bạn đã bỏ qua"
                          }
                        /> */}
                          <Button
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
                              backgroundColor: checkAnswerV3.isCorrect
                                ? "#e7fcf5"
                                : "rgba(255,202,200,0.8)",
                              border: `2px solid ${
                                checkAnswerV3.isCorrect ? "green" : "#ff7873"
                              }`,
                              textAlign: "start",
                            }}
                            type="text"
                            icon={
                              checkAnswerV3.isCorrect ? (
                                <CheckOutlined
                                  style={{
                                    color: "green",
                                    fontSize: "1.1rem",
                                  }}
                                />
                              ) : (
                                <CloseOutlined
                                  style={{
                                    color: "#ff7873",
                                    fontSize: "1.1rem",
                                  }}
                                />
                              )
                            }
                          >
                            {checkAnswerV3.optionChooseByUser
                              ? checkAnswerV3.optionChooseByUser
                              : "Bạn đã bỏ qua"}
                          </Button>
                          <div className="label" style={{ marginTop: "10px" }}>
                            Đáp án đúng
                          </div>
                          <Button
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
                              backgroundColor: "#e7fcf5",
                              textAlign: "start",
                              border: "2px solid #22b17f",
                            }}
                            type="text"
                            icon={
                              <CheckOutlined
                                style={{
                                  color: "green",
                                  fontSize: "1.1rem",
                                }}
                              />
                            }
                          >
                            {item.value_vi}
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
          </div>
        </div>
      </div>
    </>
  );
};
export default Result_Test;
