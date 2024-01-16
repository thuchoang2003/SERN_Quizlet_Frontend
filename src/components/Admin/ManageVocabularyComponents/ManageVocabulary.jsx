import React, { useEffect, useState } from "react";
import { Empty, Select, message } from "antd";
import "../../../assets/scss/ManageVocabulary.scss";
import { getAllLessons } from "../../../apiService/lesson.service";
import { getAllVocabularyByLessonID } from "../../../apiService/vocabulary.service";
import SingleVocabulary from "./SingleVocabulary";
import FormAddMultipleVocabulary from "./FormAddMultipleVocabulary";
const ManageVocabulary = () => {
  const OPTIONS = ["Apples", "Nails", "Bananas", "Helicopters"];
  const [selectedItems, setSelectedItems] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [valueDefaultSelect, setValueDefaultSelect] = useState();
  const [dataListVocabulary, setDataListVocabulary] = useState([]);
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
    console.log(value);
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
        <div className="div-Select">
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
