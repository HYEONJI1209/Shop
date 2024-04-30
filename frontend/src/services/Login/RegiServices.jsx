import api from "../../api/auth";

const RegisterServices = (formData) => {
  return api.post("/resData", formData);
};

const GetRegisterServices = () => {
  return api.get("/getresData");
};

const checkEmailDuplicate = async (email) => {
  try {
      const response = await api.post("/checkEmail", { email });
      return response.data;
  } catch (error) {
      throw new Error("Error checking email duplication: " + error.message);
  }
};

export { RegisterServices, GetRegisterServices, checkEmailDuplicate };
