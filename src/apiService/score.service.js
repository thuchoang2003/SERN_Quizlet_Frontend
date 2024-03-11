import instance from "../utils/customizeAxios";

const getAllScoreByUserID = (userId) => {
  const data = instance.get(`score/getAllScoreByUserID/${userId}`);
  return data;
};
const create = (userId, lessonId, correctAnswer, incorrectAnswer) => {
  const data = {
    userId: userId,
    lessonId: lessonId,
    correctAnswer: correctAnswer,
    incorrectAnswer: incorrectAnswer,
  };
  const result = instance.post("score/create", data);
  return result;
};
export { getAllScoreByUserID, create };
