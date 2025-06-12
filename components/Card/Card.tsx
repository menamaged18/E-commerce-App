import Image from "next/image"
import Circle from "../Circle/Circle"

interface Iprops {
    imagePath: string,
    title: string,
    discription: string,
    price: number,
    category: string
}

function Card({imagePath, title, discription, price, category}: Iprops) {
  return (
    <div className="p-3 min-h-70 w-60 shadow-lg rounded-xl flex flex-col justify-center border-amber-950">
        <div className="w-auto max-h-30">
            <Image
                src={imagePath}
                alt="card image"
                width={210}
                height={100}
                className="rounded-lg max-h-30 min-h-30 min-w-auto"
            />            
        </div>

        <div className="pt-1 min-h-20">
            <h1 className="font-bold">{title}</h1>
            <p className="pt-1">{discription}</p>
        </div>

        <div className="flex flex-row gap-0.5 pt-3">
            <Circle height={4} width={4} bgColor="bg-blue-500"></Circle>
            <Circle height={4} width={4} bgColor="bg-red-500"></Circle>
            <Circle height={4} width={4} bgColor="bg-orange-500"></Circle>
        </div>

        <div className="pt-3 flex flex-row justify-between">
            <h2 className="text-blue-500">{price} $</h2>
            <div className="flex flex-row gap-1">
                <Image 
                    src={imagePath}
                    alt="Category image"
                    height={100}
                    width={100}
                    className="rounded-full h-8 w-8"
                />
                <p>{category}</p>
            </div>

        </div>

        <div className="flex flex-row gap-2 pt-3 ">
            <button className="rounded-md bg-blue-500 flex-1 h-10 hover:bg-blue-600">Edit</button>
            <button className="rounded-md bg-red-500 flex-1 h-10 hover:bg-red-600">Remove</button>
        </div>

    </div>
  )
}

export default Card