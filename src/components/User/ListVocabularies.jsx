import React, { forwardRef, useEffect, useState } from "react";
import {
  LeftOutlined,
  PlusOutlined,
  SettingOutlined,
  DeleteOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Input, Divider, Spin } from "antd";
import {
  getAllVocabularyByLessonID,
  createVocabulary,
  updateVocabulary,
  deleteVocabulary,
  createMultipleVocabulary,
} from "../../apiService/vocabulary.service";
import { updateALesson } from "../../apiService/lesson.service";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const ListVocabularies = forwardRef((props, ref) => {
  const {
    dataListVocabularies,
    setDataListVocabularies,
    fetchDataVocabularies,
    dataLesson,
    convertSlug,
    nonAccentVietnamese,
  } = props;

  let navigate = useNavigate();
  const userData = useSelector((state) => state.account.user);
  const handleAddCard = () => {
    // Clone the current data array and add a new item
    const newDataList = [
      ...dataListVocabularies,
      { value_en: "", value_vi: "" },
    ];
    setDataListVocabularies(newDataList);
  };
  const [spinning, setSpinning] = useState(false);
  const handleSubmit = async () => {
    setSpinning(!spinning);
    const listDataOld = await getAllVocabularyByLessonID(dataLesson.id);
    if (listDataOld) {
      console.log("check list Data Old", listDataOld);
      console.log("check list data New", dataListVocabularies);
      // Lấy danh sách các id từ cả hai mảng
      const idsOld = listDataOld.map((item) => item.id);
      const idsNew = dataListVocabularies.map((item) => item.id);
      // Tìm các id cần xoá (có mặt trong listDataOld nhưng không có trong dataListVocabularies)
      const idsToDelete = idsOld.filter((id) => !idsNew.includes(id));

      // Tìm các id cần cập nhật (có mặt trong cả hai mảng)
      const idsToUpdate = idsOld.filter((id) => idsNew.includes(id));

      // Tìm các id cần thêm mới (có mặt trong dataListVocabularies nhưng không có trong listDataOld)
      const idsToCreate = idsNew.filter((id) => !idsOld.includes(id));

      // Thực hiện xoá
      for (const idToDelete of idsToDelete) {
        await deleteVocabulary(idToDelete, dataLesson.id);
      }

      // Thực hiện cập nhật
      for (const idToUpdate of idsToUpdate) {
        const indexInOld = listDataOld.findIndex(
          (item) => item.id === idToUpdate
        );
        const indexInNew = dataListVocabularies.findIndex(
          (item) => item.id === idToUpdate
        );

        // Kiểm tra xem có phần tử tương ứng trong cả hai danh sách không
        if (indexInOld !== -1 && indexInNew !== -1) {
          // Kiểm tra xem có sự thay đổi giữa giá trị cũ và mới không
          if (
            listDataOld[indexInOld].value_vi !==
              dataListVocabularies[indexInNew].value_vi ||
            listDataOld[indexInOld].value_en !==
              dataListVocabularies[indexInNew].value_en
          ) {
            const { value_en, value_vi } = dataListVocabularies[indexInNew];
            await updateVocabulary(
              idToUpdate,
              value_en,
              value_vi,
              dataLesson.id
            );
          }
        }
      }
      let dataTmp = [];
      for (const item of dataListVocabularies) {
        if (item.id === undefined) {
          dataTmp.push({
            value_en: item.value_en,
            value_vi: item.value_vi,
            lessonId: dataLesson.id,
          });
        }
      }
      console.log("check data tmp", dataTmp);
      await createMultipleVocabulary(dataTmp);
    }
    await updateALesson(dataLesson.id, ref.current.input.value, userData.id);
    let result = convertSlug(ref.current.input.value);
    navigate(`/lesson/${result}?id=${dataLesson.id}`);
  };

  const handleChangeInput = (e, index) => {
    const { name, value } = e.target;
    let dataTmp = dataListVocabularies.map((item, i) => {
      return i == index ? { ...item, [name]: value } : item;
    });
    setDataListVocabularies(dataTmp);
  };
  const handleClickDeleteInput = (index) => {
    let arrTmp = [...dataListVocabularies];
    arrTmp.splice(index, 1);
    setDataListVocabularies(arrTmp);
  };

  return (
    <>
      <div className="container-listVocabularies">
        {dataListVocabularies && dataListVocabularies.length > 0
          ? dataListVocabularies.map((item, index) => {
              return (
                <div className="item" key={item.id}>
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
          <Spin
            indicator={
              <LoadingOutlined
                style={{
                  fontSize: 24,
                }}
                spin
              />
            }
            spinning={spinning}
            style={{ marginRight: "10px", color: "white" }}
          />
          Hoàn tất
        </Button>
      </div>
    </>
  );
});
function areEqual(prevProps, nextProps) {
  return (
    prevProps.trackingDataListVocabularies ===
    nextProps.trackingDataListVocabularies
  );
}
export default React.memo(ListVocabularies, areEqual);
