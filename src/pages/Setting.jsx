import React, { useEffect, useState } from "react";
import {
  SearchOutlined,
  PlusOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import {
  Dropdown,
  Space,
  Row,
  Col,
  Button,
  Input,
  Divider,
  Form,
  message,
  Avatar,
  Menu,
  Tabs,
  Upload,
  Popconfirm,
} from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import "../assets/scss/Setting.scss";
import imageLogin from "../assets/images/imageLogin.png";
import default_1 from "../assets/images/avatar/default_1.jpg";
import default_2 from "../assets/images/avatar/default_2.jpg";
import default_3 from "../assets/images/avatar/default_3.jpg";
import default_4 from "../assets/images/avatar/default_4.jpg";
import default_5 from "../assets/images/avatar/default_5.jpg";
import default_6 from "../assets/images/avatar/default_6.jpg";
import default_7 from "../assets/images/avatar/default_7.jpg";
import default_8 from "../assets/images/avatar/default_8.jpg";
import default_9 from "../assets/images/avatar/default_9.jpg";
import default_10 from "../assets/images/avatar/default_10.jpg";
import default_11 from "../assets/images/avatar/default_11.jpg";
import default_12 from "../assets/images/avatar/default_12.jpg";
import default_13 from "../assets/images/avatar/default_13.jpg";
import default_14 from "../assets/images/avatar/default_14.jpg";
import default_15 from "../assets/images/avatar/default_15.jpg";
import default_16 from "../assets/images/avatar/default_16.jpg";
import default_17 from "../assets/images/avatar/default_17.jpg";
import default_18 from "../assets/images/avatar/default_18.jpg";
import default_19 from "../assets/images/avatar/default_19.jpg";
import default_20 from "../assets/images/avatar/default_20.jpg";
import ModalChangeUsername from "../components/User/ModalChangeUsername";
import { useDispatch, useSelector } from "react-redux";
import ModalUpdatePassword from "../components/User/ModalUpdatePassword";
import { updateUser, deleteUser } from "../apiService/user.service";
import { doUpdateAvatar } from "../redux/counter/accountSlice";
const Setting = (props) => {
  const location = useLocation();
  let params = new URLSearchParams(location.search);
  const id = params.get("id");
  const [openModalChangeUsername, setOpenModalChangeUsername] = useState(false);
  const [openModalUpdatePassword, setOpenModalUpdatePassword] = useState(false);
  const imageList = [
    default_1,
    default_2,
    default_3,
    default_4,
    default_5,
    default_6,
    default_7,
    default_8,
    default_9,
    default_10,
    default_11,
    default_12,
    default_13,
    default_14,
    default_15,
    default_16,
    default_17,
    default_18,
    default_19,
    default_20,
  ];

  const [loading, setLoading] = useState(false);
  const userData = useSelector((state) => state.account.user);
  const base64Image = userData.image;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleUpdateAvatar = async (item) => {
    const base64Image = await convertImageToBase64(item);
    if (base64Image) {
      const response = await updateUser(
        userData.id,
        userData.fullname,
        base64Image,
        userData.role
      );
      if (response) {
        message.success("Cập nhật ảnh đại diện thành công !");
        dispatch(doUpdateAvatar(response.data.image));
      } else message.error("Cập nhật ảnh đại diện thất bại !");
    }
  };

  const convertImageToBase64 = async (imagePath) => {
    // Đọc hình ảnh từ đường dẫn và chuyển đổi thành base64
    try {
      const response = await fetch(imagePath);
      const blob = await response.blob();

      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64Image = reader.result;
          resolve(base64Image);
        };
        reader.onerror = reject;

        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const customRequest = async ({ file, onSuccess, onError }) => {
    try {
      const base64String = await getBase64(file);
      const response = await updateUser(
        userData.id,
        userData.fullname,
        base64String,
        userData.role
      );
      if (response.status == "true") {
        dispatch(doUpdateAvatar(response.data.image));
      }
      onSuccess();
      message.success("File uploaded successfully");
    } catch (error) {
      onError(error);
      message.error("Error uploading file");
    }
  };
  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);

      reader.readAsDataURL(file);
    });
  };
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };
  const handleChange = async (info) => {
    console.log(info.file);
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      try {
        // const base64 = await getBase64(info.file.originFileObj);
        setLoading(false);
      } catch (error) {
        console.error("Error converting image to base64:", error);
      }
    }
  };
  const confirm = async (e) => {
    console.log(e);
    const response = await deleteUser(userData.id);
    if (response) {
      message.success("Xoá tài khoản thành công!");
      navigate("/login");
    }
  };
  return (
    <>
      <div className="div-backgroundSetting">
        <div className="container">
          <div className="header">Cài Đặt</div>
          <div className="main">
            <div className="label">Thông tin cá nhân</div>
            <div className="div-content">
              <div className="avatar">
                <div className="left">
                  <div className="text">Ảnh hồ sơ</div>
                  <Avatar className="image" src={base64Image} />
                </div>
                <div className="right">
                  {imageList &&
                    imageList.length > 0 &&
                    imageList.map((item, index) => {
                      return (
                        <>
                          <Avatar
                            src={item}
                            size={45}
                            className="avatar-default"
                            onClick={() => handleUpdateAvatar(item)}
                          />
                        </>
                      );
                    })}
                  {/* <Button
                    icon={<PlusOutlined style={{ fontSize: "1.2rem" }} />}
                    type="text"
                    style={{
                      borderRadius: "50%",
                      width: "45px",
                      height: "45px",
                      border: "1px solid #bdbdbd",
                    }}
                  /> */}
                  <Upload
                    name="avatar"
                    listType="picture-circle"
                    className="avatar-uploader"
                    showUploadList={false}
                    customRequest={customRequest}
                    beforeUpload={beforeUpload}
                    onChange={handleChange}
                  >
                    <Button
                      icon={<PlusOutlined />}
                      type="text"
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                      }}
                    />
                  </Upload>
                </div>
              </div>
              <div className="div-username">
                <div className="info">
                  <div className="info_label">Tên người dùng</div>
                  <div className="username">{userData.fullname}</div>
                </div>
                <Button
                  className="btn"
                  type="text"
                  onClick={() =>
                    setOpenModalChangeUsername(!openModalChangeUsername)
                  }
                >
                  Sửa
                </Button>
              </div>
              <div className="div-email">
                <div className="info">
                  <div className="info_label">Email</div>
                  <div className="username">{userData.email}</div>
                </div>
                {/* <Button className="btn" type="text">
                  Sửa
                </Button> */}
              </div>
              <div className="div-password">
                <div className="info">
                  <div className="info_label">Mật khẩu</div>
                </div>
                <Button
                  className="btn"
                  type="text"
                  onClick={() =>
                    setOpenModalUpdatePassword(!openModalUpdatePassword)
                  }
                >
                  Sửa
                </Button>
              </div>
              <div className="div-deleteAccount">
                <div className="info">
                  <div className="info_label">Xoá tài khoản</div>
                  <div className="username">
                    Thao tác này sẽ xóa tất cả dữ liệu của bạn và không thể hoàn
                    tác.
                  </div>
                </div>
                <Popconfirm
                  title="Delete the account"
                  description="Are you sure to delete this?"
                  onConfirm={confirm}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button className="btn" type="text">
                    Xoá tài khoản
                  </Button>
                </Popconfirm>
              </div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
      <ModalChangeUsername
        openModalChangeUsername={openModalChangeUsername}
        setOpenModalChangeUsername={setOpenModalChangeUsername}
        valueUsername={userData.fullname}
      />
      <ModalUpdatePassword
        openModalUpdatePassword={openModalUpdatePassword}
        setOpenModalUpdatePassword={setOpenModalUpdatePassword}
      />
    </>
  );
};
export default Setting;
