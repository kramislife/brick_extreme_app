import React from 'react';
import { Route } from 'react-router-dom';
import ProtectedRoute from '../Auth/ProtectedRoute';
import Dashboard from '../Admin/Dashboard/Dashboard';
import ListProducts from '../Admin/Products/ListProducts';
import NewProduct from '../Admin/Products/NewProduct';

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
		</>
	);
};

export default AdminRoutes;
