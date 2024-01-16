import React, { useEffect, useState } from "react";
import { Select, message, Button, Popconfirm } from "antd";
import { EditFilled, DeleteFilled } from "@ant-design/icons";
import { deleteVocabulary } from "../../../apiService/vocabulary.service";
import ModalUpdateVocabulary from "./ModalUpdateVocabulary";
const SingleVocabulary = (props) => {
  const { id, value_vi, value_en, lessonId } = props.item;
  const valueDefaultSelect = props.valueDefaultSelect;
  const fetchListVocabulary = props.fetchListVocabulary;
  const confirm = async (e) => {
    //       const response = await deleteALesson(e);
    const response = await deleteVocabulary(e, lessonId);
    if (response) {
      message.success("Delete a vocabulary successfully!");
      fetchListVocabulary(valueDefaultSelect);
    } else message.error("Failed to delete vocabulary!");
  };
  const cancel = (e) => {
    console.log("Click cancel");
  };

  //Modal update
  const [openModalUpdateVocabulary, setOpenModalUpdateVocabulary] =
    useState(false);
  return (
    <div className="div-Vocabulary">
      <div className="div-English">{value_en}</div>
      <div className="div-Vietnamese">{value_vi}</div>
      <div className="div-Action">
        <Popconfirm
          title={`Delete a vocabulary ?`}
          description="Are you sure to delete this vocabulary?"
          onConfirm={() => confirm(id)}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <Button
            icon={<DeleteFilled />}
            style={{ color: "red", fontSize: "17px" }}
            type="text"
          />
        </Popconfirm>

        <Button
          icon={<EditFilled />}
          type="text"
          style={{ fontSize: "17px" }}
          onClick={() =>
            setOpenModalUpdateVocabulary(!openModalUpdateVocabulary)
          }
        />
      </div>
      <ModalUpdateVocabulary
        openModalUpdateVocabulary={openModalUpdateVocabulary}
        setOpenModalUpdateVocabulary={setOpenModalUpdateVocabulary}
        dataUpdateVocabulary={props.item}
        valueDefaultSelect={valueDefaultSelect}
        fetchListVocabulary={fetchListVocabulary}
      />
    </div>
  );
};
export default SingleVocabulary;
