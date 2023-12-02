const { Product, Image, Size } = require('../db');

async function postProductByPk(req, res) {
    try {
        const { title, description, category, subCategory, sizes, price, discount, stock, images } = req.body;
        if (title && description && price && stock && category && sizes.length && images.length) {
            const isThisAlreadyCreated = await Product.findOne({
                where: {
                    title: title.toUpperCase(),
                    description: description.toUpperCase(),
                    category: category.toUpperCase(),
                    subCategory: subCategory?.toUpperCase(),
                    price,
                    discount,
                    stock
                }
            });
            if (!isThisAlreadyCreated) {
                // al crear el producto, recuperamos el producto creado.
                const currentProduct = await Product.create({
                    title: title.toUpperCase(),
                    description: description.toUpperCase(),
                    category: category.toUpperCase(),
                    subCategory: subCategory?.toUpperCase(),
                    price,
                    discount,
                    stock
                })
                // Asociamos las tallas necesarias al nuevo producto creado.
                const getSizesWeNeed = await Size.findAll({where: {name: sizes}});
                await currentProduct.addSizes(getSizesWeNeed);

                // Luego buscamos la tabla Image, solo las imágenes que mandó el front en el array "images", y vemos si ya existen.
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

module.exports = postProductByPk;