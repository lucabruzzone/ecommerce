const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: true
        },
        sendMailsActive: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        firstName: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        phoneNumber: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        address: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        zipCode: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(255),
            unique: true,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
    }, { timestamps: true })
}