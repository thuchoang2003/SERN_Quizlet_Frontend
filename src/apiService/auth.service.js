import instance from "../utils/customizeAxios";
const postLogin = async (email, password) => {
  try {
    const data = {
      email: email,
      password: password,
    };
    const response = await instance.post("/auth/login", data);
    return response;
  } catch (error) {
    console.log(error);
  }
};
const resetPassword = async (current_password, new_password) => {
  try {
    const data = {
      current_password: current_password,
      new_password: new_password,
    };
    const response = await instance.post("/auth/reset-password", data);
    return response;
  } catch (error) {
    console.log(error);
  }
};
export { postLogin, resetPassword };
