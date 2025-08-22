interface Iprops {

}
"use client";
import { getFavs, getinCart } from "@/utils/addTo";
import {useAppSelector, useAppDispatch} from "@/Hooks/reduxHooks";
import { getProductsByIds } from "@/data/reducers/ProductReducers";
import { useEffect } from "react";
import Card from "@/components/Card/Card";



function page({}: Iprops) {
  const dispatch = useAppDispatch();
  const {products, status, error} = useAppSelector((state) => state.products.productsState);
  const favs = getFavs();
  const incart = getinCart();

  useEffect(() => {
      dispatch(getProductsByIds(favs));
  }, [dispatch]);

  return (
    <div className="container mx-auto">
      {/* <CustomDialog  closedBtitle="Add product"/> */}
      <div className="p-10 flex flex-row flex-wrap gap-4 justify-center max-w-7xl mx-auto">
        {products.map((product) => (
          <Card 
            key={product.id}
            product = {product}
            height={380}
            width={250}
            isFav={favs? favs.includes(product.id) : false}
            inCart={incart? incart.includes(product.id) : false}
          />
        ))}
      </div>    
    </div>
  )
}

export default page