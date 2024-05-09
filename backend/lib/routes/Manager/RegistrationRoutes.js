module.exports = app => {
    const controller = require('../../controller/Manager/RegistrarionController');

    const express = require('express');
    const router = express.Router();

    router.post("/postregistration", controller.RegisterController);

    app.use('/api', router);
}