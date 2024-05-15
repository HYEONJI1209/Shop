module.exports = (sequelize, Sequelize) => {
    const RegisModels = sequelize.define("Registration", {
        fileurl: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        fileurl2: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        fileurl3: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        fileurl4: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        fileName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        fileName2: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        fileName3: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        fileName4: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        size: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        price: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        // explanation: {
        //     type: Sequelize.TEXT,
        //     allowNull: true,
        // },
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
