const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Comment', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        },
        rate: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    }, { timestamps: true })
}