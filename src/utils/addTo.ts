export const addToFav = (newProductId: number) =>{
    // Retrieve the existing data
    const storedFavs = window.sessionStorage.getItem("fav");

    // Parse the data (or initialize an empty array if it doesn't exist)
    let favs = storedFavs ? JSON.parse(storedFavs) : [];

    // Check if the product is already in the fav if exists remove it if not add it
    if (!favs.includes(newProductId)) {
        favs.push(newProductId);
    }else{
        favs = favs.filter((id: number) => id !== newProductId);
    }

    const updatedFavsString = JSON.stringify(favs);
    window.sessionStorage.setItem("fav", updatedFavsString);
}

export const getFavs = (): number[] => {
    if (typeof window === "undefined") return [];
    const storedFavs = window.sessionStorage.getItem("fav");
    return storedFavs ? JSON.parse(storedFavs) : []; 
};

export const addToCart = (newProductId: number) =>{
    // Retrieve the existing data
    const storedinCart = window.sessionStorage.getItem("cart");

    // Parse the data (or initialize an empty array if it doesn't exist)
    let cart = storedinCart ? JSON.parse(storedinCart) : [];

    // Check if the product is already in the cart if exists remove it if not add it
    if (!cart.includes(newProductId)) {
        cart.push(newProductId);
    }else{
        cart = cart.filter((id: number) => id !== newProductId);
    }

    const updatedinCartString = JSON.stringify(cart);
    window.sessionStorage.setItem("cart", updatedinCartString);
}

export const getinCart = (): number[] => {
    if (typeof window === "undefined") return [];
    const storedinCart = window.sessionStorage.getItem("cart");
    return storedinCart ? JSON.parse(storedinCart) : []; 
};
