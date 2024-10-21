import React, { useEffect, useState } from 'react';
import { useGetAdminProductsQuery } from '../../../redux/api/productsApi';
import toast from 'react-hot-toast';
import { FaImages, FaPencilAlt, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Metadata from '../../Layout/Metadata/Metadata';
import AdminLayout from '../../Layout/AdminLayout/AdminLayout';

const ListProducts = () => {
	const { data, isLoading, error } = useGetAdminProductsQuery();
	const [currentPage, setCurrentPage] = useState(1);
	const [recordsPerPage, setRecordsPerPage] = useState(5); // Default number of records per page

	// Calculate the number of pages
	const totalProducts = data?.products?.length || 0;
	const totalPages = Math.ceil(totalProducts / recordsPerPage);

	useEffect(() => {
		if (error) {
			toast.error(error?.data?.message);
		}
	}, [error]);

	// Handle the current page's data
	const paginateData = (data) => {
		const startIndex = (currentPage - 1) * recordsPerPage;
		const endIndex = startIndex + recordsPerPage;
		return data?.slice(startIndex, endIndex);
	};

	// Set up the products for the grid layout
	const setProducts = () => {
		const paginatedProducts = paginateData(data?.products);
		const totalPaginatedProducts = paginatedProducts?.length;

		return paginatedProducts?.map((product, index) => (
			<div
				key={product?._id}
				className={`grid grid-cols-4 items-center border border-gray-700 py-4 text-center ${
					index === totalPaginatedProducts - 1 ? 'rounded-b-lg' : '' // Apply rounded-b-lg only to the last row
				}`}
			>
				{/* ID */}
				<div className='px-4 text-sm md:text-lg font-normal text-gray-300'>
					{product?._id}
				</div>

				{/* Name */}
				<div className='px-4 text-sm md:text-lg font-normal text-wrap text-white'>
					{product?.name}
				</div>

				{/* Stock */}
				<div className='px-4 text-sm md:text-lg font-normal text-gray-300'>
					{product?.stock}
				</div>

				{/* Actions */}
				<div className='flex justify-center space-x-4'>
					<Link
						to={`/admin/products/${product?._id}`}
						className='text-blue-500 border-2 border-blue-700 hover:text-blue-700 p-2 rounded-lg'
					>
						<FaPencilAlt />
					</Link>
					<Link
						to={`/admin/products/${product?._id}/upload_images`}
						className='text-green-500 border-2 border-green-700 hover:text-green-700 p-2 rounded-lg'
					>
						<FaImages />
					</Link>
					<button className='text-red-500 border-red-700 border-2 rounded-lg hover:text-red-700 p-2'>
						<FaTrash />
					</button>
				</div>
			</div>
		));
	};

	// Handle pagination change
	const handlePageChange = (page) => {
		setCurrentPage(page);
	};

	// Handle records per page change
	const handleRecordsPerPageChange = (event) => {
		setRecordsPerPage(parseInt(event.target.value, 10));
		setCurrentPage(1); // Reset to first page after changing records per page
	};

	// Loading state
	if (isLoading)
		return (
			<h2 className='text-center text-lg font-semibold'>Loading...</h2>
		);

	return (
		<>
			<AdminLayout>
				<Metadata title={'All Products'} />

				<div className='bg-slate-800 rounded-lg flex flex-col justify-center gap-4 items-center py-5 w-full'>
					<h1 className='text-2xl font-bold w-full px-2 text-white'>
						{totalProducts} Products
					</h1>

					{/* Records per page selection */}
					<div className='flex justify-start w-full px-2 mb-4'>
						<label className='text-white mr-2'>
							Records per page:
						</label>
						<select
							className='bg-gray-800 text-white border border-gray-700 px-2 py-1 rounded-lg'
							value={recordsPerPage}
							onChange={handleRecordsPerPageChange}
						>
							<option value={5}>5</option>
							<option value={10}>10</option>
							<option value={20}>20</option>
							<option value={50}>50</option>
						</select>
					</div>

					<div className='shadow-md bg-gray-800 rounded-lg p-2 w-full'>
						{/* Header Row */}
						<div className='grid grid-cols-4  bg-gray-900 rounded-t-lg text-white py-2 px-4 font-semibold text-center border border-gray-700'>
							<div>ID</div>
							<div>Name</div>
							<div>Stock</div>
							<div>Actions</div>
						</div>

						{/* Product Rows */}
						<div>{setProducts()}</div>
					</div>

					{/* Pagination Controls */}
					<div className='flex justify-center mt-4 space-x-4'>
						{Array.from({ length: totalPages }, (_, index) => (
							<button
								key={index}
								className={`px-4 py-2 rounded-md text-white ${
									currentPage === index + 1
										? 'bg-[#304b6e]'
										: 'bg-gray-700 hover:bg-gray-600'
								}`}
								onClick={() => handlePageChange(index + 1)}
							>
								{index + 1}
							</button>
						))}
					</div>
				</div>
			</AdminLayout>
		</>
	);
};

export default ListProducts;
