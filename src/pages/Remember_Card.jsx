import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FolderOpenFilled,
  CloseOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Input } from "antd";
import "../assets/scss/Remember_Card.scss";
import { getAllVocabularyByLessonID } from "../apiService/vocabulary.service";
import {
  getLessonByLessonId,
  deleteALesson,
} from "../apiService/lesson.service";
import FlashCard from "../components/User/FlashCard";
import "../assets/scss/Detail_Lesson.scss";
const Remember_Card = (props) => {
  let location = useLocation();
  let params = new URLSearchParams(location.search);
  const id = params.get("id");
  const [listVocabulary, setListVocabulary] = useState([]);
  const [dataDetailLesson, setDataDetailLesson] = useState();

  const fetchDataLessonByID = async () => {
    try {
      const [dataListVocabulary, dataDetailLesson] = await Promise.all([
        getAllVocabularyByLessonID(id),
        getLessonByLessonId(id),
      ]);

      if (dataListVocabulary) {
        setListVocabulary(dataListVocabulary);
        setDataDetailLesson(dataDetailLesson);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchDataLessonByID();
  }, []);
  return (
    <>
      <div className="div-backgroundFlashCard">
        <div className="flashcard_container">
          {listVocabulary && (
            <FlashCard
              listVocabulary={listVocabulary}
              fetchDataLessonByID={fetchDataLessonByID}
              dataDetailLesson={dataDetailLesson}
            />
          )}
        </div>
      </div>
    </>
  );
};
export default Remember_Card;
