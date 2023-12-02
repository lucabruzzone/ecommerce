const { Size } = require('../db');

const allSizes = [
    { name: "34-XS", category: "clothes" },
    { name: "36-S", category: "clothes" },
    { name: "38-S/M", category: "clothes" },
    { name: "40-M", category: "clothes" },
    { name: "42- M/L", category: "clothes" },
    { name: "44-L", category: "clothes" },
    { name: "46-L/XL", category: "clothes" },
    { name: "48-XL", category: "clothes" },
    { name: "50-XL/XXL", category: "clothes" },
    { name: "52-XXL", category: "clothes" },
    { name: "38", category: "pants" },
    { name: "40", category: "pants" },
    { name: "42", category: "pants" },
    { name: "44", category: "pants" },
    { name: "46", category: "pants" },
    { name: "48", category: "pants" },
    { name: "50", category: "pants" },
    { name: "52", category: "pants" },
    { name: "54", category: "pants" },
    { name: "54", category: "pants" },
    { name: "56", category: "pants" },
    { name: "58", category: "pants" },
    { name: "60", category: "pants" }
];

const initializeSizes = async () => {
    try { // Ajusta esto según tus necesidades
        const sizesNames = allSizes.map(size => size.name) // extraemos solo los nombres de cada talla.
        const areTheyAlreadyCreated = await Size.findAll({ where: { name: sizesNames } });
        if (!areTheyAlreadyCreated.length) {
            await Size.bulkCreate(allSizes);
        }
        console.log('Tallas inicializadas con éxito.');
    } catch (error) {
        console.error('Error al inicializar las tallas:', error.message);
    }
};

module.exports = initializeSizes;

