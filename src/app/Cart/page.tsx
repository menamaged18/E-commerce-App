"use client";
import { getinCart } from "@/utils/addTo";
import { useAppSelector, useAppDispatch } from "@/Hooks/reduxHooks";
import { getProductsByIds } from "@/data/reducers/ProductReducers";
import { useEffect, useState } from "react";
import HorizontalCard from "@/components/Card/HorizontalCard";
import CheckoutSummary from "@/components/Checkout/CheckoutSummary";

function Page() { 
  const dispatch = useAppDispatch();
  const { products, status, error } = useAppSelector((state) => state.products.selectedProductsState);
  const [cart, setCart] = useState<number[]>(getinCart());

  useEffect(() => {
    dispatch(getProductsByIds(cart));
  }, [dispatch, cart]);

  const handleInCartToggle = () => {
    setCart(getinCart());
  };

  // Calculate subtotal
  const subtotal = products.reduce((sum, product) => sum + product.price, 0);

  let content;
  
  if (status === 'loading') {
    content = (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-500"></div>
        <p className="text-xl text-gray-600 mt-6 font-semibold">Loading your cart...</p>
      </div>
    );
  } else if (status === 'failed') {
    content = (
      <div className="flex flex-col items-center justify-center p-10 rounded-xl bg-red-50 border border-red-200 shadow-md">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-2xl text-red-700 mt-4 font-bold">Oops! An error occurred.</p>
        <p className="text-md text-red-500 mt-2 text-center">{error}</p>
        <button className="mt-6 px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition-colors">
          Try Again
        </button>
      </div>
    );
  } else if (products.length === 0) {
    content = (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5H18.6L22 13M18 13v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6m0-4h18" />
        </svg>
        <p className="text-2xl text-gray-500 mt-6 font-bold">Your cart is empty.</p>
        <p className="text-lg text-gray-400 mt-2">Looks like you haven't added anything to your cart yet.</p>
        <a href="/" className="mt-8 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors">
          Start Shopping
        </a>
      </div>
    );
  } else {
    content = (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">Your Shopping Cart</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items List */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-gray-700 mb-6 border-b pb-4">Items</h2>
              <div className="space-y-6 gap-5">
                {products.map((product) => (
                  <HorizontalCard 
                    key={product.id}
                    product={product}
                    height={380}
                    width={250}
                    onInCartToggle={handleInCartToggle}
                  />
                ))}
              </div>
            </div>
          </div>
          
          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <CheckoutSummary subtotal={subtotal} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen">
      {content}
    </main>
  );
}

export default Page;