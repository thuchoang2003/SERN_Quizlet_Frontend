import React, { useEffect, useState } from "react";
import { Empty, Select, message, Button } from "antd";
import {
  DownloadOutlined,
  ImportOutlined,
  PlusOutlined,
  ReloadOutlined,
  DeleteOutlined,
  EditOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "../../../assets/scss/ManageVocabulary.scss";
import { getAllLessons } from "../../../apiService/lesson.service";
import { getAllVocabularyByLessonID } from "../../../apiService/vocabulary.service";
import SingleVocabulary from "./SingleVocabulary";
import FormAddMultipleVocabulary from "./FormAddMultipleVocabulary";
import ModalImportVocabulary from "./ModalImportVocabulary";
import * as XLSX from "xlsx/xlsx.mjs";
// import DataExportVocabulary from "./DataExportVocabulary.xlsx?url";

const ImportAndExport = (props) => {
  const {
    openModalImportVocabulary,
    setOpenModalImportVocabulary,
    valueDefaultSelect,
    fetchListVocabulary,
    dataListVocabulary,
  } = props;
  const handleExportData = () => {
    if (dataListVocabulary.length > 0) {
      const worksheet = XLSX.utils.json_to_sheet(dataListVocabulary);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      XLSX.writeFile(workbook, "DataExportVocabulary.xlsx");
    }
  };
  return (
    <>
      <div
        className="buttonImportAndExportVoca"
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          marginTop: "15px",
          marginRight: "20px",
        }}
      >
        <div className="div-btn" style={{ display: "flex", gap: "7px" }}>
          <Button
            type="primary"
            icon={<DownloadOutlined />}
            onClick={() => {
              handleExportData();
            }}
          >
            Export
          </Button>
          <Button
            type="primary"
            icon={<ImportOutlined />}
            onClick={() => setOpenModalImportVocabulary(true)}
          >
            Import
          </Button>
        </div>
      </div>
      <ModalImportVocabulary
        openModalImportVocabulary={openModalImportVocabulary}
        setOpenModalImportVocabulary={setOpenModalImportVocabulary}
        valueDefaultSelect={valueDefaultSelect}
        fetchListVocabulary={fetchListVocabulary}
      />
    </>
  );
};

const ManageVocabulary = () => {
  const OPTIONS = ["Apples", "Nails", "Bananas", "Helicopters"];
  const [selectedItems, setSelectedItems] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [valueDefaultSelect, setValueDefaultSelect] = useState();
  const [dataListVocabulary, setDataListVocabulary] = useState([]);

  //Modal Import Vocabulary
  const [openModalImportVocabulary, setOpenModalImportVocabulary] =
    useState(false);
  // const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o));
  const fetchListLesson = async () => {
    const res = await getAllLessons();
    if (res) {
      let dataSourceTmp = res.map((item) => {
        return {
          id: item.id,
          name: item.name,
        };
      });
      setFilteredOptions(
        dataSourceTmp.filter((o) => !selectedItems.includes(o))
      );
    }
  };
  const fetchListVocabulary = async (lessonId) => {
    if (lessonId) {
      const res = await getAllVocabularyByLessonID(lessonId);
      if (res) setDataListVocabulary(res);
      else message.error("Get list vocabulary failed!");
    }
  };
  const handleChange = async (value) => {
    setSelectedItems(value);
    setValueDefaultSelect(value);
    await fetchListVocabulary(value);
  };
  useEffect(() => {
    fetchListLesson();
  }, []);
  useEffect(() => {
    fetchListVocabulary(valueDefaultSelect);
  }, [setValueDefaultSelect]);

  return (
    <>
      <div className="div-ManageVocabulary">
        <div className="title">Select a lesson:</div>
        <div
          className="div-Select"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Select
            mode="single"
            placeholder="Choose the lesson"
            value={selectedItems}
            onChange={handleChange}
            style={{
              width: "55%",
            }}
            size="large"
            options={filteredOptions.map((item) => ({
              value: item.id,
              label: `${item.name} (${item.id})`,
            }))}
          />
          <ImportAndExport
            openModalImportVocabulary={openModalImportVocabulary}
            setOpenModalImportVocabulary={setOpenModalImportVocabulary}
            valueDefaultSelect={valueDefaultSelect}
            fetchListVocabulary={fetchListVocabulary}
            dataListVocabulary={dataListVocabulary}
          />
        </div>
        <div className="container-vocabulary">
          {dataListVocabulary.length > 0 &&
            dataListVocabulary.map((item, index) => {
              return (
                <SingleVocabulary
                  item={item}
                  valueDefaultSelect={valueDefaultSelect}
                  fetchListVocabulary={fetchListVocabulary}
                />
              );
            })}
        </div>
        {/* {dataListVocabulary.length === 0 && <Empty />} */}
        <FormAddMultipleVocabulary
          valueDefaultSelect={valueDefaultSelect}
          fetchListVocabulary={fetchListVocabulary}
        />
      </div>
    </>
  );
};
export default ManageVocabulary;
