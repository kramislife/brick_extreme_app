import catchAsyncErrorsMiddleware from '../middlewares/catchAsyncErrors.middleware.js';

import Stripe from 'stripe';

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// CREATE STRIPE CHECKOUT SESSION  => /api/v1/payment/checkout_session
export const stripeCheckoutSession = catchAsyncErrorsMiddleware(
	async (req, res, next) => {
		const body = req?.body;

		const line_items = body?.orderItems?.map((item) => {
			return {
				price_data: {
					currency: 'usd',
					product_data: {
						name: item?.name,
						images: [item?.images],
						metadata: { productId: item?.product },
					},
					unit_amount: item?.price * 100,
				},
				tax_rates: [process.env.DEFAULT_TAX_RATE_ID],
				quantity: item?.quantity,
			};
		});

		const shippingInfo = body?.shippingInfo;

		const shipping_rate =
			body?.itemsPrice >= 200
				? process.env.FREE_SHIPPING_RATE_ID
				: process.env.STANDARD_SHIPPING_RATE_ID;

		const session = await stripe.checkout.sessions.create({
			payment_method_types: ['card'],
			success_url: `${process.env.FRONTEND_URL}/me/orders`,
			cancel_url: `${process.env.FRONTEND_URL}`,
			customer_email: req?.user?.email,
			client_reference_id: req?.user?._id?.toString(),
			mode: 'payment',
			metadata: { ...shippingInfo, itemsPrice: body?.itemsPrice },
			shipping_options: [
				{
					shipping_rate,
				},
			],
			line_items,
		});
		res.status(200).json({
			url: session.url,
		});
	}
);

export const stripeWebhook = catchAsyncErrorsMiddleware(
	async (req, res, next) => {
		try {
			const signature = req.headers['stripe-signature'];

			const event = stripe.webhooks.constructEvent(
				req.rawBody,
				signature,
				process.env.STRIPE_WEBHOOK_SECRET
			);

			if (event.type === 'checkout.session.completed') {
				const session = event.data.object;

				const line_items = await stripe.checkout.sessions.listLineItems(
					session.id
				);

				const orderItems = await getOrderItems(line_items);
				const user = session.client_reference_id;

				const totalAmount = session.amount_total / 100;
				const taxAmount = session.total_details.amount_tax / 100;
				const shippingAmount =
					session.total_details.amount_shipping / 100;
				const itemsPrice = session.metadata.itemsPrice;

				const shippingInfo = {
					address: session.metadata.address,
					city: session.metadata.city,
					phoneNo: session.metadata.phoneNo,
					zipCode: session.metadata.zipCode,
					country: session.metadata.country,
				};

				const paymentInfo = {
					id: session.payment_intent,
					status: session.payment_status,
				};

				const orderData = {
					shippingInfo,
					orderItems,
					itemsPrice,
					taxAmount,
					shippingAmount,
					totalAmount,
					paymentInfo,
					paymentMethod: 'Card',
					user,
				};

				await Order.create(orderData);

				res.status(200).json({ success: true });
			}
		} catch (error) {
			console.log('Error => ', error);
		}
	}
);
