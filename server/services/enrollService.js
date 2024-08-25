const { captureRejectionSymbol } = require('nodemailer/lib/xoauth2');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const enrollModel = require('../models/enrollModel');

const createPaymentIntent = async (paymentInfo) => {
    try {
        const tutor = await enrollModel.getTutorsByCourseId(paymentInfo.course_id);
        if (tutor.length < 1) {
            throw new Error(`Tutor not found or Stripe account not connected`);
        }
        const paymentIntent = await stripe.paymentIntents.create({
            amount: paymentInfo.amount,
            currency: 'usd',
            payment_method_types: ['card', 'upi', 'bank_transfer'],
            transfer_data: {
                destination: tutor[0].stripeAccountId,
            },
            description: `Payment for course ${paymentInfo.course_id} by user ${paymentInfo.user_id}`
        });
        return paymentIntent;
    } catch (error) {
        throw new Error(error.message);
    }
}

const webhook = async (req) => {
    const sig = req.headers['stripe-signature'];
    let event;
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_ENDPOINT_SECRET);
        switch (event.type) {
            case 'payment_intent.succeeded':
                const paymentIntent = event.data.object;
                await enrollModel.enrollUser(req.user, req.body.course_id);
                break;
            case 'charge.refunded':
                // Handle refund logic here
                break;

            default:
                console.log(`Unhandled event type ${event.type}`);
        }
    } catch (error) {
        throw new Error(error.message);
    }
    return true;
}

module.exports = {
    createPaymentIntent,
    webhook
}