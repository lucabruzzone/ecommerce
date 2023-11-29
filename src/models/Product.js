const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Product', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        discount: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        available: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: true
        },
        image: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        }
    }, { timestamps: true })
}