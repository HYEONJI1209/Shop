module.exports = app => {
    const controller = require('../../controller/Menu/DetailMenuController');

    const path = require("path");

    const express = require('express');
    const router = express.Router();

    router.post("/detailmenuoption", controller.MenuController);
    router.post("/eachItems", controller.EachItemController);
    router.post("/similarItems", controller.SimilarItemController);

    app.use(
        "/uploads",
        express.static(path.join(__dirname, "../../uploads"))
    );
    app.use('/api', router);
}