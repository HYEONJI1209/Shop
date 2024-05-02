import api from "../../api/auth";

const DetailMenuServices = (headerData) => {
    return api.post("/detailmenuoption", headerData);
};


export { DetailMenuServices };
