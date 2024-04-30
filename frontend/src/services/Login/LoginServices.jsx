import api from "../../api/auth";

const LoginServices = (formData) => {
    return api.post("/login", formData);
};

export { LoginServices };