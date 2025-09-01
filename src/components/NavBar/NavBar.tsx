// to make this component work wrap it in a: 
// <div className="container mx-auto max-w-7xl">
//   <Navbar />
// </div>

// components/NavBar/NavBar.tsx
"use client";
import Link from "next/link";
import NavbarDropdown from "@/components/NavBar/AccountDropDown/dropDownElment"
import { useState, useEffect } from "react";
import HomeElement from "./NavBarElements/HomeElement";
import FavouritesElement from "./NavBarElements/FavouritesElement";
import CartElement from "./NavBarElements/CartElement";
import {useAppSelector} from "@/Hooks/reduxHooks";
import AddProductElement from "./NavBarElements/AddProductElement";

function Navbar() {
  const userType = useAppSelector( (state) => state.user.staticData.type );
  // console.log(userType)
  const [isOpen, setIsOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const navbarHeight = 64; // Define the height of the navbar

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsSticky(offset > 64);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const renderNavItems = (userType: string) => {
    if (userType === "N" || userType === " ") {
      return (
        <>
          <li>
            <FavouritesElement />
          </li>
          <li>
            <CartElement />
          </li>
        </>
      );
    } else if (userType === "A") {
      return (
        <li>
          <AddProductElement />
        </li>
      );
    }

    // Return null if no conditions are met to avoid rendering anything.
    return null;
  };

  return (
    <>
      {/* Wrapper to maintain space when navbar is fixed. --> **this is very important** */}
      <div style={{ height: isSticky ? navbarHeight : "auto" }}></div>

      <nav
        className={`
          ${isSticky ? "fixed top-0 left-0 right-0 w-full" : "relative mt-6 mx-8 rounded-4xl hover:scale-105"}
          bg-gray-900 text-white shadow-sm z-50 transition-all duration-300 ease-in-out 
        `}
        style={{ height: navbarHeight }}
      >
        <div className="container px-4 py-3 flex justify-between items-center">
          <Link href="/" className="ml-8 lg:ml-20 text-lg font-bold flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-indigo-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <span>E-Commerce Store</span>
          </Link>
          <ul className="hidden md:flex items-center space-x-6">
            <li>
              <HomeElement />
            </li>
            {/* will be added later if needed */}
            {/* <li>
              <AboutElement />
            </li> */}
            {renderNavItems(userType)}
            <NavbarDropdown />
          </ul>
          <button
            className="md:hidden flex justify-center w-8 h-8 bg-gray-700 hover:bg-gray-600 rounded-full cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              className="w-5 h-5 my-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
        {/* Mobile view */}
        {isOpen && (
          <ul className="md:hidden flex flex-col items-center space-y-4 py-4 bg-gray-200 text-black">
            <li>
              <HomeElement />
            </li>
            {renderNavItems(userType)}
            <NavbarDropdown />
          </ul>
        )}
      </nav>
    </>
  );
}

export default Navbar;