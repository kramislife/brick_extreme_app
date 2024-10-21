import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ admin, children }) => {
	const { isAuthenticated, user, isLoading } = useSelector(
		(state) => state.auth
	);

	if (isLoading) {
		return;
	}

	if (!isAuthenticated) {
		return (
			<Navigate
				to='/login'
				replace
			/>
		);
	}

	if (admin && user?.role != 'admin') {
		return (
			<Navigate
				to='/'
				replace
			/>
		);
	}

	return children;
};

export default ProtectedRoute;
