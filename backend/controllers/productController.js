import catchAsyncErrorsMiddleware from '../middlewares/catchAsyncErrors.middleware.js';
import productModel from '../models/product.model.js';
import APIFilters from '../Utils/apiFilters.js';
import {
	delete_user_avatar_file,
	upload_product_images,
} from '../Utils/cloudnary.js';
import ErrorHandler from '../Utils/ErrorHandler.js';

//Get All Product => /api/v1/products

export const getProducts = catchAsyncErrorsMiddleware(async (req, res) => {
	const resultPerPage = 6;

	const apiFilters = new APIFilters(productModel, req.query)
		.search()
		.filter();

	let products = await apiFilters.query;
	let filteredProductCount = products.length;

	// ADDING PAGINATION
	apiFilters.pagination(resultPerPage);

	products = await apiFilters.query.clone();

	res.status(200).json({
		resultPerPage,
		filteredProductCount,
		products,
	});
});

// Get All Categories
export const getAllCategories = catchAsyncErrorsMiddleware(
	async (req, res, next) => {
		const categories = await productModel.distinct('category'); // Fetch all unique categories

		if (!categories) {
			return next(new ErrorHandler('No Categories Found', 404));
		}

		res.status(200).json({
			success: true,
			categories,
		});
	}
);

// Get Single Product Details => /api/v1/product/:id
export const getSingleProduct = catchAsyncErrorsMiddleware(
	async (req, res, next) => {
		const product = await productModel.findById(req?.params?.id);

		if (!product) {
			return next(new ErrorHandler('Product Not Found', 404));
		}
		return res.status(200).json({
			product,
		});
	}
);

// Update Single Product Details => /api/v1/products/:id
export const updateSingleProduct = catchAsyncErrorsMiddleware(
	async (req, res, next) => {
		let product = await productModel.findById(req?.params?.id);

		if (!product) {
			return next(new ErrorHandler('Product Not Found', 404));
		}

		product = await productModel.findByIdAndUpdate(
			req?.params?.id,
			req.body,
			{
				new: true,
			}
		);

		return res.status(200).json({
			product,
		});
	}
);

// Delete Single Product Details => /api/v1/products/:id
export const deleteProduct = catchAsyncErrorsMiddleware(
	async (req, res, next) => {
		const product = await productModel.findByIdAndDelete(req.params.id);

		if (!product) {
			return next(new ErrorHandler('Product Not Found', 404));
		}

		return res.status(200).json({
			message: 'Product Deleted',
		});
	}
);

// CREATE/ UPDATE PRODUCT REVIEW => /api/v1/reviews
export const createProductReview = catchAsyncErrorsMiddleware(
	async (req, res, next) => {
		const { rating, comment, productId } = req.body;

		const review = {
			user: req?.user?.id,
			rating: Number(rating),
			comment,
		};

		const product = await productModel.findById(productId);

		if (!product) {
			return next(new ErrorHandler('Product not found', 404));
		}

		const isReviewed = product?.reviews?.find(
			(r) => r.user.toString() === req?.user?._id.toString()
		);

		if (isReviewed) {
			product.reviews.forEach((review) => {
				if (review?.user?.toString() === req?.user?._id.toString()) {
					review.comment = comment;
					review.rating = rating;
				}
			});
		} else {
			product.reviews.push(review);
			product.number_of_reviews = product.reviews.length;
		}

		product.ratings =
			product.reviews.reduce((acc, item) => item.rating + acc, 0) /
			product.reviews.length;

		await product.save({ validateBeforeSave: false });

		return res.status(200).json({
			success: true,
		});
	}
);

// GET PRODUCT REVIEW => /api/v1/reviews
export const getProductReviews = catchAsyncErrorsMiddleware(
	async (req, res, next) => {
		const product = await productModel.findById(req.query.id);

		if (!product) {
			return next(new ErrorHandler('Product Not Found', 404));
		}

		res.status(200).json({
			reviews: product.reviews,
		});
	}
);

// --------------------------------------------- ADMIN ------------------------------------------------------

// GET PRODUCTS - ADMIN - /api/v1/admin/products - ADMIN
export const getAdminProducts = catchAsyncErrorsMiddleware(
	async (req, res, next) => {
		const products = await productModel.find();

		res.status(200).json({
			success: true,
			products,
		});
	}
);

// Create New Product => /api/v1/admin/products
export const newProduct = catchAsyncErrorsMiddleware(async (req, res) => {
	req.body.user = req.user._id;
	console.log(req.user._id);
	console.log(req.user.user);

	const product = await productModel.create(req.body);

	res.status(200).json({
		product,
	});
});

// DELETE PRODUCT REVIEW => /api/v1/admin/reviews - ADMIN
export const deleteProductReview = catchAsyncErrorsMiddleware(
	async (req, res, next) => {
		const productId = req.query.productId;
		const product = await productModel.findById(productId);

		if (!product) {
			return next(new ErrorHandler('Product Not Found', 404));
		}

		const reviews = product?.reviews?.filter(
			(review) => review._id.toString() !== req?.query?.id.toString()
		);

		const number_of_reviews = reviews.length;

		const ratings =
			number_of_reviews === 0
				? 0
				: product.reviews.reduce((acc, item) => item.rating + acc, 0) /
				  number_of_reviews;

		const updatedProduct = await productModel.findByIdAndUpdate(
			productId,
			{
				reviews,
				number_of_reviews,
				ratings,
			},
			{ new: true }
		);

		res.status(200).json({
			success: true,
			updatedProduct,
		});
	}
);

// Upload product images => /api/v1/admin/products/:id/upload_images
export const uploadProductImages = catchAsyncErrorsMiddleware(
	async (req, res, next) => {
		let product = await productModel.findById(req?.params?.id);

		if (!product) {
			return next(new ErrorHandler('Product not found', 404));
		}

		const uploader = async (image) =>
			upload_product_images(image, 'brick_extreme/products');

		const urls = await Promise.all(
			(req?.body?.images).map(upload_product_images)
		);

		product?.images?.push(...urls);

		await product?.save();

		res.status(200).json({ product });
	}
);

// DELETE product images => /api/v1/admin/products/:id/delete_image
export const deleteProductImage = catchAsyncErrorsMiddleware(
	async (req, res, next) => {
		let product = await productModel.findById(req?.params?.id);

		if (!product) {
			return next(new ErrorHandler('Product not found', 404));
		}

		const isDeleted = await delete_user_avatar_file(req.body.imgId);

		if (isDeleted) {
			product.images = product?.images?.filter(
				(img) => img.public_id !== req.body.imgId
			);
		}
		await product.save();

		return res.status(200).json({
			product,
		});
	}
);
