import React from "react";
import { useGetLatestProductsQuery } from "../../redux/api/productsApi";
import { useNavigate } from "react-router-dom";
import default_image2 from "../../assets/droid2.png";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "../../components/ui/card";

const LatestProducts = () => {
  // Fetch products based on category 'Latest'
  const { data, isLoading, error, isError } = useGetLatestProductsQuery();
  const navigate = useNavigate();

  // Handle loading state
  if (isLoading)
    return <div className="p-4 text-center text-white">Loading...</div>;

  // Handle error state
  if (isError)
    return (
      <div className="p-4 text-center text-red-500">Error: {error.message}</div>
    );

  // Check if data exists
  if (!data || data.length === 0)
    return <div className="p-4 text-center text-white">No products found.</div>;

  // Filter the latest 4 products by creation time
  const latestProducts = [...data.products]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 4);

  // Handle Product click
  const handleProductClick = (product) => {
    return navigate(`/product/${product._id}`);
  };

  return (
    <div className="p-4">
      <h2 className="text-3xl text-gray-300 font-extrabold mb-4 text-center pt-6 header-text">
        Latest Products
      </h2>
      <div className="flex items-center justify-center pb-10">
        <Button className="bg-brand">View All</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-5">
        <Card className="w-[350px] mx-auto border rounded-md shadow-md bg-brand text-white relative group overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105">
          <CardHeader className="relative overflow-hidden p-0">
            <div className="relative w-full h-[300px]">
              <img
                src={default_image2}
                alt="Nutcracker"
                className="h-full w-full object-cover rounded-t-md"
              />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
            </div>
            <button className="absolute bottom-4 left-1/2 transform -translate-x-1/2 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 bg-button hover:bg-button/85 text-white text-sm font-semibold px-6 py-2 rounded-md transition-all duration-300 ease-in-out">
              View Details
            </button>
          </CardHeader>
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold">Nutcracker</h2>
            <p className="text-red-500 text-md">$800</p>
          </CardContent>
          <CardFooter className="p-4">
            <div className="flex items-center justify-center">
              <div className="flex text-yellow-500">
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5"
                  >
                    <path d="M12 .587l3.668 7.431 8.332 1.209-6.045 5.891 1.428 8.329L12 18.896 4.617 23.447l1.428-8.329-6.045-5.891 8.332-1.209L12 .587z" />
                  </svg>
                ))}
              </div>
              <span className="ml-2 text-gray-300 text-sm">(88)</span>
            </div>
          </CardFooter>
        </Card>

        <Card className="w-[350px] mx-auto border rounded-md shadow-md bg-brand text-white relative group overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105">
          <CardHeader className="relative overflow-hidden p-0">
            <div className="relative w-full h-[300px]">
              <img
                src={default_image2}
                alt="Nutcracker"
                className="h-full w-full object-cover rounded-t-md"
              />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
            </div>
            <button className="absolute bottom-4 left-1/2 transform -translate-x-1/2 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 bg-button hover:bg-button/85 text-white text-sm font-semibold px-6 py-2 rounded-md transition-all duration-300 ease-in-out">
              View Details
            </button>
          </CardHeader>
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold">Nutcracker</h2>
            <p className="text-red-500 text-md">$800</p>
          </CardContent>
          <CardFooter className="p-4">
            <div className="flex items-center justify-center">
              <div className="flex text-yellow-500">
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5"
                  >
                    <path d="M12 .587l3.668 7.431 8.332 1.209-6.045 5.891 1.428 8.329L12 18.896 4.617 23.447l1.428-8.329-6.045-5.891 8.332-1.209L12 .587z" />
                  </svg>
                ))}
              </div>
              <span className="ml-2 text-gray-300 text-sm">(88)</span>
            </div>
          </CardFooter>
        </Card>

        <Card className="w-[350px] mx-auto border rounded-md shadow-md bg-brand text-white relative group overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105">
          <CardHeader className="relative overflow-hidden p-0">
            <div className="relative w-full h-[300px]">
              <img
                src={default_image2}
                alt="Nutcracker"
                className="h-full w-full object-cover rounded-t-md"
              />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
            </div>
            <button className="absolute bottom-4 left-1/2 transform -translate-x-1/2 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 bg-button hover:bg-button/85 text-white text-sm font-semibold px-6 py-2 rounded-md transition-all duration-300 ease-in-out">
              View Details
            </button>
          </CardHeader>
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold">Nutcracker</h2>
            <p className="text-red-500 text-md">$800</p>
          </CardContent>
          <CardFooter className="p-4">
            <div className="flex items-center justify-center">
              <div className="flex text-yellow-500">
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5"
                  >
                    <path d="M12 .587l3.668 7.431 8.332 1.209-6.045 5.891 1.428 8.329L12 18.896 4.617 23.447l1.428-8.329-6.045-5.891 8.332-1.209L12 .587z" />
                  </svg>
                ))}
              </div>
              <span className="ml-2 text-gray-300 text-sm">(88)</span>
            </div>
          </CardFooter>
        </Card>

        <Card className="w-[350px] mx-auto border rounded-md shadow-md bg-brand text-white relative group overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105">
          <CardHeader className="relative overflow-hidden p-0">
            <div className="relative w-full h-[300px]">
              <img
                src={default_image2}
                alt="Nutcracker"
                className="h-full w-full object-cover rounded-t-md"
              />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
            </div>
            <button className="absolute bottom-4 left-1/2 transform -translate-x-1/2 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 bg-button hover:bg-button/85 text-white text-sm font-semibold px-6 py-2 rounded-md transition-all duration-300 ease-in-out">
              View Details
            </button>
          </CardHeader>
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold">Nutcracker</h2>
            <p className="text-red-500 text-md">$800</p>
          </CardContent>
          <CardFooter className="p-4">
            <div className="flex items-center justify-center">
              <div className="flex text-yellow-500">
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5"
                  >
                    <path d="M12 .587l3.668 7.431 8.332 1.209-6.045 5.891 1.428 8.329L12 18.896 4.617 23.447l1.428-8.329-6.045-5.891 8.332-1.209L12 .587z" />
                  </svg>
                ))}
              </div>
              <span className="ml-2 text-gray-300 text-sm">(88)</span>
            </div>
          </CardFooter>
        </Card>
      </div>

      {/* <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
				{latestProducts.map((product) => (
					<div
						key={product._id}
						className='rounded-lg bg-slate-800 overflow-hidden shadow-md shadow-blue-400 hover:shadow-white hover:translate-y-1 cursor-pointer'
						onClick={() => handleProductClick(product)}
					>
						<div className='w-full'>
							<img
								src={product.images?.[0]?.url || default_image}
								alt={product.name || 'Product Image'}
								className='w-full'
								onError={(e) => {
									e.target.onerror = null; // prevents looping
									e.target.src = default_image;
								}}
							/>
						</div>
						<div className='p-4 h-[120px]'>
							<h3
								className='text-base md:text-lg font-semibold text-white overflow-hidden text-ellipsis whitespace-nowrap'
								title={product.name}
							>
								{product.name}
							</h3>
							<p className='text-sm md:text-base text-gray-300'>
								${product.price.toFixed(2)}
							</p>
						</div>
					</div>
				))}
			</div> */}
    </div>
  );
};

export default LatestProducts;
