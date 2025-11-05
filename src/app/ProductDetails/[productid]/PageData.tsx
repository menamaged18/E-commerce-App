"use client";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/Hooks/reduxHooks";
import { getProductById, getCategoryProducts } from "@/data/reducers/ProductReducers";
import Image from "next/image";
import { Heart, ShoppingCart } from "lucide-react";
import Card from "@/components/Card/Card";
import { getGuestFavs, getGuestCart, itemToggleGuestCart, itemToggleGuestFav, 
         getUserFavs, getUserCart, itemToggleUserFav, itemToggleUserCart} from "@/utils/addTo";


export default function PageData({ productid }: { productid: number }) {
  const userType = useAppSelector( (state) => state.user.staticData.type );
  const [isFavorited, setIsFavorited] = useState<boolean>(false);
  const [inCart, setInCart] = useState<boolean>(false);
  const {isLoggedIn , staticData} = useAppSelector(s => s.user);
  const favs = isLoggedIn? getUserFavs(staticData.Name) : getGuestFavs();
  const incart = isLoggedIn? getUserCart(staticData.Name) : getGuestCart();
  const dispatch = useAppDispatch();
  const product = useAppSelector((state) => state.products.selectedProductState.product);
  const recomendedProducts = useAppSelector((state) => state.products.productsState.products);

  const handleFavBtn = () =>{
    setIsFavorited(!isFavorited);
    isLoggedIn? itemToggleUserFav(Number(productid), staticData.Name)
                  : itemToggleGuestFav(Number(productid));
  }

  const handleInCartBtn = () =>{
    setInCart(!inCart);
    isLoggedIn? itemToggleUserCart(Number(productid), staticData.Name)
                : itemToggleGuestCart(Number(productid));
  }

  useEffect(() => {
    const nPid = Number(productid);
    dispatch(getProductById(nPid));
    setIsFavorited(favs? favs.includes(nPid) : false);
    setInCart(incart? incart.includes(nPid) : false);
  }, [dispatch, productid]);

  useEffect(()=>{
    if(product){
      dispatch(getCategoryProducts({ cat: product.category, excludeId: product.id }));
    }
  },[product])

  if (!product)
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-600"></div>
      </div>
  );

  return (
    <> 
      <div className="max-w-5xl mx-auto p-6 md:p-8 lg:p-12 mt-10">
        <div className="relative">
          <Image
            src={product.imagePath}
            alt={product.title}
            height={800}
            width={500}
            className="rounded-xl shadow-md transition-transform duration-300 group-hover:scale-105 object-cover float-left mr-4 mb-2"
          />

          {/* All the text content goes here, as a sibling to the image */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{product.title}</h1>
          <p className="text-base md:text-lg text-gray-600 mb-6 leading-relaxed">{product.description}</p>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <p className="text-2xl md:text-3xl font-semibold text-indigo-600">${product.price}</p>
            <p className="text-sm md:text-base text-gray-500 mt-2 sm:mt-0">
              Category: <span className="font-medium">{product.category}</span>
            </p>
          </div>
          
          {/* Buttons should also be outside the flex container to wrap correctly */}
          {(userType === "N" || userType === " " ) && 
          <div className="flex flex-col sm:flex-row gap-4 clear-left justify-center mt-2">
            <button
              onClick={handleFavBtn}
              className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 cursor-pointer ${
                isFavorited
                  ? "bg-red-100 text-red-600 hover:bg-red-200"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <Heart
                className={`w-5 h-5 ${isFavorited ? "fill-red-600 text-red-600" : "text-gray-500"}`}
              />
              {isFavorited ? "Remove from Favorites" : "Add to Favorites"}
            </button>
            <button
              onClick={handleInCartBtn}
              className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 cursor-pointer ${
                inCart
                  ? "bg-blue-100 text-blue-600 hover:bg-blue-200"
                  : "bg-indigo-600 text-white hover:bg-indigo-700"
              }`}
            >
              <ShoppingCart
                className={`w-5 h-5 ${inCart ? "fill-blue-600 text-blue-600" : "text-white"}`}
              />
              {inCart ? "Remove from Cart" : "Add to Cart"}
            </button>
          </div>
        }
        </div>
      </div>

      {/* recommended Products */}
      <div className="max-w-5xl mx-auto p-6 md:p-8 lg:p-12 mt-4 ">
        <h2 className="text-2xl font-bold mb-4">Recommended Products</h2>
        <div className="flex flex-row gap-4 p-4">
          {recomendedProducts.map((product) => (
            <Card key={product.id} product={product} height={250} width={200}
              isFav={favs? favs.includes(product.id) : false}
              inCart={incart? incart.includes(product.id) : false}
            ></Card>
          ))}
        </div>
      </div>
    </>
  );
}

