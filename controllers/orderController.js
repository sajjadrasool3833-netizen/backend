const Order = require('../models/Order');

const createOrder = async (req, res) => {
    try {
        const { customerName, phone, items, totalAmount, shippingAddress } = req.body;
        const orderId = 'TTS-' + Math.floor(10000 + Math.random() * 90000);

        const order = new Order({
            orderId, customerName, phone, items, totalAmount, shippingAddress
        });
        
        const savedOrder = await order.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(500).json({ message: 'Error placing order', error });
    }
};

const trackOrder = async (req, res) => {
    try {
        const { phone, orderId } = req.body;
        const order = await Order.findOne({ 
            $or: [{ phone: phone }, { orderId: orderId }] 
        });

        if (order) res.status(200).json(order);
        else res.status(404).json({ message: 'Order not found' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { createOrder, trackOrder };