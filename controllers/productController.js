const Product = require('../models/Product');

// @desc    Get all products
const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Create a product (Handles both URL and Cloudinary Image)
const createProduct = async (req, res) => {
    try {
        const { name, description, price, category, images } = req.body;
        
        // Check karein ke images array mein aayi hai ya direct string URL
        let imageArray = [];
        
        if (images && Array.isArray(images)) {
            imageArray = images;
        } else if (images && typeof images === 'string') {
            imageArray = [images];
        } else if (req.file) {
            // Agar Cloudinary se file aayi hai
            imageArray = [req.file.path];
        }

        const product = new Product({
            name, 
            description, 
            price, 
            category, 
            images: imageArray // Ab images sahi save hongi
        });

        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        res.status(400).json({ message: 'Invalid product data', error: error.message });
    }
};

// @desc    Delete a product
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            await product.deleteOne();
            res.json({ message: 'Product removed' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// YEH LINE LAZMI HAI
module.exports = { getProducts, createProduct, deleteProduct };