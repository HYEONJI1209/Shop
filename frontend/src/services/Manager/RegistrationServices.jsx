import api from "../../api/auth";

const PostRegistration = (formData) => {
    return api.post("/postregistration", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
};
export { PostRegistration };