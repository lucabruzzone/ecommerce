const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(
    'ecommerce',
    'postgres',
    'admin',
    {
        host: 'localhost',
        dialect: 'postgres'
    })

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

const { User, Product, Comment } = sequelize.models;
// RELACIÓN DE LAS TABLAS:

Comment.belongsTo(User, {
    foreignKey: 'user_id', // creará una columna 'user_id' en la tabla Comment con el id del usuario que posteó ese comentario.
    onDelete: 'CASCADE', // si un usuario se elimina, todos los comentarios asociados a ese usuario también se eliminarán.
});
// tabla intermedia de los productios favoritos de cada usuario.
User.belongsToMany(Product, {through: 'user_favorite'});
Product.belongsToMany(User, {through: 'user_favorite'});
// tabla intermedia de los comentarios que tiene cada producto.
Comment.belongsToMany(Product, {through: 'comment_product'});
Product.belongsToMany(Comment, {through: 'comment_product'});

module.exports = {
    sequelize,
    ...sequelize.models
};