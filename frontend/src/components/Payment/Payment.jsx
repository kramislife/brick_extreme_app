import React, { useEffect, useState } from 'react';
import CheckoutSteps from '../Cart/CheckoutSteps';
import { useSelector } from 'react-redux';
import Metadata from '../Layout/Metadata/Metadata';
import { replace, useNavigate } from 'react-router-dom';
import { caluclateOrderCost } from '../Helpers/Helpers';
import {
	useCreateNewOrderMutation,
	useStripeCheckoutSessionMutation,
} from '../../redux/api/orderApi';
import toast from 'react-hot-toast';

const Payment = () => {
	const [paymentMethod, setPaymentMethod] = useState('');
	const { shippingData, cartItems } = useSelector((state) => state.cart);
	const navigate = useNavigate();

	const [createNewOrder, { error, isSuccess }] = useCreateNewOrderMutation();

	const [
		stripeCheckoutSession,
		{ data: checkoutData, error: checkoutError, isLoading },
	] = useStripeCheckoutSessionMutation();

	useEffect(() => {
		if (checkoutData) {
			window.location.href = checkoutData?.url;
		}

		if (checkoutError) {
			toast.error(checkoutError?.data?.message);
		}
	}, [checkoutData, checkoutError]);

	useEffect(() => {
		if (error) {
			toast.error(error?.data?.message);
		}

		if (isSuccess) {
			navigate('/');
		}
	}, [error, isSuccess]);

	const submitHandler = (e) => {
		e.preventDefault();

		const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
			caluclateOrderCost(cartItems);

		if (paymentMethod == 'COD') {
			const orderData = {
				shippingInfo: {
					address: `${shippingData.houseNo}, ${shippingData.area}, ${shippingData.landmark} `,
					city: shippingData.city,
					zipCode: shippingData.zipCode,
					country: shippingData.country,
					contactNumber: shippingData.contactNumber,
				},
				orderItems: cartItems,
				itemsPrice,
				shippingAmount: shippingPrice,
				taxAmount: taxPrice,
				totalAmount: totalPrice,
				paymentInfo: { status: 'Not Paid' },
				paymentMethod: 'COD',
			};

			createNewOrder(orderData);
		}

		if (paymentMethod == 'CreditCard') {
			const orderData = {
				shippingInfo: {
					address: `${shippingData.houseNo}, ${shippingData.area}, ${shippingData.landmark} `,
					city: shippingData.city,
					zipCode: shippingData.zipCode,
					country: shippingData.country,
					contactNumber: shippingData.contactNumber,
				},
				orderItems: cartItems,
				itemsPrice,
				shippingAmount: shippingPrice,
				taxAmount: taxPrice,
				totalAmount: totalPrice,
			};
			stripeCheckoutSession(orderData);
		}
		if (paymentMethod == 'PayPal') {
			alert('PAY PAL ');
		}
	};

	return (
		<>
			<Metadata title={'Payment Method'} />
			<CheckoutSteps />
			<div className='max-w-xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg'>
				<h2 className='text-2xl font-semibold mb-6 text-center'>
					Payment
				</h2>

				<form
					onSubmit={submitHandler}
					className='space-y-4 '
				>
					<div className='flex items-center'>
						<input
							type='radio'
							id='COD'
							name='paymentMethod'
							value='COD'
							checked={paymentMethod === 'COD'}
							onChange={(e) => setPaymentMethod(e.target.value)}
							className='h-4 w-4 text-blue-600 focus:ring-blue-500 cursor-pointer'
						/>
						<label
							htmlFor='COD'
							className='ml-3 text-lg cursor-pointer'
						>
							COD
						</label>
					</div>

					<div className='flex  items-center'>
						<input
							type='radio'
							id='paypal'
							name='paymentMethod'
							value='PayPal'
							checked={paymentMethod === 'PayPal'}
							onChange={(e) => setPaymentMethod(e.target.value)}
							className='h-4 w-4 text-blue-600 focus:ring-blue-500 cursor-pointer'
						/>
						<label
							htmlFor='paypal'
							className='ml-3 text-lg cursor-pointer'
						>
							PayPal
						</label>
					</div>

					<div className='flex items-center'>
						<input
							type='radio'
							id='creditCard'
							name='paymentMethod'
							value='CreditCard'
							checked={paymentMethod === 'CreditCard'}
							onChange={(e) => setPaymentMethod(e.target.value)}
							className='h-4 w-4 text-blue-600 focus:ring-blue-500 cursor-pointer'
						/>
						<label
							htmlFor='creditCard'
							className='ml-3 text-lg cursor-pointer'
						>
							Credit/Debit Card
						</label>
					</div>

					<button
						type='submit'
						className='w-full py-2 px-4 mt-4 bg-blue-600 text-white font-medium text-lg rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
						disabled={isLoading}
					>
						Continue
					</button>
				</form>
			</div>
		</>
	);
};

export default Payment;
