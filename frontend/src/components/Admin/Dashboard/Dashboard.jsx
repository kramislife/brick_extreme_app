import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import AdminLayout from '../../Layout/AdminLayout/AdminLayout';
import AdminCharts from '../Charts/AdminCharts';

const Dashboard = () => {
	// Setting initial state to the first day of the current month for startDate
	const [startDate, setStartDate] = useState(new Date(new Date().setDate(1)));
	const [endDate, setEndDate] = useState(new Date());

	// Example sales and orders data (this can be fetched from an API)
	const salesData = [500, 700, 800, 550, 650, 900, 1200];
	const ordersData = [200, 300, 55, 40, 70, 75, 90];
	const labels = [
		'Oct 1',
		'Oct 2',
		'Oct 3',
		'Oct 4',
		'Oct 5',
		'Oct 6',
		'Oct 7',
	];

	const handleKeyDown = (e) => {
		e.preventDefault();
	};

	const submitHandler = () => {
		console.log('START DATE:', new Date(startDate).toISOString());
		console.log('END DATE:', new Date(endDate).toISOString());
	};

	return (
		<>
			<AdminLayout>
				<div className='flex flex-col items-center p-5'>
					{/* Date Picker Section */}
					<div className='flex items-center justify-center gap-5 py-3'>
						<div className='flex flex-col sm:flex-row justify-evenly items-center'>
							<label className='text-lg text-nowrap px-3 py-1'>
								Start Date
							</label>
							<DatePicker
								selected={startDate}
								onChange={(date) => setStartDate(date)}
								selectsStart
								startDate={startDate}
								endDate={endDate}
								className='rounded-lg text-lg text-black px-3 py-1 w-[70%] sm:w-auto border-none outline-none shadow-sm shadow-black'
								onKeyDown={handleKeyDown}
							/>
						</div>
						<div className='flex flex-col sm:flex-row justify-evenly items-center'>
							<label className='text-lg text-nowrap px-3 py-1'>
								End Date
							</label>
							<DatePicker
								selected={endDate}
								onChange={(date) => setEndDate(date)}
								selectsEnd
								startDate={startDate}
								endDate={endDate}
								minDate={startDate}
								className='rounded-lg text-lg text-black px-3 py-1 w-[70%] sm:w-auto border-none outline-none shadow-sm shadow-black'
								onKeyDown={handleKeyDown}
							/>
						</div>
						<button
							className='btn rounded-lg px-10 bg-gray-800 text-white py-1 hover:bg-opacity-80 hover:shadow-md hover:shadow-white'
							onClick={submitHandler}
						>
							Fetch Data
						</button>
					</div>

					{/* Line Chart Section */}

					{/* Cards Section */}
					<div className='grid grid-cols-1 xl:grid-cols-2 gap-5 my-5 p-1 rounded-lg w-full'>
						{/* Sales Card */}
						<div className='bg-green-600 text-white h-20 rounded-md flex justify-center items-center'>
							<div className='text-center'>
								<p className='text-lg'>Sales</p>
								<b className='text-2xl'>$0.00</b>
							</div>
						</div>

						{/* Orders Card */}
						<div className='bg-red-600 text-white h-20 rounded-md flex justify-center items-center'>
							<div className='text-center'>
								<p className='text-lg'>Orders</p>
								<b className='text-2xl'>0</b>
							</div>
						</div>
					</div>
					<div className='my-2 w-full'>
						<AdminCharts
							salesData={salesData}
							ordersData={ordersData}
							labels={labels}
						/>
					</div>
				</div>
			</AdminLayout>
		</>
	);
};

export default Dashboard;
