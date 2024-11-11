import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Metadata from '../../Layout/Metadata/Metadata';
import {
	useCreateNewProductMutation,
	useGetCategoriesQuery,
} from '../../../redux/api/productsApi';

const NewProduct = () => {
	const navigate = useNavigate();

	// State to manage product details
	const [product, setProduct] = useState({
		name: '',
		description: [''], // Array to store each paragraph as a separate item
		price: '',
		stock: '',
		seller: '',
		category: [],
	});

	const { name, description, price, stock, seller, category } = product;

	// Fetch categories from the API
	const { data: categoriesData, isLoading: isLoadingCategories } = useGetCategoriesQuery();

	useEffect(() => {
		console.log(categoriesData?.categories);
	}, [categoriesData]);

	// Create product mutation
	const [createNewProduct, { isLoading, error, isSuccess }] = useCreateNewProductMutation();

	// Handle side effects after product creation
	useEffect(() => {
		if (error) toast.error(error?.data?.message || 'An error occurred');
		if (isSuccess) {
			toast.success('Product Created');
			navigate('/admin/products');
		}
	}, [error, isSuccess, navigate]);

	// Handle input changes with specific validation for description, price, and stock
	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;

		if (name === 'price') {
			// Format price to allow only up to 2 decimal places
			const formattedPrice = value.replace(/^(\d+)(\.\d{0,2})?.*$/, '$1$2');
			setProduct({ ...product, price: formattedPrice });
		} else if (name === 'stock') {
			// Allow only integers for stock
			const formattedStock = value.replace(/\D/g, ''); // Remove non-numeric characters
			setProduct({ ...product, stock: formattedStock });
		} else if (name === 'description') {
			setProduct({
				...product,
				description: value.split('\n'), // Split by new line to allow multi-paragraph input
			});
		} else if (type === 'checkbox') {
			if (checked) {
				setProduct({ ...product, category: [...category, value] });
			} else {
				setProduct({
					...product,
					category: category.filter((cat) => cat !== value),
				});
			}
		} else {
			setProduct({ ...product, [name]: value });
		}
	};

	// Validate form inputs before submission
	const validateInputs = () => {
		const priceValue = parseFloat(price);
		if (
			isNaN(priceValue) ||
			priceValue <= 0 ||
			!/^(0|[1-9]\d*)(\.\d{0,2})?$/.test(price)
		) {
			toast.error(
				'Please enter a valid price (positive number, up to 2 decimal places).'
			);
			return false;
		}

		const stockValue = parseInt(stock, 10);
		if (isNaN(stockValue) || stockValue < 0) {
			toast.error('Stock must be a non-negative integer (0 or greater).');
			return false;
		}

		if (!seller) {
			toast.error("Please enter the seller's name.");
			return false;
		}

		return true;
	};

	// Handle form submission
	const submitHandler = (e) => {
		e.preventDefault();
		if (!validateInputs()) return;
		// Prepare the product object for submission with joined description paragraphs
		const formattedProduct = {
			...product,
			description: product.description.join('\n'), // Join paragraphs into single text for backend storage
		};

		createNewProduct(formattedProduct);
	};

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
							<label htmlFor='name_field' className='text-white'>
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
							<label htmlFor='description_field' className='text-white'>
								Description
							</label>
							<textarea
								className='w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-md'
								id='description_field'
								rows='4'
								name='description'
								value={description.join('\n')} // Display paragraphs joined by newline
								onChange={handleChange}
								required
							></textarea>
						</div>

						{/* Price and Stock Fields */}
						<div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
							<div className='space-y-2'>
								<label htmlFor='price_field' className='text-white'>
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
								<label htmlFor='stock_field' className='text-white'>
									Stock
								</label>
								<input
									type='text' // Set as text to allow custom validation
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
							<label htmlFor='seller_field' className='text-white'>
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
								{isLoadingCategories ? (
									<p className='text-white'>Loading categories...</p>
								) : (
									categoriesData?.categories?.map((cat, index) => (
										<label key={index} className='flex items-center text-white'>
											<input
												type='checkbox'
												value={cat}
												checked={category.includes(cat)}
												onChange={handleChange}
												className='mr-2'
											/>
											{cat}
										</label>
									))
								)}
							</div>
						</div>

						{/* Submit Button */}
						<button
							type='submit'
							className='w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded'
							disabled={isLoading}
						>
							{isLoading ? 'Creating...' : 'Create Product'}
						</button>
					</form>
				</div>
			</div>
		</>
	);
};

export default NewProduct;
