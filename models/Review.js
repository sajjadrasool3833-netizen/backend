const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    userName: { type: String, required: true },
    location: { type: String },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);