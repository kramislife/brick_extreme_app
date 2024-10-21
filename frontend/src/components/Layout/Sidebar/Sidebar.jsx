import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ menuItems }) => {
	const location = useLocation();
	const [activeMenuItem, setActiveMenuItem] = useState(location.pathname);

	const handleMenuItemClick = (menuItemUrl) => {
		setActiveMenuItem(menuItemUrl);
	};
	return (
		<div className='my-5 flex flex-col gap-4 p-1'>
			{menuItems.map((menuItem, index) => (
				<Link
					key={index}
					to={menuItem.url}
					className={` ${
						activeMenuItem.includes(menuItem.url)
							? 'bg-white shadow-md shadow-black text-black'
							: 'text-white'
					} flex gap-5 items-center font-bold leading-4  text-sm lg:text-lg py-2 px-2 rounded-md hover:bg-gray-100 hover:text-black`}
					aria-current={
						activeMenuItem.includes(menuItem.url) ? 'true' : 'false'
					}
					onClick={() => {
						handleMenuItemClick(menuItem.url);
					}}
				>
					{menuItem.icon}
					{menuItem.name}
				</Link>
			))}
		</div>
	);
};

export default Sidebar;
