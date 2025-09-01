"use client";
import { useEffect } from "react";
import Card from "../components/Card/Card";
import {useAppSelector, useAppDispatch} from "@/Hooks/reduxHooks";
import { getAllProducts } from "@/data/reducers/ProductReducers";
import { getFavs, getinCart} from "@/utils/addTo";

export default function Home() {
  const dispatch = useAppDispatch();
  const staticData = useAppSelector((state) => state.products.productsState.products);
  const favs = getFavs();
  const incart = getinCart();
  // Initial data fetch
  useEffect(() => {
      dispatch(getAllProducts());
  }, [dispatch]);
  return (
    <div className="container mx-auto">
      {/* <CustomDialog  closedBtitle="Add product"/> */}
      <div className="p-10 flex flex-row flex-wrap gap-4 justify-center max-w-7xl mx-auto">
        {staticData.map((product) => (
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
  );
}
