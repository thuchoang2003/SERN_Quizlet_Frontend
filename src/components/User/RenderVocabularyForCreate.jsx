import React, { useEffect, useState } from "react";
import {
  LeftOutlined,
  PlusOutlined,
  SettingOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Input, Divider, message } from "antd";
import {
  getAllVocabularyByLessonID,
  createVocabulary,
  updateVocabulary,
  deleteVocabulary,
} from "../../apiService/vocabulary.service";
import { createNewLesson } from "../../apiService/lesson.service";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const ListVocabulariesForCreate = (props) => {
  const {
    dataListVocabulariesForCreate,
    setDataListVocabulariesForCreate,
    dataLesson,
    convertSlug,
    nonAccentVietnamese,
  } = props;
  let navigate = useNavigate();
  const userData = useSelector((state) => state.account.user);
  const handleAddCard = () => {
    const newDataList = [
      ...dataListVocabulariesForCreate,
      { value_en: "", value_vi: "" },
    ];
    setDataListVocabulariesForCreate(newDataList);
  };

  const handleSubmit = async () => {
    if (dataListVocabulariesForCreate.length === 0) {
      message.warning("Please create at least 1 vocabulary word");
    } else if (!dataLesson || dataLesson == null || dataLesson.length == 0) {
      message.warning("Please input your lesson name");
    } else {
      const idsToCreate = dataListVocabulariesForCreate.map((item) => item.id);
      const postCreateLesson = await createNewLesson(dataLesson, userData.id);
      if (postCreateLesson) {
        const lessonId = postCreateLesson.id;
        for (const item of dataListVocabulariesForCreate) {
          const { value_en, value_vi } = item;
          await createVocabulary(value_en, value_vi, lessonId);
        }
      }

      let result = convertSlug(postCreateLesson.name);
      navigate(`/lesson/${result}?id=${postCreateLesson.id}`);
    }
  };

  const handleChangeInput = (e, index) => {
    const { name, value } = e.target;
    let dataTmp = dataListVocabulariesForCreate.map((item, i) => {
      return i == index ? { ...item, [name]: value } : item;
    });
    setDataListVocabulariesForCreate(dataTmp);
  };
  const handleClickDeleteInput = (index) => {
    let arrTmp = [...dataListVocabulariesForCreate];
    arrTmp.splice(index, 1);
    setDataListVocabulariesForCreate(arrTmp);
  };
  const generateRandomString = () => {
    const characters =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    const uniqueCharacters = new Set();

    while (uniqueCharacters.size < 9) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      const randomChar = characters.charAt(randomIndex);

      uniqueCharacters.add(randomChar);
    }

    uniqueCharacters.forEach((char) => {
      result += char;
    });

    return result;
  };
  return (
    <>
      <div className="container-listVocabularies">
        {dataListVocabulariesForCreate &&
        dataListVocabulariesForCreate.length > 0
          ? dataListVocabulariesForCreate.map((item, index) => {
              return (
                <div className="item" key={`${item.id}-${index}`}>
                  <div className="header">
                    <span className="index">{index + 1}</span>
                    <Button
                      icon={<DeleteOutlined />}
                      type="text"
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                        border: "1px solid #bdbdbd",
                        color: "red",
                      }}
                      onClick={() => handleClickDeleteInput(index)}
                    />
                  </div>
                  <div className="partition"></div>
                  <div className="content">
                    <div className="left">
                      <div className="inputText">
                        <Input
                          bordered={false}
                          style={{ fontSize: "1.1rem" }}
                          defaultValue={item.value_en}
                          name="value_en"
                          onChange={(e) => handleChangeInput(e, index)}
                        />
                      </div>
                      <div className="divider"></div>
                      <span className="footer">Thuật ngữ</span>
                    </div>
                    <div className="right">
                      <div className="inputText">
                        <Input
                          bordered={false}
                          style={{ fontSize: "1.1rem" }}
                          defaultValue={item.value_vi}
                          name="value_vi"
                          onChange={(e) => handleChangeInput(e, index)}
                        />
                      </div>
                      <div className="divider"></div>
                      <span className="footer">Định nghĩa</span>
                    </div>
                  </div>
                </div>
              );
            })
          : null}
      </div>
      <div className="div-AddCard" onClick={handleAddCard}>
        <div className="content">
          <PlusOutlined style={{ fontSize: "1.2rem" }} />
          <span className="text">Thêm thẻ</span>
        </div>
        <div className="footer"></div>
      </div>
      <div className="divSubmit">
        <Button className="btnSubmit" onClick={handleSubmit}>
          Hoàn tất
        </Button>
      </div>
    </>
  );
};
export default ListVocabulariesForCreate;
