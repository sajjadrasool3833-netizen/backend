const express = require('express');
const router = express.Router();
const { createOrder, trackOrder } = require('../controllers/orderController');

router.post('/', createOrder);
router.post('/track', trackOrder); 

// YEH LINE LAZMI HAI
module.exports = router;