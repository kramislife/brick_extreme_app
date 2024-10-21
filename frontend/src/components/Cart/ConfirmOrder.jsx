import React, { useEffect, useState } from 'react';
import Metadata from '../Layout/Metadata/Metadata';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from './CheckoutSteps';
import { caluclateOrderCost } from '../Helpers/Helpers';

const ConfirmOrder = () => {
	const { cartItems, shippingData } = useSelector((state) => state.cart); // Use cartItems from Redux state
	const UserData = useSelector((state) => state.auth);

	const [customerDetails, setCustomerDetails] = useState({
		name: '',
		contactNumber: '',
		address: '',
	});

	useEffect(() => {
		// Retrieve address from session storage
		const storedAddress = JSON.parse(
			sessionStorage.getItem('shippingInfo')
		);
		if (storedAddress) {
			console.log(storedAddress);

			setCustomerDetails({
				name: storedAddress.name || '',
				contactNumber: storedAddress.contactNumber || '',
				address: `${storedAddress.houseNo}, ${storedAddress.area}, ${storedAddress.landmark}, ${storedAddress.city}, ${storedAddress.zipCode}, ${storedAddress.country}`,
			});
		} else {
			// Fallback if no address is found
			setCustomerDetails({
				name: 'John Doe',
				contactNumber: '234 567 8901',
				address: '1234 Elm Street, New York, USA',
			});
		}
	}, [shippingData]);

	// Calculate the total cost dynamically from cartItems
	const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
		caluclateOrderCost(cartItems);

	const navigate = useNavigate();
	const handleCheckout = () => {
		console.log('In checkout');

		navigate('/payment_methods');
	};

	return (
		<>
			<Metadata title={'Confirm Order'} />
			<CheckoutSteps />

			<div className='flex justify-center items-center p-10 '>
				<div className='w-full min-h-[75vh] bg-gray-200 p-4 rounded-lg shadow-md shadow-black'>
					<h2 className='text-2xl font-semibold my-4 text-center'>
						Confirm Your Order
					</h2>

					{/* Create Two Columns */}
					<div className='grid grid-cols-1 md:grid-cols-8 gap-10'>
						{/* Column 1: Customer and Cart Details */}
						<div className='col-span-6'>
							{/* Customer Details Section */}
							<div className='mb-8 rounded-xl shadow-md p-4 shadow-gray-400 border-2 border-gray-300'>
								<h3 className='text-xl font-semibold mb-4'>
									Shipping Details
								</h3>
								<div className='bg-gray-200 py-4 flex flex-col gap-4 items-start justify-evenly'>
									<p className='text-lg'>
										<strong>Name: </strong>
										{customerDetails.name}
									</p>
									<p className='text-lg'>
										<strong>Mobile: </strong>
										{customerDetails.contactNumber}
									</p>
									<p className='text-lg'>
										<strong>Address: </strong>
										{customerDetails.address}
									</p>
								</div>
							</div>

							{/* Cart Items Section */}
							<div className='py-4 rounded-xl shadow-md p-4 shadow-gray-400 border-2 border-gray-300'>
								<h3 className='text-xl font-semibold mb-4'>
									Cart Details
								</h3>
								<table className='min-w-full table-auto'>
									<thead>
										<tr className='text-left border-b border-black'>
											<th className='pb-2'>Product</th>
											<th className='pb-2 px-1'>
												Quantity
											</th>
											<th className='pb-2 px-2'>Price</th>
											<th className='pb-2 px-2'>Total</th>
										</tr>
									</thead>
									<tbody>
										{cartItems.map((item, index) => (
											<tr
												key={index}
												className='border-b border-gray-400'
											>
												<td className='py-2'>
													{item.name}
												</td>
												<td className='py-2 px-3'>
													{item.quantity}
												</td>
												<td className='py-2 px-3'>
													${item.price.toFixed(2)}
												</td>
												<td className='py-2 px-3'>
													$
													{(
														item.price *
														item.quantity
													).toFixed(2)}
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>

						{/* Column 2: Cost Breakdown, Taxes, and Charts */}
						<div className='col-span-2 rounded-xl shadow-md p-4 shadow-gray-400 border-2 border-gray-300'>
							{/* Cost Breakdown Section */}
							<div className='mb-8'>
								<h3 className='text-xl font-semibold mb-4'>
									Cart Summary
								</h3>
								<div className='text-sm flex flex-col gap-4 py-4'>
									<div className='flex justify-between'>
										<span>Subtotal:</span>
										<span>${itemsPrice}</span>
									</div>
									<div className='flex justify-between'>
										<span>Tax:</span>
										<span>${taxPrice}</span>
									</div>
									<div className='flex justify-between'>
										<span>Shipping:</span>
										<span>${shippingPrice}</span>
									</div>
									<div className='flex justify-between py-4 font-semibold border-b border-t border-gray-400'>
										<span>Total:</span>
										<span>${totalPrice}</span>
									</div>
								</div>
							</div>

							{/* Confirm Button */}
							<button
								className='w-full bg-black text-white py-2 px-4 rounded-md hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-opacity-50'
								onClick={handleCheckout}
							>
								Checkout
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ConfirmOrder;
