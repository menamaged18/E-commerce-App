'use client';
import { useState } from "react";
import { Heart, ShoppingCart } from 'lucide-react';
import { addToFav, addToCart } from "@/utils/addTo";

interface IActionButtonsProps {
  productid: number;
  isFav: boolean;
  inCart: boolean;
  onFavToggle?: () => void; // new
  onInCartToggle?: () => void; // new
}

function ActionButtons({productid, isFav, inCart, onFavToggle, onInCartToggle}: IActionButtonsProps) {
    const [isFavorited, setIsFavorited] = useState<boolean>(isFav);
    const [inCartC, setInCart] = useState<boolean>(inCart);
  return (
        <div className="absolute top-3 right-3 flex flex-row gap-1">
        <button
            onClick={(e) => {
                e.preventDefault();
                setIsFavorited(!isFavorited);
                addToFav(productid);
                if (onFavToggle) onFavToggle(); // new
            }}
            className="p-1 rounded-full bg-white/80 hover:bg-white transition duration-200"
            aria-label="Add to favorites"
        >
            <Heart
                className={`w-5 h-5 cursor-pointer ${isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-500'}`}
            />
        </button>
        <button
            onClick={(e) => {
                e.preventDefault();
                setInCart(!inCartC);
                addToCart(productid);
                if (onInCartToggle) onInCartToggle();
            }}
            className="p-1 rounded-full bg-white/80 hover:bg-white transition duration-200 "
            aria-label="Add to cart"
        >
            <ShoppingCart className={`w-5 h-5 cursor-pointer ${inCartC ? 'fill-blue-500' : 'text-gray-500' }`} />
        </button>
        </div>
  )
}

export default ActionButtons