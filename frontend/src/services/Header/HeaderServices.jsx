import api from "../../api/auth";

const HeaderServices = (headerData) => {
    return api.post("/headeroption", headerData);
};


export { HeaderServices };
