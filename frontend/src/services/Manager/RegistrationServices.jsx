import api from "../../api/auth";

const PostRegistration = (formData) => {
    return api.post("/postregistration", formData);
};

export { PostRegistration };