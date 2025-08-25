'use client'
import { Product } from "@/interfaces/types";
import  ActionButtons  from "@/components/ActionButtons/ActionButtons";
import Image from "next/image"
import Link from "next/link";
import { useState } from 'react';

interface Iprops {
  product: Product
  height: number
  width: number
  isFav: boolean
  inCart: boolean
  onFavToggle?: () => void; // new
  onInCartToggle?: () => void; // new
}

const colors = [
    { name: 'Blue', value: 'bg-blue-500' },
    { name: 'Red', value: 'bg-red-500' },
    { name: 'Orange', value: 'bg-orange-500' },
];

function Card({product, height, width, isFav, inCart, onFavToggle, onInCartToggle}: Iprops) {
  const [selectedColor, setSelectedColor] = useState<string | null>(colors[0].name);

  return (
    <Link
      href={`/ProductDetails/${product.id}`}
    >
    <div 
      className="container p-3 shadow-lg rounded-xl flex flex-col transition duration-300 hover:shadow-2xl hover:scale-110 relative"
      style={{
        height: `${height}px`,
        width: `${width}px` 
      }}
      >

    {/* Image section with hover actions */}
    <div className="h-40 w-full overflow-hidden rounded-lg relative group">
      <Image
        src={product.imagePath}
        alt="card image"
        width={210}
        height={160}
        className="w-full h-full object-cover transform transition duration-500 group-hover:scale-110"
      />
      
      {/* Action buttons that appear on hover */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <ActionButtons productid={product.id} isFav={isFav} inCart={inCart} onFavToggle={onFavToggle} onInCartToggle={onInCartToggle} />
      </div>
    </div>

      {/* Title section */}
      <div className="pt-1">
        <h1 className="font-bold text-lg transition duration-300 hover:text-blue-500">{product.title}</h1>
      </div>

      {/* Description section */}
      <div className="pt-1 h-24 overflow-hidden">
        <p className="pt-1 text-sm line-clamp-3">{product.description}</p>
      </div>

      {/* Color options section */}
      <div className="flex flex-row gap-1">
        {colors.map((color, index) => (
          <div
            key={index}
            className={`w-5 h-5 ${color.value} rounded-full cursor-pointer border-2 transform transition duration-200 hover:scale-125 ${
              selectedColor === color.name ? 'border-black' : 'border-transparent'
            }`}
            onClick={() => setSelectedColor(color.name)}
          />
        ))}
      </div>

      {/* Price and category section */}
      <div className="flex flex-row justify-between pt-3">
        <h2 className="text-blue-500 font-bold transition duration-300 hover:text-blue-700">{product.price} $</h2>
        <div className="flex flex-row gap-1">
          <Image 
            src={product.imagePath}
            alt="Category image"
            height={100}
            width={100}
            className="rounded-full h-8 w-8 transition duration-300 hover:opacity-75"
          />
          <p className="transition duration-300 hover:text-gray-500">{product.category}</p>
        </div>
      </div>
    </div>
    </Link>
  );
}

export default Card