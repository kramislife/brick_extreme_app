import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import { FaLock, FaUser, FaUserCog } from 'react-icons/fa';
import { RxAvatar } from 'react-icons/rx';

const UserLayout = ({ children }) => {
	const UsermenuItems = [
		{
			name: 'Profile',
			url: '/me/profile',
			icon: <FaUser size={20} />,
		},
		{
			name: 'Update Profile',
			url: '/me/update_profile',
			icon: <FaUserCog size={20} />,
		},
		{
			name: 'Update Avatar',
			url: '/me/upload_avatar',
			icon: <RxAvatar size={20} />,
		},
		{
			name: 'Update Password',
			url: '/me/update_password',
			icon: <FaLock size={20} />,
		},
	];

	return (
		<>
			<div className='py-4'>
				<h2 className='text-xl md:text-4xl text-center font-semibold text-white'>
					User Settings
				</h2>
			</div>
			<div className='w-[90vw] mx-auto mb-4 pb-1'>
				<div className='text-sm grid grid-cols-1 md:grid-cols-4 gap-0 md:gap-5'>
					<div className='border border-gray-200 mb-5 md:mb-0 '>
						<Sidebar menuItems={UsermenuItems} />
					</div>
					<div className='border border-white col-span-1 md:col-span-3 p-2 pt-3 text-2xl font-extrabold text-gray-300'>
						{children}
					</div>
				</div>
			</div>
		</>
	);
};

export default UserLayout;
