import React, { useEffect, useState } from "react";
import { Button, Table, Popconfirm, message, Avatar } from "antd";
import {
  DownloadOutlined,
  ImportOutlined,
  PlusOutlined,
  ReloadOutlined,
  DeleteOutlined,
  EditOutlined,
  UserOutlined,
} from "@ant-design/icons";
import InputSearchUser from "./InputSearchUser";
import axios from "axios";
import {
  getAllUser,
  getAllUserWithPaginate,
  deleteUser,
} from "../../../apiService/user.service";
import ModalCreateUser from "./ModalCreateUser";
import ModalImportUser from "./ModalImportListUser";
import * as XLSX from "xlsx/xlsx.mjs";
import ModalUpdateUser from "./ModalUpdateUser";
const RenderHeaderTableUser = (props) => {
  const {
    fetchDataUser,
    setOpenModalCreateUser,
    openModalCreateUser,
    setOpenModalImportListUser,
    dataSource,
  } = props;
  const handleExportData = () => {
    if (dataSource.length > 0) {
      const worksheet = XLSX.utils.json_to_sheet(dataSource);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      XLSX.writeFile(workbook, "DataExportUser.xlsx");
    }
  };
  return (
    <>
      <div
        className="headerTableUser"
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
            onClick={() => setOpenModalImportListUser(true)}
          >
            Import
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setOpenModalCreateUser(true);
            }}
          >
            Thêm mới
          </Button>
          <Button icon={<ReloadOutlined />} onClick={() => fetchDataUser()} />
        </div>
      </div>
    </>
  );
};

const ManageUser = (props) => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(7);
  const [total, setTotal] = useState();
  const [dataSource, setDataSource] = useState([]);

  //Modal Create User
  const [openModalCreateUser, setOpenModalCreateUser] = useState(false);
  //Modal Import User
  const [openModalImportListUser, setOpenModalImportListUser] = useState(false);
  //Modal Update
  const [openModalUpdateUser, setOpenModalUpdateUser] = useState(false);
  const [dataUpdateUser, setDataUpdateUser] = useState({});

  const handleChangeInputSearch = (fullname, email) => {
    setFullname(fullname);
    setEmail(email);
  };
  const handleChangePage = (page, pageSize) => {
    setCurrent(page);
    setPageSize(pageSize);
  };
  const fetchDataUser = async () => {
    const response = await getAllUserWithPaginate(
      current,
      pageSize,
      fullname,
      email
    );
    const listUsers = await getAllUser();
    //Modify dataSource
    console.log(response);
    const dataSourceModify = response.data?.map((item, index) => {
      return {
        id: item.id,
        image: item.image,
        fullname: item.fullname,
        email: item.email,
        role: item.role,
      };
    });
    console.log(dataSourceModify);
    if (response && listUsers) {
      setTotal(listUsers.data.length);
      setDataSource(dataSourceModify);
    }
  };
  useEffect(() => {
    fetchDataUser();
  }, [current, fullname, email]);

  const confirm = async (e) => {
    const response = await deleteUser(e);
    if (response) {
      message.success("Delete a user successfully!");
      fetchDataUser();
    } else message.error("Failed to delete user!");
  };
  const cancel = (e) => {
    console.log("Click cancel");
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: true,
      render: (text, record, index) => {
        return <a>{record.id}</a>;
      },
    },
    {
      title: "Avatar",
      dataIndex: "image",
      key: "image",
      render: (text, record, index) => {
        const imageAuthorize = ["", null, undefined];
        return imageAuthorize.includes(record.image) ? (
          <Avatar size="large" icon={<UserOutlined />} />
        ) : (
          <Avatar size="large" src={record.image} />
        );
      },
    },
    {
      title: "FullName",
      dataIndex: "fullname",
      key: "fullname",
      sorter: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: true,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      sorter: true,
    },
    {
      title: "Action",
      dataIndex: "Action",
      key: "Action",
      render: (text, record, index) => {
        return (
          <div>
            <Popconfirm
              title={`Delete user ${record.fullname}`}
              description="Are you sure to delete this user?"
              onConfirm={() => confirm(record.id)}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <Button
                icon={
                  <DeleteOutlined style={{ color: "red", fontSize: "17px" }} />
                }
                type="text"
              ></Button>
            </Popconfirm>

            <Button
              icon={<EditOutlined style={{ fontSize: "17px" }} />}
              type="text"
              onClick={() => {
                setOpenModalUpdateUser(!openModalUpdateUser);
                setDataUpdateUser(record);
              }}
            ></Button>
          </div>
        );
      },
    },
  ];
  return (
    <>
      <InputSearchUser handleChangeInputSearch={handleChangeInputSearch} />
      <RenderHeaderTableUser
        fetchDataUser={fetchDataUser}
        open={openModalCreateUser}
        setOpenModalCreateUser={setOpenModalCreateUser}
        setOpenModalImportListUser={setOpenModalImportListUser}
        dataSource={dataSource}
      />
      <Table
        dataSource={dataSource}
        columns={columns}
        style={{ paddingTop: 20 }}
        pagination={{
          current: current,
          pageSize: pageSize,
          total: total,
          pageSizeOptions: [5, 6, 7, 8],
          showSizeChanger: true,
          onChange: handleChangePage,
        }}
      />
      <ModalCreateUser
        open={openModalCreateUser}
        setOpenModalCreateUser={setOpenModalCreateUser}
        fetchDataUser={fetchDataUser}
      />
      <ModalImportUser
        openModalImportListUser={openModalImportListUser}
        setOpenModalImportListUser={setOpenModalImportListUser}
        fetchDataUser={fetchDataUser}
      />
      <ModalUpdateUser
        openModalUpdateUser={openModalUpdateUser}
        setOpenModalUpdateUser={setOpenModalUpdateUser}
        fetchDataUser={fetchDataUser}
        dataUpdateUser={dataUpdateUser}
      />
    </>
  );
};
export default ManageUser;
