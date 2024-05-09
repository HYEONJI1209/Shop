const database = require("../../Model");
const signUp = database.SignUpDB;
const bcrypt = require('bcrypt');

const SignUpController = async (req, res) => {
        const userData = {
        userID: req.body.userID,
        userPW: bcrypt.hashSync(req.body.userPW, 10),
        userEmail: req.body.userEmail,
    }

    signUp.create(userData)
    .then(data => {
        if (data != null) {
            res.send({ data: data, message: "SUCCESS" });
        } else {
            res.send({ data: null, message: "FAIL" });
        }
    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    });

};

module.exports = { SignUpController };