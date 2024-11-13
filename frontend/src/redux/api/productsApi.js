import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productApi = createApi({
	reducerPath: 'productApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:3000/api/v1',
		credentials: 'include',
		prepareHeaders: (headers) => {
			headers.set('Content-Type', 'application/json');
			return headers;
		}
	}),
	tagTypes: ['Product', 'AdminProducts', 'Reviews'],
	endpoints: (builder) => ({
		getProducts: builder.query({
				query: (params) => ({
					url: '/products',
					params: {
						page: params?.page,
						keyword: params?.keyword,
						'price[gte]': params?.min,
						'price[lte]': params?.max,
						category: params?.category,
					},
				}),
			}),

		getProductsDetails: builder.query({
			query: (id) => `/product/${id}`,
			providesTags: ['Product'],
		}),

		getLatestProducts: builder.query({
			query: () => ({
				url: '/products',
				params: {
					category: 'Latest',
				},
			}),
		}),

		getBestSellerProducts: builder.query({
			query: () => ({
				url: '/products',
				params: {
					category: 'Best-Seller',
				},
			}),
		}),

		getCategories: builder.query({
			query: () => '/products/categories',
		}),

		getAdminProducts: builder.query({
			query: () => '/admin/products',
			providesTags: ['AdminProducts'],
		}),

		createNewProduct: builder.mutation({
			query(body) {
				return {
					url: '/admin/add_products',
					method: 'POST',
					body,
				};
			},
			invalidatesTags: ['AdminProducts'],
		}),

		updateProduct: builder.mutation({
			query({ id, body }) {
				return {
					url: `/admin/products/${id}`,
					method: 'PUT',
					body,
				};
			},
			invalidatesTags: ['Product', 'AdminProducts'],
		}),

		uploadProductImages: builder.mutation({
			query({ id, body }) {
				return {
					url: `/admin/products/${id}/upload_images`,
					method: 'PUT',
					body,
				};
			},
			invalidatesTags: ['Product'],
		}),

		deleteProductImage: builder.mutation({
			query({ id, body }) {
				return {
					url: `/admin/products/${id}/delete_image`,
					method: 'PUT',
					body,
				};
			},
			invalidatesTags: ['Product'],
		}),
	}),
});

export const {
	useGetProductsQuery,
	useGetProductsDetailsQuery,
	useGetLatestProductsQuery,
	useGetBestSellerProductsQuery,
	useGetCategoriesQuery,
	useGetAdminProductsQuery,
	useCreateNewProductMutation,
	useUpdateProductMutation,
	useUploadProductImagesMutation,
	useDeleteProductImageMutation
	,
} = productApi;
