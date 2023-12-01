const { Product, Image } = require('../db');

async function postProduct(req, res) {
    try {
        const { title, description, category, subCategory, size, price, discount, stock, images } = req.body;
        if (title && description && price && size && stock && category && images.length) {
            const isThisCreated = await Product.findOne({
                where: {
                    title: title.toLowerCase(),
                    description: description.toLowerCase(),
                    category: category.toLowerCase(),
                    subCategory: subCategory?.toLowerCase(),
                    size: size.toLowerCase(),
                    price,
                    discount,
                    stock
                }
            });
            if (!isThisCreated) {
                // al crear el producto, recuperamos el producto creado.
                const currentProduct = await Product.create({
                    title: title.toLowerCase(),
                    description: description.toLowerCase(),
                    category: category.toLowerCase(),
                    subCategory: subCategory?.toLowerCase(),
                    size: size.toLowerCase(),
                    price,
                    discount,
                    stock
                })
                /* const imagePromises = images.map(img => {
                    return Image.create({
                        url: img,
                        product_id: dataValues.id // Asocia la imagen con el producto recién creado
                    });
                }); */
                const isImagesCreated = await Image.findAll({ where: { url: images } });
                if (isImagesCreated.length === images.length) {
                    // Si todas las imágenes ya existen, asociarlas al producto.
                    await currentProduct.addImages(isImagesCreated);
                    return res.status(201).json('Producto creado e imágenes asociadas con éxito');
                }
                else {
                    // Si al menos una imagen no existe, crear las imágenes que faltan.
                    const newImages = images.filter(img => !isImagesCreated.some(existingImage => existingImage.url === img));
                    const imagesPromises = newImages.map(img => Image.create({ url: img }))
                    const createdImages = await Promise.all(imagesPromises);
                    await currentProduct.addImages(createdImages);
                    return res.status(201).json('Producto creado con sus nuevas imágenes');
                }
            }
            else throw Error('El producto ya existe');
        }
        else throw Error('Faltan datos');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = postProduct;