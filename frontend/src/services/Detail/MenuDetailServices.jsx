import api from "../../api/auth";

const DetailMenuServices = (selectedOptions,HeaderOptionClick) => {
    return api.post("/detailmenuoption", selectedOptions,HeaderOptionClick);
};


export { DetailMenuServices };
