import api from "../../api/auth";

const ResetPassServices = (password) => {
    return api.post("/resetps", { password });
};

export { ResetPassServices };