import instance from "../utils/customizeAxios";

const getAllUser = () => {
  const data = instance.get("users/getAllUser");
  return data;
};
const getAllUserWithPaginate = (current, pageSize, fullname, email) => {
  const data = instance.get(
    `users/getAllUserWithPaginate?current=${current}&pageSize=${pageSize}&fullname=${fullname}&email=${email}`
  );
  return data;
};
const createNewUser = (email, password, fullname, role) => {
  const data = {
    email: email,
    password: password,
    fullname: fullname ? fullname : email.split("@")[0],
    image: null,
    role: role,
  };
  const res = instance.post("users/create", data);
  return res;
};
const deleteUser = (id) => {
  const data = instance.delete(`users/delete/${id}`);
  return data;
};
const updateUser = (id, fullname, image, role) => {
  const data = { fullname, image, role };
  const response = instance.put(`users/update/${id}`, data);
  return response;
};
export {
  getAllUser,
  createNewUser,
  getAllUserWithPaginate,
  deleteUser,
  updateUser,
};
