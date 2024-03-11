import instance from "../utils/customizeAxios";
const getAllVocabulary = async () => {
  try {
    const response = await instance.get("vocabulary/getAllVocabulary");
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
const getAllVocabularyByLessonID = async (lessonId) => {
  try {
    const response = await instance.get(
      `vocabulary/getAllVocabularyByLessonId/${lessonId}`
    );
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
const deleteVocabulary = async (id, lessonId) => {
  try {
    const response = await instance.delete(
      `vocabulary/delete/${id}&${lessonId}`
    );
    if (response) {
      return response;
    } else {
      throw new Error("Failed to delete a vocabulary");
    }
  } catch (error) {
    console.error("Error in delete a vocabulary:", error.message);
    throw error;
  }
};
const updateVocabulary = async (id, value_en, value_vi, lessonId) => {
  try {
    if (!id) {
      throw new Error("ID is required");
    }
    const data = {
      value_en: value_en,
      value_vi: value_vi,
    };
    const response = await instance.put(
      `vocabulary/update/${id}&${lessonId}`,
      data
    );
    if (response) {
      return response;
    } else {
      throw new Error("Failed to update a vocabulary");
    }
  } catch (error) {
    console.error("Error in update a vocabulary:", error.message);
    throw error;
  }
};
const createMultipleVocabulary = async (vocabularies) => {
  try {
    const response = await instance.post(
      `vocabulary/createMultiple`,
      vocabularies
    );
    if (response) {
      return response;
    } else {
      throw new Error("Failed to update a vocabulary");
    }
  } catch (error) {
    console.error("Error in update a vocabulary:", error.message);
    throw error;
  }
};
const createVocabulary = async (value_en, value_vi, lessonId) => {
  try {
    const data = {
      value_en: value_en,
      value_vi: value_vi,
      lessonId: lessonId,
    };
    const response = await instance.post(`vocabulary/create`, data);
    if (response) {
      return response;
    } else {
      throw new Error("Failed to update a vocabulary");
    }
  } catch (error) {
    console.error("Error in update a vocabulary:", error.message);
    throw error;
  }
};

export {
  getAllVocabulary,
  getAllVocabularyByLessonID,
  deleteVocabulary,
  updateVocabulary,
  createMultipleVocabulary,
  createVocabulary,
};
