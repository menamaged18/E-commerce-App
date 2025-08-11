"use client"
import { useEffect } from "react";
import Card from "../components/Card/Card";
// import Navbar from "../components/NavBar/NavBar";
import {useAppSelector, useAppDispatch} from "@/Hooks/reduxHooks"
import { getAllProducts } from "@/data/reducers/ProductReducers"

export default function Home() {
  const dispatch = useAppDispatch();
  const staticData = useAppSelector((state) => state.products.productsState.products);
  // Initial data fetch
  useEffect(() => {
      dispatch(getAllProducts());
  }, [dispatch]);
  return (
    <div className="container mx-auto">
      {/* <CustomDialog  closedBtitle="Add product"/> */}
      <div className="p-10 flex flex-row flex-wrap gap-4 justify-center ">
        {staticData.map((product) => (
          <Card 
            key={product.id}
            product = {product}
          />
        ))}
      </div>    
    </div>

  );
}
