import React from 'react';
import { Route } from 'react-router-dom';
import ProtectedRoute from '../Auth/ProtectedRoute';
import Dashboard from '../Admin/Dashboard/Dashboard';
import ListProducts from '../Admin/Products/ListProducts';
import NewProduct from '../Admin/Products/NewProduct';
import UpdateProduct from '../Admin/Products/UpdateProduct';
import UploadImages from '../Admin/Products/UploadImages';

const AdminRoutes = () => {
	console.log('In Admin Routes');
	return (
		<>
			<Route
				path='/admin/dashboard'
				element={
					<ProtectedRoute admin={true}>
						<Dashboard />
					</ProtectedRoute>
				}
			/>
			<Route
				path='/admin/products'
				element={
					<ProtectedRoute admin={true}>
						<ListProducts />
					</ProtectedRoute>
				}
			/>
			<Route
				path='/admin/add_products'
				element={
					<ProtectedRoute admin={true}>
						<NewProduct />
					</ProtectedRoute>
				}
			/>
			<Route
				path='/admin/products/:id'
				element={
					<ProtectedRoute admin={true}>
						<UpdateProduct />
					</ProtectedRoute>
				}
			/>
			<Route
				path='/admin/products/:id/upload_images'
				element={
					<ProtectedRoute admin={true}>
						<UploadImages />
					</ProtectedRoute>
				}
			/>
		</>
	);
};

export default AdminRoutes;
