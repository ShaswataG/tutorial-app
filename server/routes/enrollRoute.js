const express = require('express');
const enrollRouter = express.Router();

enrollRouter.route('/charge').post(paymentService.createCharge);
enrollRouter.route('/webhook').post(express.raw({ type: 'application/json' }), paymentService.webhook);

module.exports = {
    enrollRouter
}