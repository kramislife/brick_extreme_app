import React from 'react';
import { Line } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	Filler,
} from 'chart.js';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	Filler
);

const AdminCharts = ({ salesData, ordersData, labels }) => {
	const data = {
		labels: labels,
		datasets: [
			{
				label: 'Sales',
				data: salesData,
				borderColor: 'rgb(33, 196, 93)',
				tension: 0.9,
				fill: true,
				borderWidth: 2,
			},
			{
				label: 'Orders',
				data: ordersData,
				borderColor: 'rgb(240, 67, 67)',
				tension: 0.9,
				fill: true,
				borderWidth: 2,
			},
		],
	};

	// Chart.js options configuration
	const options = {
		responsive: true,
		plugins: {
			legend: {
				display: true,
				position: 'top',
				labels: {
					boxWidth: 50,
					padding: 30,
					font: {
						size: 18,
					},
					usePointStyle: false,
				},
			},
			title: {
				display: false,
			},
		},
		scales: {
			y: {
				beginAtZero: true,
			},
		},
	};

	return (
		<div className='shadow-lg p-5 rounded-lg w-full'>
			<h2 className='text-4xl font-semibold text-center text-gray-100 mb-4'>
				Sales & Orders Line Chart
			</h2>
			<div className='p-5 bg-gray-300 rounded-lg shadow-md'>
				<Line
					data={data}
					options={options}
				/>
			</div>
		</div>
	);
};

export default AdminCharts;
