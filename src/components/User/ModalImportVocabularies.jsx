import React, { useState } from "react";
import { Button, Modal, message, Upload, Table } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import * as XLSX from "xlsx/xlsx.mjs";
import { createMultipleVocabulary } from "../../apiService/vocabulary.service";
const ModalImportVocabularies = (props) => {
  const {
    openModalImportVocabularies,
    setOpenModalImportVocabularies,
    fetchDataVocabularies,
    id,
  } = props;
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const [dataImportVocabulary, setDataImportVocabulary] = useState();

  const callAPIPostListVocabularies = async () => {
    try {
      let dataTmp = dataImportVocabulary.map((item) => {
        return {
          value_en: item.Value_en,
          value_vi: item.Value_vi,
          lessonId: id,
        };
      });
      const result = await createMultipleVocabulary(dataTmp);
      if (result) {
        message.success("Import multiple vocabularies successfully!");
        await fetchDataVocabularies();
      } else {
        console.error("Error:", error.message);
        message.error(error.message);
      }
    } catch (error) {
      console.error("Error:", error.message);
      message.error(error.message);
    }
  };

  const handleOk = () => {
    setConfirmLoading(true);
    callAPIPostListVocabularies();
    setTimeout(() => {
      setOpenModalImportVocabularies(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    setOpenModalImportVocabularies(false);
  };
  const { Dragger } = Upload;
  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 2000);
  };
  const propsUpload = {
    name: "file",
    multiple: false,
    maxCount: 1,
    //   action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    accept:
      ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel",
    customRequest: dummyRequest,
    async onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
        setDataImportVocabulary([]);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
        const file = info.fileList[0].originFileObj;
        const data = await file.arrayBuffer();
        const workbook = XLSX.read(data);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, {
          header: ["Value_en", "Value_vi"],
          range: 1,
        });
        console.log(jsonData);
        setDataImportVocabulary(jsonData);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  return (
    <>
      <Modal
        title="Import Multiple Vocabularies"
        open={openModalImportVocabularies}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width={800}
        maskClosable={false}
      >
        <Dragger {...propsUpload}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Only accept .csv .xls .xlsx
            <a
              href={dataImportVocabulary}
              download
              id="download"
              style={{ marginLeft: "10px" }}
              onClick={(event) => event.stopPropagation()}
            >
              Download file
            </a>
          </p>
        </Dragger>
        <TableDataUserUpload dataImportVocabulary={dataImportVocabulary} />
      </Modal>
    </>
  );
};

const TableDataUserUpload = (props) => {
  const { dataImportVocabulary } = props;
  const columns = [
    {
      title: "Thuật ngữ",
      dataIndex: "Value_en",
      key: "Value_en",
    },
    {
      title: "Định nghĩa",
      dataIndex: "Value_vi",
      key: "Value_vi",
    },
  ];
  return (
    <>
      <div style={{ margin: "15px 0px", fontSize: "16px" }}>
        Table data upload:
      </div>
      <Table dataSource={dataImportVocabulary} columns={columns} />
    </>
  );
};

export default ModalImportVocabularies;
