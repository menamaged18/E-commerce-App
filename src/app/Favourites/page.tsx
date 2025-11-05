"use client";
import { getGuestFavs, getGuestCart, getUserCart, transferFavs, 
        getUserFavs, mergeUserFavsWithGuestFavs, clearGuestFavs} from "@/utils/addTo";
import {useAppSelector, useAppDispatch} from "@/Hooks/reduxHooks";
import { getProductsByIds } from "@/data/reducers/ProductReducers";
import { useEffect } from "react";
import Card from "@/components/Card/Card";
import { usePrevious } from "@/Hooks/usePrevious";
import { useRouter } from 'next/navigation';

function Page() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { products, status, error } = useAppSelector((state) => state.products.selectedProductsState);
  const { staticData, isLoggedIn } = useAppSelector(state => state.user);

  const incart = isLoggedIn? getUserCart(staticData.Name) : getGuestCart();

  // const [favorites, setFavorites] = useState<number[]>(getGuestFavs());

  const prevIsLoggedIn = usePrevious(isLoggedIn);

  useEffect(() => {
    if (prevIsLoggedIn === true && isLoggedIn === false) {
      transferFavs(staticData.Name);
      router.push("/");
    }
  }, [isLoggedIn, prevIsLoggedIn, router]);

  // whenever favorites change, fetch them
  useEffect(() => {
    // 1. Get the Favs *inside* the effect
    const guestFavs = getGuestFavs();
    const hasGuestFavs = guestFavs.length > 0;

    // Case 1: User is LOGGED IN
    if (isLoggedIn) {
      const userFavs = getUserFavs(staticData.Name);

      // Sub-case 1.1: User is logged in AND has a guest Favs
      if (hasGuestFavs) {
        // Ask the user to merge
        if (window.confirm("Merge guest favourites with your favourites?")) {
          mergeUserFavsWithGuestFavs(staticData.Name);
          dispatch(getProductsByIds(getUserFavs(staticData.Name)));
        } else {
          clearGuestFavs();
          dispatch(getProductsByIds(userFavs));
        }
      } else {
        // User is logged in, NO guest Favs.
        dispatch(getProductsByIds(userFavs));
      }
    } else {
      // Case 2: User is NOT LOGGED IN
      dispatch(getProductsByIds(guestFavs));
    }
    
  }, [isLoggedIn, staticData.Name, dispatch]);

  const handleFavsToggle = () => {
    let currentFavsIds: number[];
    if (isLoggedIn) {
      currentFavsIds = getUserFavs(staticData.Name); 
    } else {
      currentFavsIds = getGuestFavs(); 
    }
    dispatch(getProductsByIds(currentFavsIds)); 
  };

  let content;
  
  if (status === 'loading') {
    content = (
      <div className="flex flex-col items-center justify-center p-10">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-900"></div>
        <p className="text-center text-xl text-gray-700 mt-4">Loading your favorites...</p>
      </div>
    );
  } else if (status === 'failed') {
    content = (
      <div className="flex flex-col items-center justify-center p-10 rounded-lg border border-red-400">
        <p className="text-center text-xl text-red-700 mt-4 font-semibold">An error occurred</p>
        <p className="text-center text-sm text-red-500 mt-2">{error}</p>
      </div>
    );
  } else if (products.length === 0) {  
    content = (
      <div className="flex flex-col items-center justify-center p-10 rounded-lg">
        <p className="text-center text-xl text-gray-500 mt-4 font-semibold">Your favorites list is empty</p>
        <p className="text-center text-sm text-gray-400 mt-2">Start adding products you love!</p>
      </div>
    );
  } else {
    content = (
      <div className="p-10 flex flex-row flex-wrap gap-4 justify-center max-w-7xl mx-auto">
        {products.map((product) => (
          <Card 
            key={product.id}
            product={product}
            height={380}
            width={250}
            isFav={true}
            inCart={incart.includes(product.id)}
            onFavToggled={handleFavsToggle}
          />
        ))}
      </div>    
    );
  }

  return (
    <div className="container mx-auto">
      {content}
    </div>
  );
}

export default Page;
