const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(`postgres://postgres:admin@localhost/ecommerce`, {
    dialectModule: require('pg'),
    logging: false,
    native: false,
});

const modelDefiners = [];
// leemos la carpeta models y hacemos push al array anterior solo los archivos con extensión '.js'
fs.readdirSync(path.join(__dirname, '/models'))
    .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
    .forEach((file) => {
        modelDefiners.push(require(path.join(__dirname, '/models', file)));
    });

// instanciamos cada modelo del array, pasándole sequelize como parámetro ya que no lo importamos en los modelos.
modelDefiners.forEach(model => model(sequelize));
// convertimos en mayúscula la inicial de cada modelo
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

const { User, Product, Order, Transaction, Image } = sequelize.models;
// RELACIÓN DE LAS TABLAS:

// creará una columna 'order_id' en la tabla Transaction con el id de una orden.
Order.hasMany(Transaction, {
    foreignKey: 'order_id',
    sourceKey: 'id',
});
Transaction.belongsTo(Order, {
    foreignKey: 'order_id',
    targetKey: 'id',
});

/* // creará una columna 'product_id' en la tabla Images con el id de un producto.
Product.hasMany(Image, {
    foreignKey: 'product_id',
    sourceKey: 'id',
    onDelete: 'CASCADE', // si un producto es eliminado, todas las imágenes asociadas a ese producto también se eliminarán.
});
Image.belongsTo(Product, {
    foreignKey: 'product_id',
    targetKey: 'id',
}); */

// tabla intermedia de las imágenes de cada producto.
Product.belongsToMany(Image, { 
    through: 'product_images',
    onDelete: 'CASCADE' 
});
Image.belongsToMany(Product, { 
    through: 'product_images' 
});

// tabla intermedia de los productios favoritos de cada usuario.
User.belongsToMany(Product, { through: 'user_like' });
Product.belongsToMany(User, { through: 'user_like' });

// tabla intermedia de los comentarios que tiene cada producto.
User.belongsToMany(Product, {
    through: 'Comment'
});
Product.belongsToMany(User, {
    through: 'Comment',
    onDelete: 'CASCADE' // si un producto es eliminado, los comentarios y puntuación asociada a ese producto también serán eliminados.
});

// tabla intermedia de los órdenes de cada usuario.
User.belongsToMany(Product, { through: 'Order' });
Product.belongsToMany(User, { through: 'Order' });

// tabla intermedia de las compras recibidas por cada usuario.
User.belongsToMany(Product, { through: 'Purchase' });
Product.belongsToMany(User, { through: 'Purchase' });

module.exports = {
    sequelize,
    ...sequelize.models
};