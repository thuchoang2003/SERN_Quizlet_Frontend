import React, { useEffect, useState } from "react";
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
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  PlayCircleOutlined,
  CaretRightOutlined,
  PauseOutlined,
} from "@ant-design/icons";
import ReactCardFlip from "react-card-flip";
import { set } from "nprogress";
import { useLocation, useNavigate } from "react-router-dom";
const FlashCard = (props) => {
  const { listVocabulary, fetchDataLessonByID, dataDetailLesson } = props;
  let navigate = useNavigate();

  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAutoScroll, setIsAutoScroll] = useState(false);
  const handleNextCard = () => {
    if (currentCard < listVocabulary.length - 1) {
      setCurrentCard(currentCard + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevCard = () => {
    if (currentCard > 0) {
      setCurrentCard(currentCard - 1);
      //   setIsFlipped(!isFlipped);
    }
  };
  const handleClickFlashCard = () => {
    setIsFlipped(!isFlipped);
  };
  const handleClickAutomaticPlay = () => {
    setIsAutoScroll(!isAutoScroll);
  };
  useEffect(() => {
    let intervalId;

    const handleNextAndFlip = () => {
      if (currentCard < listVocabulary.length - 1) {
        handleNextCard();
      } else {
        // Stop automatic scrolling when the last card is reached
        clearInterval(intervalId);
        setIsAutoScroll(false);
      }
    };

    if (isAutoScroll) {
      intervalId = setInterval(handleNextAndFlip, 2500);
    }

    return () => {
      // Clear interval when component unmounts or isAutoScroll becomes false
      if (currentCard > listVocabulary.length) clearInterval(intervalId);
      clearInterval(intervalId);
    };
  }, [isAutoScroll, currentCard, isFlipped]);

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
      {listVocabulary && listVocabulary.length && (
        <>
          <ReactCardFlip flipDirection="vertical" isFlipped={isFlipped}>
            <div className="text" onClick={() => handleClickFlashCard()}>
              {listVocabulary[currentCard].value_en}
            </div>
            <div
              className="text text-back"
              onClick={() => handleClickFlashCard()}
            >
              {listVocabulary[currentCard].value_vi}
            </div>
          </ReactCardFlip>

          <div className="flashcard_footer">
            <div className="div-playBtn">
              <Button
                icon={
                  !isAutoScroll ? <CaretRightOutlined /> : <PauseOutlined />
                }
                className="flashcard_footer--btn"
                type="text"
                onClick={handleClickAutomaticPlay}
              />
            </div>
            <Button
              icon={<ArrowLeftOutlined />}
              className="flashcard_footer--btn"
              type="text"
              onClick={handlePrevCard}
            />
            <span>
              {currentCard + 1}/{listVocabulary.length}
            </span>
            <Button
              icon={<ArrowRightOutlined />}
              className="flashcard_footer--btn"
              type="text"
              onClick={handleNextCard}
            />
            <Button
              type="text"
              style={{
                width: "100px",
                height: "40px",
                border: "2px solid #cccc",
                fontSize: "1.1rem",
                fontWeight: "600",
              }}
              onClick={() => {
                let result = convertSlug(dataDetailLesson.data.name);
                navigate(`/lesson/${result}?id=${dataDetailLesson.data.id}`);
              }}
              className="btnBack"
            >
              Quay lại
            </Button>
          </div>
          <div className="divider"></div>
        </>
      )}
    </>
  );
};
export default FlashCard;
