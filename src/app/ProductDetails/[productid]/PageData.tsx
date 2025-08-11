// PageData.tsx (Client Component)
'use client';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/Hooks/reduxHooks';
import { getProductById } from '@/data/reducers/ProductReducers';
import Image from 'next/image';

export default function PageData({ productid }: { productid: Number }) {
  const dispatch = useAppDispatch();
  const product = useAppSelector(state => state.products.selectedProduct);

  useEffect(() => {
    dispatch(getProductById(Number(productid)));
  }, [dispatch, productid]);

  if (!product) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 lg:p-8 mt-10 bg-white rounded-xl shadow-md">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/2">
          <Image 
            src={product.imagePath} 
            alt={product.title} 
            width={400} 
            height={400} 
            className="object-cover rounded-lg"
          />
        </div>
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
          <p className="text-lg text-gray-600 mb-4">{product.description}</p>
          <div className="flex justify-between items-center mb-4">
            <p className="text-2xl font-bold">${product.price}</p>
            <p className="text-lg text-gray-600">Category: {product.category}</p>
          </div>
        </div>
      </div>
    </div>
  );
}