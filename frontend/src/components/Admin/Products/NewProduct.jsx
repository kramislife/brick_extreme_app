import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Metadata from '../../Layout/Metadata/Metadata';
import { useCreateNewProductMutation } from '../../../redux/api/productsApi';

const NewProduct = () => {
	const navigate = useNavigate();
	const [product, setProduct] = useState({
		name: '',
		description: '',
		price: '',
		stock: '',
		seller: '',
		categories: [],
	});

	const { name, description, price, stock, seller, categories } = product;

	const [createNewProduct, { isLoading, error, isSuccess }] =
		useCreateNewProductMutation();

	useEffect(() => {
		if (error) toast.error(error?.data?.message);
		if (isSuccess) {
			toast.success('Product Created');
			navigate('/admin/products');
		}
	}, [error, isSuccess, navigate]);

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;

		if (type === 'checkbox') {
			// Handle checkbox changes for categories
			if (checked) {
				setProduct({ ...product, categories: [...categories, value] });
			} else {
				setProduct({
					...product,
					categories: categories.filter(
						(category) => category !== value
					),
				});
			}
		} else {
			// For price and stock validation
			if (name === 'price') {
				const regex = /^(0|[1-9]\d*)(\.\d{0,2})?$/;

				if (value === '' || regex.test(value)) {
					setProduct({ ...product, [name]: value });
				}
			} else if (name === 'stock') {
				const stockValue = parseInt(value, 10);
				if (
					value === '' ||
					(stockValue >= 0 && stockValue.toString() === value)
				) {
					setProduct({ ...product, [name]: value });
				}
			} else {
				setProduct({ ...product, [name]: value });
			}
		}
	};

	const submitHandler = (e) => {
		e.preventDefault();

		const priceValue = parseFloat(price);
		if (
			isNaN(priceValue) ||
			priceValue <= 0 ||
			!/^(0|[1-9]\d*)(\.\d{0,2})?$/.test(price)
		) {
			toast.error(
				'Please enter a valid price in $ (positive number up to 2 decimal places).'
			);
			return;
		}

		const stockValue = parseInt(stock, 10);
		if (isNaN(stockValue) || stockValue < 0) {
			toast.error('Stock must be a non-negative integer (0 or greater).');
			return;
		}

		if (!seller) {
			toast.error("Please enter the seller's name.");
			return;
		}

		console.log('PRODUCT => ', product);

		createNewProduct(product); // Trigger the product creation
	};

	const availableCategories = [
		'Harry Potter',
		'Latest',
		'Best Seller',
		'Marvel',
	];

	return (
		<>
			<Metadata title={'Create New Product'} />
			<div className='flex justify-center mt-8'>
				<div className='w-full lg:w-1/2'>
					<form
						className='bg-gray-800 shadow-lg rounded-lg p-6 space-y-6'
						onSubmit={submitHandler}
					>
						<h2 className='text-2xl font-semibold text-white'>
							Create New Product
						</h2>

						{/* Product Name */}
						<div className='space-y-2'>
							<label
								htmlFor='name_field'
								className='text-white'
							>
								Name
							</label>
							<input
								type='text'
								id='name_field'
								className='w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-md'
								name='name'
								value={name}
								onChange={handleChange}
								required
							/>
						</div>

						{/* Product Description */}
						<div className='space-y-2'>
							<label
								htmlFor='description_field'
								className='text-white'
							>
								Description
							</label>
							<textarea
								className='w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-md'
								id='description_field'
								rows='4'
								name='description'
								value={description}
								onChange={handleChange}
								required
							></textarea>
						</div>

						{/* Price and Stock Fields */}
						<div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
							<div className='space-y-2'>
								<label
									htmlFor='price_field'
									className='text-white'
								>
									Price ($)
								</label>
								<input
									type='text' // Use text type to allow decimal validation
									id='price_field'
									className='w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-md'
									name='price'
									value={price}
									onChange={handleChange}
									required
								/>
							</div>

							<div className='space-y-2'>
								<label
									htmlFor='stock_field'
									className='text-white'
								>
									Stock
								</label>
								<input
									type='text' // Use text type for stock input
									id='stock_field'
									className='w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-md'
									name='stock'
									value={stock}
									onChange={handleChange}
									required
								/>
							</div>
						</div>

						{/* Seller Field */}
						<div className='space-y-2'>
							<label
								htmlFor='seller_field'
								className='text-white'
							>
								Seller
							</label>
							<input
								type='text'
								id='seller_field'
								className='w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-md'
								name='seller'
								value={seller}
								onChange={handleChange}
								required
							/>
						</div>

						{/* Categories (Checkboxes) */}
						<div>
							<label className='text-white'>Categories</label>
							<div className='flex flex-col'>
								{availableCategories.map((category) => (
									<label
										key={category}
										className='flex items-center text-white'
									>
										<input
											type='checkbox'
											value={category}
											checked={categories.includes(
												category
											)}
											onChange={handleChange}
											className='mr-2'
										/>
										{category}
									</label>
								))}
							</div>
						</div>

						<button
							type='submit'
							className='w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded'
						>
							Create Product
						</button>
					</form>
				</div>
			</div>
		</>
	);
};

export default NewProduct;
