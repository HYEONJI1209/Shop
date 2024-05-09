module.exports = app => {
    const controller = require('../../controller/Manager/RegistrarionController');

    const express = require('express');
    const router = express.Router();

    router.post("/postregistration", controller.RegistrarionController);

    app.use('/api', router);
}