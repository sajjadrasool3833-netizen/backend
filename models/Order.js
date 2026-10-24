const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderId: { type: String, required: true, unique: true },
    customerName: { type: String, required: true },
    phone: { type: String, required: true },
    items: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            name: String,
            price: Number,
            quantity: Number
        }
    ],
    totalAmount: { type: Number, required: true },
    paymentMethod: { type: String, default: 'Cash on Delivery' },
    orderStatus: { type: String, default: 'Pending' },
    shippingAddress: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);