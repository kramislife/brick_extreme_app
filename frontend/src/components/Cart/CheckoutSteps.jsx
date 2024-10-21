import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const CheckoutSteps = () => {
	const location = useLocation();

	// Determine the current step based on the route
	const isShippingActive = location.pathname === '/shipping';
	const isOrderConfirmationActive = location.pathname === '/confirmOrder';
	const isPaymentActive = location.pathname === '/payment_methods';

	// Determine the completion status of each step
	const isShippingCompleted = isOrderConfirmationActive || isPaymentActive;
	const isOrderConfirmationCompleted = isPaymentActive;

	return (
		<div className='flex items-center justify-center w-full max-w-3xl mx-auto py-5'>
			{/* Shipping Step */}
			<div className='flex flex-col items-center flex-1'>
				<Link
					to='/shipping'
					className='flex flex-col items-center'
				>
					<div
						className={`relative flex items-center justify-center px-6 py-2 w-36
                            text-white rounded-full transition-all ease-in-out duration-300
                            ${
								isShippingActive || isShippingCompleted
									? 'bg-green-800'
									: 'bg-gray-500 text-white'
							}`}
					>
						Shipping
					</div>
				</Link>
			</div>

			{/* Divider between steps */}
			<div className='flex-grow mx-1 h-1 w-[100%] bg-gray-300'></div>

			{/* Order Confirmation Step */}
			<div className='flex flex-col items-center flex-1'>
				<Link
					to='/confirmOrder'
					className='flex flex-col items-center'
				>
					<div
						className={`relative flex items-center justify-center px-6 py-2 w-36
                            text-white rounded-full transition-all ease-in-out duration-300
                            ${
								isOrderConfirmationActive ||
								isOrderConfirmationCompleted
									? 'bg-green-800'
									: 'bg-gray-500 text-white'
							}`}
					>
						Confirm Order
					</div>
				</Link>
			</div>

			{/* Divider between steps */}
			<div className='flex-grow mx-1 h-1 w-[100%] bg-gray-300'></div>

			{/* Payment Step */}
			<div className='flex flex-col items-center flex-1'>
				<Link
					to='/payment_methods'
					className='flex flex-col items-center'
				>
					<div
						className={`relative flex items-center justify-center px-6 py-2 w-36
                            text-white rounded-full transition-all ease-in-out duration-300
                            ${
								isPaymentActive
									? 'bg-green-800'
									: 'bg-gray-500 text-white'
							}`}
					>
						Payments
					</div>
				</Link>
			</div>
		</div>
	);
};

export default CheckoutSteps;
