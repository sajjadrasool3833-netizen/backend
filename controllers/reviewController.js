const Review = require('../models/Review');

const getReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ productId: req.params.productId });
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

const createReview = async (req, res) => {
    try {
        const review = new Review(req.body);
        await review.save();
        res.status(201).json(review);
    } catch (error) {
        res.status(400).json({ message: 'Invalid review data' });
    }
};

module.exports = { getReviews, createReview };