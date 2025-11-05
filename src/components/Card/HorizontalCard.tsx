import React from 'react'
import { Product } from "@/interfaces/types";
import Image from "next/image";

interface Iprops {
  product: Product
  height?: number
  width?: number
  isFav?: boolean
  inCart?: boolean
  onFavToggle?: () => void;
  onInCartToggle?: (productId: number) => void; // This callback will trigger a refresh
}

function HorizontalCard({product, onInCartToggle}: Iprops) {
    const handleRemove = () => {
        if (onInCartToggle) {
            onInCartToggle(product.id); // Trigger parent component to refresh
        }
    }
    
    return (
        <div className="flex py-6">
            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                <Image
                    src={product.imagePath}
                    alt={product.title}
                    width={96}
                    height={96}
                    className="h-full w-full object-cover object-center"
                />
            </div>
            <div className="ml-4 flex flex-1 flex-col">
                <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>{product.title}</h3>
                        <p className="ml-4">${product.price.toFixed(2)}</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                </div>
                <div className="flex flex-1 items-end justify-between text-sm">
                    <p className="text-gray-500">Quantity: 1</p>
                    <div className="flex">
                        <button 
                            type="button" 
                            className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer"
                            onClick={handleRemove}
                        >
                            Remove
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HorizontalCard