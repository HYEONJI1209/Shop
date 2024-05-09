module.exports = (sequelize, Sequelize) => {
    const RegisModels = sequelize.define("Registration", {
        fileurl: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        size: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        price: {
            type: Sequelize.NUMBER,
            allowNull: false,
        },
        explanation: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        productName: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true
        },
        position: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        option: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    }, {
        freezeTableName: true
    })
    return RegisModels;
};
