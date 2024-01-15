import instance from "../utils/customizeAxios";
const getAllLessons = async () => {
  try {
    const response = await instance.get("lesson/getAllLesson");
    if (response && response.data) {
      return response.data;
    } else {
      throw new Error("Failed to fetch lessons");
    }
  } catch (error) {
    console.error("Error in getAllLessons:", error.message);
    throw error;
  }
};

const createNewLesson = async (name, userid) => {
  try {
    if (!name) {
      throw new Error("Lesson name is required");
    }
    if (!userid) {
      throw new Error("UserID is required");
    }

    const data = {
      name: name,
      userid: userid,
    };

    const response = await instance.post("lesson/create", data);
    if (response && response.data) {
      return response.data;
    } else {
      throw new Error("Failed to create lesson");
    }
  } catch (error) {
    console.error("Error in createNewLesson:", error.message);
    throw error;
  }
};
const deleteALesson = async (lessonId) => {
  try {
    const response = await instance.delete(`lesson/delete/${lessonId}`);
    if (response) {
      return response;
    } else {
      throw new Error("Failed to fetch lessons");
    }
  } catch (error) {
    console.error("Error in delete a lesson:", error.message);
    throw error;
  }
};
const updateALesson = async (id, name, userid) => {
  try {
    if (!id) {
      throw new Error("ID is required");
    }
    if (!name) {
      throw new Error("Lesson name is required");
    }
    if (!userid) {
      throw new Error("UserID is required");
    }
    const data = {
      name: name,
      userid: userid,
    };
    const response = await instance.put(`lesson/update/${id}`, data);
    if (response) {
      return response;
    } else {
      throw new Error("Failed to fetch lessons");
    }
  } catch (error) {
    console.error("Error in update a lesson:", error.message);
    throw error;
  }
};
const getAllLessonWithPaginate = async (
  current,
  pageSize,
  id,
  name,
  username
) => {
  const res = await instance.get(
    `lesson/getAllLessonWithPaginate?current=${current}&pageSize=${pageSize}&id=${id}&name=${name}&username=${username}`
  );
  return res;
};

export {
  getAllLessons,
  createNewLesson,
  deleteALesson,
  updateALesson,
  getAllLessonWithPaginate,
};
