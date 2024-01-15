import React, { useState } from "react";
import { Button, Modal, message, Upload, Table } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import * as XLSX from "xlsx/xlsx.mjs";
import dataListUser from "./dataListUser.xlsx?url";
import { createNewUser } from "../../../apiService/user.service";
const ModalImportUser = (props) => {
  const { openModalImportListUser, setOpenModalImportListUser } = props;
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const [dataImportUser, setDataImportUser] = useState();
  const areEmailsUnique = (emailArray) => {
    const uniqueEmails = new Set(emailArray);
    return uniqueEmails.size === emailArray.length;
  };

  const callAPIPostListUser = async () => {
    try {
      if (areEmailsUnique) {
        const defaultPassword = "123456";
        const createdUsers = [];
        for (const userData of dataImportUser) {
          const { Email, Fullname, Role } = userData;
          const createdUser = await createNewUser(
            Email,
            defaultPassword,
            Fullname,
            Role
          );
          if (createdUser) {
            createdUsers.push(createdUser);
          } else {
            throw new Error("Import data failed!");
          }
        }

        if (createdUsers.length > 0) {
          message.success("Import data successfully!");
          setDataImportUser([]);
          props.fetchDataUser();
        } else {
          console.error("Error Import List User");
        }
      } else throw new Error("Email is existed!");
    } catch (error) {
      console.error("Error:", error.message);
      message.error(error.message);
    }
  };

  const handleOk = () => {
    setConfirmLoading(true);
    callAPIPostListUser();
    setTimeout(() => {
      setOpenModalImportListUser(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    setOpenModalImportListUser(false);
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
        setDataImportUser([]);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
        const file = info.fileList[0].originFileObj;
        const data = await file.arrayBuffer();
        const workbook = XLSX.read(data);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, {
          header: ["Email", "Fullname", "Role"],
          range: 1,
        });
        console.log(jsonData);
        setDataImportUser(jsonData);
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
        title="Import data user"
        open={openModalImportListUser}
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
              href={dataListUser}
              download
              id="download"
              style={{ marginLeft: "10px" }}
              onClick={(event) => event.stopPropagation()}
            >
              Download file
            </a>
          </p>
        </Dragger>
        <TableDataUserUpload dataImportUser={dataImportUser} />
      </Modal>
    </>
  );
};

const TableDataUserUpload = (props) => {
  const { dataImportUser } = props;
  const columns = [
    {
      title: "Email",
      dataIndex: "Email",
      key: "Email",
    },
    {
      title: "Fullname",
      dataIndex: "Fullname",
      key: "Fullname",
    },
    {
      title: "Role",
      dataIndex: "Role",
      key: "Role",
    },
  ];
  return (
    <>
      <div style={{ margin: "15px 0px", fontSize: "16px" }}>
        Table data upload:
      </div>
      <Table dataSource={dataImportUser} columns={columns} />
    </>
  );
};

export default ModalImportUser;
