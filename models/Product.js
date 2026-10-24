const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    oldPrice: { type: Number },
    category: { type: String, required: true },
    images: [{ type: String }],
    stock: { type: Number, default: 0 },
    isSale: { type: Boolean, default: false },
    rating: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);