'use client';
import { useState } from "react";
import { Heart, ShoppingCart } from 'lucide-react';

function ActionButtons() {
    const [isFavorited, setIsFavorited] = useState<boolean>(false);
    const [inCart, setInCart] = useState<boolean>(false);
  return (
        <div className="absolute top-3 right-3 flex flex-row gap-1">
        <button
            onClick={(e) => {
            e.preventDefault();
            setIsFavorited(!isFavorited);
            }}
            className="p-1 rounded-full bg-white/80 hover:bg-white transition duration-200"
            aria-label="Add to favorites"
        >
            <Heart
            className={`w-5 h-5 ${isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-500'}`}
            />
        </button>
        <button
            onClick={(e) => {
            e.preventDefault();
            setInCart(!inCart);
            }}
            className="p-1 rounded-full bg-white/80 hover:bg-white transition duration-200"
            aria-label="Add to cart"
        >
            <ShoppingCart className={`w-5 h-5 ${inCart ? 'fill-blue-500' : 'text-gray-500' }`} />
        </button>
        </div>
  )
}

export default ActionButtons