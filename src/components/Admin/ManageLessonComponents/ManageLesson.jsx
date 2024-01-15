import InputSearchLesson from "./InputSearchLesson";
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
import {
  getAllLessons,
  deleteALesson,
  getAllLessonWithPaginate,
} from "../../../apiService/lesson.service";
import ModalCreateNewLesson from "./ModalCreateNewLesson";
import ModalUpdateLesson from "./ModalUpdateLesson";
const RenderHeaderTableLesson = (props) => {
  const { setOpenModalCreateLesson, fetchDataLesson } = props;
  return (
    <>
      <div
        className="headerTableLesson"
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
            icon={<PlusOutlined />}
            onClick={() => {
              setOpenModalCreateLesson(true);
            }}
          >
            Thêm mới
          </Button>
          <Button icon={<ReloadOutlined />} onClick={() => fetchDataLesson()} />
        </div>
      </div>
    </>
  );
};
const ManageLesson = () => {
  //Modal Create Lesson
  const [openModalCreateLesson, setOpenModalCreateLesson] = useState(false);
  //Modal Update Lesson
  const [openModalUpdateLesson, setOpenModalUpdateLesson] = useState(false);
  const [dataUpdateLesson, setDataUpdateLesson] = useState({});
  //State
  const [dataSource, setDataSource] = useState([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(7);
  const [total, setTotal] = useState();
  const [inputIDSearch, setInputIDSearch] = useState("");
  const [inputNameSearch, setInputNameSearch] = useState("");
  const [inputUsernameSearch, setInputUsernameSearch] = useState("");
  const handleChangeInputSearch = (id, name, username) => {
    setInputIDSearch(id);
    setInputNameSearch(name);
    setInputUsernameSearch(username);
  };
  const handleChangePage = (current, pageSize) => {
    setCurrent(current);
    setPageSize(pageSize);
  };
  const fetchDataLesson = async () => {
    const response = await getAllLessonWithPaginate(
      current,
      pageSize,
      inputIDSearch,
      inputNameSearch,
      inputUsernameSearch
    );
    const listLessons = await getAllLessons();
    //Modify dataSource
    const dataSourceModify = response.data?.map((item, index) => {
      return {
        id: item.id,
        name: item.name,
        fullname: item.fullname,
        userid: item.userid,
      };
    });
    if (response && listLessons) {
      setTotal(listLessons.length);
      setDataSource(dataSourceModify);
    }
  };
  useEffect(() => {
    fetchDataLesson();
  }, [
    current,
    pageSize,
    total,
    inputIDSearch,
    inputNameSearch,
    inputUsernameSearch,
  ]);
  const confirm = async (e) => {
    const response = await deleteALesson(e);
    if (response) {
      message.success("Delete a lesson successfully!");
      fetchDataLesson();
    } else message.error("Failed to delete lesson!");
  };
  const cancel = (e) => {
    console.log("Click cancel");
  };
  //Columns Table Lesson
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
      title: "Lesson Title",
      dataIndex: "name",
      key: "name",
      sorter: true,
    },

    {
      title: "Username",
      dataIndex: "fullname",
      key: "fullname",
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
              title={`Delete a lesson ${record.name}`}
              description="Are you sure to delete this lesson?"
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
                // setOpenModalUpdateUser(!openModalUpdateUser);
                setOpenModalUpdateLesson(!openModalUpdateLesson);
                setDataUpdateLesson(record);
                // setDataUpdateUser(record);
              }}
            ></Button>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <InputSearchLesson handleChangeInputSearch={handleChangeInputSearch} />
      <RenderHeaderTableLesson
        setOpenModalCreateLesson={setOpenModalCreateLesson}
        fetchDataLesson={fetchDataLesson}
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
      <ModalCreateNewLesson
        openModalCreateLesson={openModalCreateLesson}
        setOpenModalCreateLesson={setOpenModalCreateLesson}
        fetchDataLesson={fetchDataLesson}
      />
      <ModalUpdateLesson
        openModalUpdateLesson={openModalUpdateLesson}
        setOpenModalUpdateLesson={setOpenModalUpdateLesson}
        fetchDataLesson={fetchDataLesson}
        dataUpdateLesson={dataUpdateLesson}
      />
    </>
  );
};
export default ManageLesson;
