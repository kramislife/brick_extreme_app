import React from 'react';
import Home from '../../Pages/Home/Home';
import ProductDetails from '../../components/Product/ProductDetails/ProductDetails';
import Products from '../../Pages/Products/Products';
import Login from '../../components/Auth/Login/Login';
import Register from '../../components/Auth/Register/Register';
import UserProfile from '../../Pages/User/Profile/UserProfile';
import UpdateProfile from '../../Pages/User/Profile/UpdateProfile';
import UpdatePassword from '../../Pages/User/Profile/UpdatePassword';
import ProtectedRoute from '../../components/Auth/ProtectedRoute';
import Upload_Avatar from '../../Pages/User/Profile/Upload_Avatar';
import ForgotPassword from '../../Pages/User/Profile/ForgotPassword';
import ResetPassword from '../../Pages/User/Profile/ResetPassword';
import Cart from '../../components/Cart/Cart';
import Shipping from '../../components/Cart/Shipping';
import ConfirmOrder from '../../components/Cart/ConfirmOrder';
import Payment from '../../components/Payment/Payment';
import { Route } from 'react-router-dom';

const UserRoutes = () => {
	return (
		<>
			<Route
				path='/'
				element={<Home />}
			/>
			<Route
				path='/products'
				element={<Products />}
			/>

			<Route
				path='/about'
				element={<> About us</>}
			/>

			<Route
				path='/product/:id'
				element={<ProductDetails />}
			/>

			<Route
				path='/contact'
				element={<> Contact Us </>}
			/>
			<Route
				path='/login'
				element={<Login />}
			/>
			<Route
				path='/register'
				element={<Register />}
			/>
			<Route
				path='/me/profile'
				element={
					<ProtectedRoute>
						<UserProfile />
					</ProtectedRoute>
				}
			/>
			<Route
				path='/me/update_profile'
				element={
					<ProtectedRoute>
						<UpdateProfile />
					</ProtectedRoute>
				}
			/>
			<Route
				path='/me/update_password'
				element={
					<ProtectedRoute>
						<UpdatePassword />
					</ProtectedRoute>
				}
			/>
			<Route
				path='/me/upload_avatar'
				element={
					<ProtectedRoute>
						<Upload_Avatar />
					</ProtectedRoute>
				}
			/>

			<Route
				path='/forgot_password'
				element={<ForgotPassword />}
			/>
			<Route
				path='/password/reset/:token'
				element={<ResetPassword />}
			/>

			<Route
				path='/cart'
				element={
					<ProtectedRoute>
						<Cart />
					</ProtectedRoute>
				}
			/>

			<Route
				path='/shipping'
				element={
					<ProtectedRoute>
						<Shipping />
					</ProtectedRoute>
				}
			/>

			<Route
				path='/confirmOrder'
				element={
					<ProtectedRoute>
						<ConfirmOrder />
					</ProtectedRoute>
				}
			/>

			<Route
				path='/payment_methods'
				element={
					<ProtectedRoute>
						<Payment />
					</ProtectedRoute>
				}
			/>
		</>
	);
};

export default UserRoutes;
