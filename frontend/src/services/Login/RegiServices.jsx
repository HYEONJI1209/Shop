import api from "../../api/auth";

const RegisterServices = (formData) => {
  return api.post("/resData", formData);
};

const GetRegisterServices = () => {
  return api.get("/getresData");
};


export { RegisterServices, GetRegisterServices };
