import api from "../../api/auth";

const DetailMenuServices = (selectedOptions,HeaderOptionClick) => {
    return api.post("/detailmenuoption", selectedOptions,HeaderOptionClick);
};

const EachServices = (clickedItem) => {
    return api.post("/eachItems",clickedItem)
}

const SimilarServices = (cliPosition) => {
    return api.post("/similarItems",cliPosition)
}

export { DetailMenuServices, EachServices, SimilarServices };
