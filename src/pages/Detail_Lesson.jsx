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
  SoundOutlined,
  UsbTwoTone,
} from "@ant-design/icons";
import { Button, Dropdown, message, Popconfirm } from "antd";
import FlashCard from "../components/User/FlashCard";
import { getAllVocabularyByLessonID } from "../apiService/vocabulary.service";
import {
  getLessonByLessonId,
  deleteALesson,
} from "../apiService/lesson.service";
import imageLogin from "../assets/images/imageLogin.png";
import { useSelector } from "react-redux";
import * as XLSX from "xlsx/xlsx.mjs";
import ModalImportVocabularies from "../components/User/ModalImportVocabularies";

import { getUserByID } from "../apiService/user.service";
const Detail_Lesson = (props) => {
  let location = useLocation();
  let navigate = useNavigate();
  let params = new URLSearchParams(location.search);
  const id = params.get("id");
  const [listVocabulary, setListVocabulary] = useState([]);
  const [dataDetailLesson, setDataDetailLesson] = useState();
  const [authorData, setAuthorData] = useState();
  //state open modal import data
  const [openModalImportVocabularies, setOpenModalImportVocabularies] =
    useState(false);
  const fetchDataLessonByID = async () => {
    try {
      const [dataListVocabulary, dataDetailLesson] = await Promise.all([
        getAllVocabularyByLessonID(id),
        getLessonByLessonId(id),
      ]);

      if (dataDetailLesson) {
        const result = await getUserByID(dataDetailLesson.data.userid);
        setAuthorData(result.data);
      }
      if (dataListVocabulary) {
        setListVocabulary(dataListVocabulary);
        setDataDetailLesson(dataDetailLesson);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const userData = useSelector((state) => state.account.user);
  const postDeleteLesson = async (id) => {
    const response = await deleteALesson(id);
    if (response) {
      message.success("Delete a lesson sucessfully!");
      navigate("/home");
    } else message.error("Something is error!");
  };
  const confirm = (e) => {
    if (userData.id !== authorData.id) {
      message.info("Bạn không có quyền xoá !");
    } else {
      postDeleteLesson(id);
    }
  };
  const cancel = (e) => {
    console.log(e);
  };
  const handleExportData = () => {
    if (listVocabulary.length > 0) {
      const worksheet = XLSX.utils.json_to_sheet(listVocabulary);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      XLSX.writeFile(workbook, "DataExportVocabulary.xlsx");
    }
  };
  const itemsDropDownAction = [
    {
      key: "2",
      label: (
        <>
          <Popconfirm
            title="Delete the lesson"
            description="Are you sure to delete this lesson?"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
            placement="bottom"
          >
            <div
              style={{
                display: "flex",
                gap: "15px",
                alignItems: "center",
                padding: "5px 10px",
              }}
            >
              <DeleteOutlined
                style={{
                  fontSize: "1.3rem",
                  fontWeight: "600",
                  color: "#7f889e",
                }}
              />
              <span
                style={{
                  fontSize: "1rem",
                  fontWeight: "600",
                  color: "#7f889e",
                }}
              >
                Xoá
              </span>
            </div>
          </Popconfirm>
        </>
      ),
    },
    {
      key: "3",
      label: (
        <>
          <div
            style={{
              display: "flex",
              gap: "15px",
              alignItems: "center",
              padding: "5px 10px",
            }}
          >
            <ImportOutlined
              style={{
                fontSize: "1.3rem",
                fontWeight: "600",
                color: "#7f889e",
              }}
            />
            <span
              style={{
                fontSize: "1rem",
                fontWeight: "600",
                color: "#7f889e",
              }}
              onClick={() => {
                if (userData.id !== authorData.id) {
                  message.info(
                    "Bạn không có quyền chỉnh sửa với bài học này !"
                  );
                } else
                  setOpenModalImportVocabularies(!openModalImportVocabularies);
              }}
            >
              Nhúng file csv
            </span>
          </div>
        </>
      ),
    },
    {
      key: "4",
      label: (
        <>
          <div
            style={{
              display: "flex",
              gap: "15px",
              alignItems: "center",
              padding: "5px 10px",
            }}
          >
            <ExportOutlined
              style={{
                fontSize: "1.3rem",
                fontWeight: "600",
                color: "#7f889e",
              }}
            />
            <span
              style={{
                fontSize: "1rem",
                fontWeight: "600",
                color: "#7f889e",
              }}
              onClick={() => handleExportData()}
            >
              Xuất ra file csv
            </span>
          </div>
        </>
      ),
    },
  ];
  useEffect(() => {
    fetchDataLessonByID();
  }, []);

  const handlePlayAudio = (value) => {
    let synth = speechSynthesis;
    let utternance = new SpeechSynthesisUtterance(value);
    synth.speak(utternance);
  };
  return (
    <>
      <div
        style={{
          width: "100%",
          backgroundColor: "#f6f7fb",
          height: "calc(100% - 60px)",
        }}
      >
        <div className="container_lesson_detail">
          {dataDetailLesson && (
            <span className="title">{dataDetailLesson.data.name}</span>
          )}

          <div className="div-function">
            <div
              className="div-function__item"
              onClick={() => {
                navigate(`/lesson/flashcard?id=${id}`);
              }}
            >
              <FolderOpenFilled className="div-function__item--icon" />
              Thẻ ghi nhớ
            </div>
            <div
              className="div-function__item"
              onClick={() => {
                if (userData.id !== authorData.id)
                  message.info("Bạn không được cấp quyền để làm việc này !");
                else navigate(`/lesson/test?id=${id}`);
              }}
            >
              <SnippetsFilled className="div-function__item--icon" />
              Kiểm tra
            </div>
            <div
              className="div-function__item"
              onClick={() => {
                if (userData.id !== authorData.id)
                  message.info("Bạn không được cấp quyền để làm việc này !");
                else navigate(`/lesson/pairing?id=${id}`);
              }}
            >
              <BuildFilled className="div-function__item--icon" />
              Ghép thẻ
            </div>
          </div>
          {listVocabulary && (
            <FlashCard
              listVocabulary={listVocabulary}
              fetchDataLessonByID={fetchDataLessonByID}
              dataDetailLesson={dataDetailLesson}
            />
          )}
          <div className="div-action">
            <div className="userLink">
              <div className="userLink-divItem">
                <img src={authorData?.image} alt="" />
              </div>
              <div className="userLink-divText">
                <span className="userLink-divText_title">Tạo bởi</span>
                <span className="userLink-divText_name">
                  {authorData?.fullname}
                </span>
              </div>
            </div>
            <div className="action">
              {/* <Button
                icon={
                  <UploadOutlined
                    style={{ fontWeight: "600", fontSize: "1.2rem" }}
                  />
                }
                className="action_item share"
                type="text"
              >
                Chia sẻ
              </Button> */}
              <Button
                icon={
                  <EditOutlined
                    style={{ fontWeight: "600", fontSize: "1.2rem" }}
                  />
                }
                className="action_item"
                type="text"
                onClick={() => {
                  if (userData.id !== authorData.id) {
                    message.info("Bạn không có quyền chỉnh sửa bài học này !");
                  } else {
                    navigate(`/lesson/edit?id=${id}`);
                  }
                }}
              />
              <Dropdown
                menu={{
                  items: itemsDropDownAction,
                }}
                placement="bottomRight"
              >
                <Button
                  icon={
                    <EllipsisOutlined
                      style={{ fontWeight: "600", fontSize: "1.2rem" }}
                    />
                  }
                  className="action_item"
                  type="text"
                />
              </Dropdown>
            </div>
          </div>
        </div>
        <ModalImportVocabularies
          openModalImportVocabularies={openModalImportVocabularies}
          setOpenModalImportVocabularies={setOpenModalImportVocabularies}
          fetchDataVocabularies={fetchDataLessonByID}
          id={id}
        />

        <div className="div-showMyListCard">
          <div className="label">
            <span>Các thuật ngữ trong học phần này:</span>
          </div>

          <div className="div-main">
            {listVocabulary &&
              listVocabulary.map((item, index) => {
                return (
                  <div className="item">
                    <div className="item_left">
                      <span className="text">{item.value_en}</span>
                    </div>
                    <div className="item_right">
                      <span className="text">{item.value_vi}</span>
                    </div>
                    <div className="action">
                      <SoundOutlined
                        style={{
                          fontSize: "1.3rem",
                          cursor: "pointer",
                        }}
                        onClick={() => handlePlayAudio(item.value_en)}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};
export default Detail_Lesson;
