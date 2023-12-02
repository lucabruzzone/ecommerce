const { Product, Image } = require('../db');

async function deleteProduct(req, res) {
    try {
        const productId = req.params.productId;

        // Verifica si el producto existe
        const product = await Product.findByPk(productId);
        if (!product) {
            throw Error('Producto no encontrado');
        }

        // Obtiene las imágenes asociadas al producto
        const images = await product.getImages();

        // Elimina la asociación entre el producto y las imágenes
        for (const image of images) {
            await image.removeProduct(product);
        }

        // Elimina el producto
        await product.destroy();

        return res.status(200).json({ message: 'Producto eliminado con éxito' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = deleteProduct;