module.exports = (sequelize, Sequelize) => {
    const SignupModels = sequelize.define("SignUp", {
        ID: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true
        },
        PW: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        Email: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    }, {
        freezeTableName: true
    })
    return SignupModels;
};
