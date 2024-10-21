import React from 'react';
import {
	FaPlus,
	FaProductHunt,
	FaReceipt,
	FaStar,
	FaTachometerAlt,
	FaUser,
} from 'react-icons/fa';
import Sidebar from '../Sidebar/Sidebar';

const AdminLayout = ({ children }) => {
	const AdminmenuItems = [
		{
			name: 'Dashboard',
			url: '/admin/dashboard',
			icon: <FaTachometerAlt size={20} />,
		},
		{
			name: 'New Product',
			url: '/admin/add_products',
			icon: <FaPlus size={20} />,
		},
		{
			name: 'Product',
			url: '/admin/products',
			icon: <FaProductHunt size={20} />,
		},
		{
			name: 'Orders	',
			url: '/admin/orders',
			icon: <FaReceipt size={20} />,
		},
		{
			name: 'Users	',
			url: '/admin/users',
			icon: <FaUser size={20} />,
		},
		{
			name: 'Reviews	',
			url: '/admin/orders',
			icon: <FaStar size={20} />,
		},
	];

	return (
		<>
			<div className='py-4'>
				<h2 className='text-xl md:text-4xl text-center font-semibold text-white'>
					Admin Settings
				</h2>
			</div>
			<div className='w-[90vw] mx-auto py-2 mb-5'>
				<div className='text-sm grid grid-cols-1 md:grid-cols-4 gap-0 md:gap-5'>
					<div className='border border-gray-200 p-1 rounded-lg mb-5 md:mb-0 '>
						<Sidebar menuItems={AdminmenuItems} />
					</div>
					<div className='border border-gray-200 rounded-lg col-span-1 md:col-span-3 p-2 py-3 text-2xl font-extrabold text-gray-300'>
						{children}
					</div>
				</div>
			</div>
		</>
	);
};

export default AdminLayout;
