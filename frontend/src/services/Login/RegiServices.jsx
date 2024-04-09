import api from "../../api/auth";

const RegisterServices = (formData) => {
  return api.post("/resData", formData);
};


export { RegisterServices };
