module.exports = app => {
    const controller = require('../../controller/login/SignUpController');

    const express = require('express');
    const router = express.Router();

    router.post("/signup", controller.SignUpController);

    app.use('/api', router);
}