import React, { useContext, useEffect, useState } from 'react';
import { IPInfoContext } from 'ip-info-react';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingInfo } from '../../redux/features/cartSlice';
import { useNavigate } from 'react-router-dom';
import Metadata from '../Layout/Metadata/Metadata';
import CheckoutSteps from './CheckoutSteps';

const Shipping = () => {
	const userInfo = useContext(IPInfoContext);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// Initialize shippingInfo state with individual fields
	const [shippingInfo, setShippingInfo] = useState({
		name: '',
		contactNumber: '',
		zipCode: '',
		city: '',
		country: '',
		houseNo: '',
		area: '',
		landmark: '',
	});

	useEffect(() => {
		// Load individual fields from session storage
		const storedName = sessionStorage.getItem('name');
		const storedContactNumber = sessionStorage.getItem('contactNumber');
		const storedZipCode = sessionStorage.getItem('zipCode');
		const storedCity = sessionStorage.getItem('city');
		const storedCountry = sessionStorage.getItem('country');
		const storedHouseNo = sessionStorage.getItem('houseNo');
		const storedArea = sessionStorage.getItem('area');
		const storedLandmark = sessionStorage.getItem('landmark');

		if (storedName)
			setShippingInfo((prev) => ({ ...prev, name: storedName }));
		if (storedContactNumber)
			setShippingInfo((prev) => ({
				...prev,
				contactNumber: storedContactNumber,
			}));
		if (storedZipCode)
			setShippingInfo((prev) => ({ ...prev, zipCode: storedZipCode }));
		if (storedCity)
			setShippingInfo((prev) => ({ ...prev, city: storedCity }));
		if (storedCountry)
			setShippingInfo((prev) => ({ ...prev, country: storedCountry }));
		if (storedHouseNo)
			setShippingInfo((prev) => ({ ...prev, houseNo: storedHouseNo }));
		if (storedArea)
			setShippingInfo((prev) => ({ ...prev, area: storedArea }));
		if (storedLandmark)
			setShippingInfo((prev) => ({ ...prev, landmark: storedLandmark }));
		if (userInfo && userInfo.country_name && !storedCountry) {
			setShippingInfo((prev) => ({
				...prev,
				country: userInfo.country_name || '',
			}));
		}
	}, [userInfo]);

	// Handle changes for simple fields
	const handleChange = (e) => {
		setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
	};

	const { shippingData } = useSelector((state) => state.cart);

	useEffect(() => {
		if (shippingData) {
			setShippingInfo(shippingData);
		}
	}, [shippingData]);

	const handleSubmit = (e) => {
		e.preventDefault();

		// Validate contact number and zip code
		if (!/^\d{10}$/.test(shippingInfo.contactNumber)) {
			alert('Please enter a valid 10-digit contact number.');
			return;
		}
		if (!/^\d{6}$/.test(shippingInfo.zipCode)) {
			alert('Please enter a valid 6-digit zip code.');
			return;
		}

		// Save individual fields to session storage
		sessionStorage.setItem('name', shippingInfo.name);
		sessionStorage.setItem('contactNumber', shippingInfo.contactNumber);
		sessionStorage.setItem('zipCode', shippingInfo.zipCode);
		sessionStorage.setItem('city', shippingInfo.city);
		sessionStorage.setItem('country', shippingInfo.country);
		sessionStorage.setItem('houseNo', shippingInfo.houseNo);
		sessionStorage.setItem('area', shippingInfo.area);
		sessionStorage.setItem('landmark', shippingInfo.landmark);

		// Dispatch to save shipping info to redux
		dispatch(saveShippingInfo(shippingInfo));

		// Navigate to the confirm order page
		navigate('/confirmOrder');
	};

	return (
		<>
			<Metadata title={'Shipping Info'} />
			<CheckoutSteps />
			<div className='flex flex-col items-center p-10'>
				<div className='w-full max-w-lg bg-gray-300 p-8 rounded-lg shadow-md shadow-black'>
					<h2 className='text-2xl font-semibold mb-4 text-center'>
						Shipping Information
					</h2>

					<form
						onSubmit={handleSubmit}
						className='space-y-4'
					>
						{/* Full Name */}
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Full Name
							</label>
							<input
								type='text'
								name='name'
								value={shippingInfo.name}
								onChange={handleChange}
								className='mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500 sm:text-sm'
								placeholder='John Doe'
								required
							/>
						</div>

						{/* Contact Number */}
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Contact Number
							</label>
							<input
								type='tel'
								name='contactNumber'
								value={shippingInfo.contactNumber}
								onChange={handleChange}
								className='mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500 sm:text-sm'
								placeholder='+1 234 567 8901'
								required
							/>
						</div>

						{/* Zip Code */}
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Zip Code
							</label>
							<input
								type='text'
								name='zipCode'
								value={shippingInfo.zipCode}
								onChange={handleChange}
								className='mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500 sm:text-sm'
								placeholder='123456'
								required
							/>
						</div>

						{/* House No. */}
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								House/Apartment/Flat
							</label>
							<input
								type='text'
								name='houseNo'
								value={shippingInfo.houseNo}
								onChange={handleChange}
								className='mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500 sm:text-sm'
								placeholder='1234'
								required
							/>
						</div>

						{/* Area */}
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Street/Locality/Area
							</label>
							<input
								type='text'
								name='area'
								value={shippingInfo.area}
								onChange={handleChange}
								className='mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500 sm:text-sm'
								placeholder='Elm Street'
								required
							/>
						</div>

						{/* Landmark */}
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Landmark
							</label>
							<input
								type='text'
								name='landmark'
								value={shippingInfo.landmark}
								onChange={handleChange}
								className='mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500 sm:text-sm'
								placeholder='Near Central Park'
								required
							/>
						</div>

						{/* Town/City */}
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Town/City
							</label>
							<input
								type='text'
								name='city'
								value={shippingInfo.city}
								onChange={handleChange}
								className='mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500 sm:text-sm'
								placeholder='New York'
								required
							/>
						</div>

						{/* Country */}
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Country
							</label>
							<input
								type='text'
								name='country'
								value={shippingInfo.country}
								readOnly
								className='mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500 sm:text-sm'
								placeholder='Country'
								required
							/>
						</div>

						{/* Submit Button */}
						<button
							type='submit'
							className='w-full bg-black text-white py-2 rounded-md hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50'
						>
							Confirm Order
						</button>
					</form>
				</div>
			</div>
		</>
	);
};

export default Shipping;
