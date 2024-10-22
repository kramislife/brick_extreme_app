import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import Metadata from '../../Layout/Metadata/Metadata';
import {
	useGetProductsDetailsQuery,
	useUpdateProductMutation,
	useGetCategoriesQuery, // Assuming this API hook exists
} from '../../../redux/api/productsApi';

const UpdateProduct = () => {
	const navigate = useNavigate();
	const params = useParams();
	const [product, setProduct] = useState({
		name: '',
		description: '',
		price: '',
		stock: '',
		seller: '',
		category: [],
	});

	const { name, description, price, stock, seller, category } = product;

	const { data: productData } = useGetProductsDetailsQuery(params?.id);
	const { data: categoryData } = useGetCategoriesQuery(); // Fetch dynamic categories
	const [updateProduct, { isLoading, error, isSuccess }] =
		useUpdateProductMutation();

	// Fetch product details and set them to the state
	useEffect(() => {
		if (productData?.product) {
			setProduct({
				name: productData.product.name,
				description: productData.product.description,
				price: productData.product.price,
				stock: productData.product.stock,
				seller: productData.product.seller,
				category: productData.product.category || [], // Use existing product categories
			});
		}

		if (error) {
			toast.error(error?.data?.message);
		}

		if (isSuccess) {
			toast.success('Product Updated');
			navigate('/admin/products');
		}
	}, [productData, error, isSuccess, navigate]);

	// Handle change in form inputs
	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;

		if (type === 'checkbox') {
			// Handle checkbox changes for category selection
			if (checked) {
				setProduct((prev) => ({
					...prev,
					category: [...prev.category, value], // Add new category to the array
				}));
			} else {
				setProduct((prev) => ({
					...prev,
					category: prev.category.filter((cat) => cat !== value), // Remove category if unchecked
				}));
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

	// Submit handler for form submission
	const submitHandler = (e) => {
		e.preventDefault();

		const priceValue = parseFloat(price);
		if (
			isNaN(priceValue) ||
			priceValue <= 0 ||
			!/^(0|[1-9]\d*)(\.\d{0,2})?$/.test(price)
		) {
			toast.error(
				'Please enter a valid price (positive number up to 2 decimal places).'
			);
			return;
		}

		const stockValue = parseInt(stock, 10);
		if (isNaN(stockValue) || stockValue < 0) {
			toast.error('Stock must be a non-negative integer.');
			return;
		}

		if (!seller) {
			toast.error("Please enter the seller's name.");
			return;
		}

		updateProduct({ id: params?.id, body: product }); // Trigger product update
	};

	// Available categories fetched dynamically
	const availableCategories = categoryData?.categories || [];

	return (
		<>
			<Metadata title={'Update Product'} />
			<div className='flex justify-center mt-8'>
				<div className='w-full lg:w-1/2'>
					<form
						className='bg-gray-800 shadow-lg rounded-lg p-6 space-y-6'
						onSubmit={submitHandler}
					>
						<h2 className='text-2xl font-semibold text-white'>
							Update Product
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
									type='text'
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
									type='text'
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
								{availableCategories.map((categoryItem) => (
									<label
										key={categoryItem}
										className='flex items-center text-white'
									>
										<input
											type='checkbox'
											value={categoryItem}
											checked={category.includes(
												categoryItem
											)} // Check if the category is selected
											onChange={handleChange}
											className='mr-2'
										/>
										{categoryItem}
									</label>
								))}
							</div>
						</div>

						<button
							type='submit'
							className='w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded'
						>
							{isLoading ? 'Updating...' : 'Update Product'}
						</button>
					</form>
				</div>
			</div>
		</>
	);
};

export default UpdateProduct;
