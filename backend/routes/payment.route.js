import express from 'express';
import {
	stripeCheckoutSession,
	stripeWebhook,
} from '../controllers/PaymentController.js';
import { isAuthenticatedUser } from '../middlewares/auth.middleware.js';

const router = express.Router();

router
	.route('/payment/checkout_session')
	.post(isAuthenticatedUser, stripeCheckoutSession);

router.route('/payment/webhook').post(
	express.raw({ type: 'application/json' }), // Stripe expects the raw body for signature verification
	stripeWebhook
);

export default router;
