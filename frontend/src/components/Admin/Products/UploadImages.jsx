import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import DefaultImage from '../../../assets/default_product.png';
import {
	useDeleteProductImageMutation,
	useGetProductsDetailsQuery,
	useUploadProductImagesMutation,
} from '../../../redux/api/productsApi';
import { useNavigate, useParams } from 'react-router-dom';
import { FiTrash } from 'react-icons/fi'; // Importing react-icons
import AdminLayout from '../../Layout/AdminLayout/AdminLayout';
import { FaRegTimesCircle, FaTimesCircle } from 'react-icons/fa';

const UploadImages = () => {
	const params = useParams();
	const navigate = useNavigate();
	const fileInputRef = useRef(null);

	const [images, setImages] = useState([]);
	const [imagesPreview, setImagesPreview] = useState([]);
	const [uploadedImages, setUploadedImages] = useState([]);

	const { data } = useGetProductsDetailsQuery(params?.id);

	const [uploadProductImages, { isLoading, error, isError, isSuccess }] =
		useUploadProductImagesMutation();

	const [
		deleteProductImage,
		{ isLoading: isDeleteLoading, error: deleteError },
	] = useDeleteProductImageMutation();

	useEffect(() => {
		if (data?.product) {
			setUploadedImages(data?.product?.images);
		}

		if (isError) {
			toast.error(error?.data?.message);
		}

		if (deleteError) {
			toast.error(deleteError?.data?.message);
		}

		if (isSuccess) {
			setImagesPreview([]);
			toast.success('Images Uploaded');
			navigate('/admin/products');
		}
	}, [data, isError, isSuccess, deleteError]);

	const handleProductImageUpload = (e) => {
		const uploadedFiles = Array.from(e.target.files);

		uploadedFiles.forEach((file) => {
			const reader = new FileReader();

			reader.onload = () => {
				if (reader.readyState === 2) {
					setImagesPreview((oldArray) => [
						...oldArray,
						reader.result,
					]);
					setImages((oldArray) => [...oldArray, reader.result]);
				}
			};

			reader.readAsDataURL(file);
		});
	};

	const handleResetFileInput = () => {
		if (fileInputRef.current) {
			fileInputRef.current.value = '';
		}
	};

	const handleImagePreviewDelete = (image) => {
		const filteredImagesPreview = imagesPreview.filter(
			(img) => img !== image
		);

		setImages(filteredImagesPreview);
		setImagesPreview(filteredImagesPreview);
	};

	const submitHandler = (e) => {
		e.preventDefault();
		uploadProductImages({ id: params?.id, body: { images } });
	};

	const handleDelete = (imgId) => {
		deleteProductImage({ id: params?.id, body: { imgId } });
	};

	return (
		<AdminLayout>
			<div className='w-full mx-auto '>
				<form
					className='bg-gray-800 shadow-lg rounded-lg flex flex-col gap-4 p-2'
					encType='multipart/form-data'
					onSubmit={submitHandler}
				>
					<h2 className='text-2xl font-semibold text-left text-white'>
						Upload Product Images
					</h2>

					{/* Product Details Section */}
					{data?.product && (
						<div className='text-white flex flex-col'>
							<div className='text-xl font-normal mb-4'>
								{data.product.name}
							</div>
							<div className='text-xl font-normal mb-4'>
								Seller: {data.product.seller}
							</div>
							<div className='text-xl font-normal mb-4'>
								Category: {data.product.category.join(', ')}
							</div>
						</div>
					)}

					{/* Choose Images and Upload Button Section */}
					<div className='flex flex-col md:flex-row md:gap-5 w-full '>
						<label className='w-full md:w-1/3 flex items-center justify-center p-2 bg-gray-800 border border-gray-600 rounded-lg cursor-pointer hover:bg-gray-700 transition duration-200'>
							<span className='text-lg text-white'>
								Choose File
							</span>
							<input
								type='file'
								ref={fileInputRef}
								name='product_images'
								className='hidden'
								id='customFile'
								onChange={handleProductImageUpload}
								onClick={handleResetFileInput}
								multiple
							/>
						</label>
						{/* Submit (Upload) Button */}
						<button
							id='register_button'
							type='submit'
							className={`text-white text-xl font-semibold rounded-lg w-full md:w-1/5 ${
								images.length <= 0
									? 'cursor-not-allowed bg-gray-500'
									: 'bg-blue-600 hover:bg-blue-700'
							}`}
							disabled={
								isLoading ||
								images.length <= 0 ||
								isDeleteLoading
							}
						>
							{isLoading ? 'Uploading...' : 'Upload'}
						</button>
					</div>

					<p className='font-normal text-xl'>
						{imagesPreview.length}
						<span className='ml-2'>images selected</span>
					</p>
					{/* New Images Section */}
					{imagesPreview.length > 0 && (
						<div className='bg-gray-700 flex flex-col rounded-lg items-center w-100 mb-2'>
							<div className='text-white text-2xl font-normal mb-4'>
								New Images
							</div>
							<div className='grid grid-cols-1 md:grid-cols-3 gap-4 w-full'>
								{imagesPreview.map((img, index) => (
									<div
										key={index}
										className='bg-gray-700 rounded-md flex flex-col items-center'
									>
										<img
											src={img || DefaultImage}
											alt={`Uploaded Image ${index + 1}`}
											className='w-full aspect-square object-cover mb-2 rounded'
										/>
										<button
											className='w-full bg-red-600 text-white py-1 rounded hover:bg-red-700'
											type='button'
											onClick={() =>
												handleImagePreviewDelete(img)
											}
										>
											<FiTrash className='inline mr-2' />
										</button>
									</div>
								))}
							</div>
						</div>
					)}

					{/* Uploaded Images Section */}
					{uploadedImages.length > 0 && (
						<div className=' flex flex-col'>
							<div className='mb-4 text-2xl font-normal'>
								Product Uploaded Images:
							</div>
							<div
								className={`grid grid-cols-1 md:grid-cols-3 gap-2 w-full`}
							>
								{uploadedImages.map((img, index) => (
									<div
										key={index}
										className='bg-gray-700 flex flex-col rounded-lg items-center w-100'
									>
										<img
											src={img.url || DefaultImage}
											alt={`Uploaded Image ${index + 1}`}
											className='w-full aspect-square object-fill  rounded-t-lg'
										/>
										<button
											className={`w-full text-white py-1 rounded rounded-b-lg flex items-center justify-center ${
												isDeleteLoading
													? 'cursor-not-allowed bg-gray-500'
													: 'bg-red-600 hover:bg-red-700'
											}`}
											type='button'
											disabled={
												isLoading || isDeleteLoading
											}
											onClick={() =>
												handleDelete(img?.public_id)
											}
										>
											{isLoading || isDeleteLoading ? (
												<span className='animate-spin'>
													<FaRegTimesCircle />
												</span>
											) : (
												<span className='flex items-center'>
													<FiTrash className='mr-2 inline' />
												</span>
											)}
										</button>
									</div>
								))}
							</div>
						</div>
					)}
				</form>
			</div>
		</AdminLayout>
	);
};

export default UploadImages;
