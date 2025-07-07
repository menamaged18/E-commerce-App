'use client'
import Image from "next/image"
import Button from "../UI/Button"
import { useState } from 'react';

interface Iprops {
    imagePath: string,
    title: string,
    discription: string,
    price: number,
    category: string
}

const colors = [
    { name: 'Blue', value: 'bg-blue-500' },
    { name: 'Red', value: 'bg-red-500' },
    { name: 'Orange', value: 'bg-orange-500' },
];

function Card({imagePath, title, discription, price, category}: Iprops) {
  const [selectedColor, setSelectedColor] = useState<string | null>(colors[0].name);

  return (
    <div className="container p-3 h-[350px] w-60 shadow-lg rounded-xl flex flex-col transition duration-300 hover:shadow-2xl">
      {/* Image section */}
        <div className="h-40 w-full overflow-hidden rounded-lg">
        <Image
            src={imagePath}
            alt="card image"
            width={210}
            height={160}
            className="w-full h-full object-cover transform transition duration-500 hover:scale-110"
        />            
        </div>

      {/* Title section */}
      <div className="pt-1">
        <h1 className="font-bold text-lg transition duration-300 hover:text-blue-500">{title}</h1>
      </div>

      {/* Description section */}
      <div className="pt-1 h-24 overflow-hidden">
        <p className="pt-1 text-sm line-clamp-3">{discription}</p>
      </div>

      {/* Color options section */}
      <div className="flex flex-row gap-0.5">
        {colors.map((color, index) => (
          <div
            key={index}
            className={`w-4 h-4 ${color.value} rounded-full cursor-pointer border-2 transform transition duration-200 hover:scale-125 ${
              selectedColor === color.name ? 'border-black' : 'border-transparent'
            }`}
            onClick={() => setSelectedColor(color.name)}
          />
        ))}
      </div>

      {/* Price and category section */}
      <div className="flex flex-row justify-between pt-3">
        <h2 className="text-blue-500 font-bold transition duration-300 hover:text-blue-700">{price} $</h2>
        <div className="flex flex-row gap-1">
          <Image 
            src={imagePath}
            alt="Category image"
            height={100}
            width={100}
            className="rounded-full h-8 w-8 transition duration-300 hover:opacity-75"
          />
          <p className="transition duration-300 hover:text-gray-500">{category}</p>
        </div>
      </div>

      {/* Buttons section */}
      <div className="flex flex-row gap-2 text-white pt-3 mt-auto">
        <Button className="bg-blue-600  hover:bg-blue-700 transition duration-300">Edit</Button>
        <Button className="bg-red-600 hover:bg-red-700 transition duration-300">Remove</Button>
      </div>
    </div>
  );
}

export default Card




// max-h-30 min-h-30 min-w-auto