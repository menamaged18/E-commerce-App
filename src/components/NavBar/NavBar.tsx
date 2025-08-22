// to make this component work wrap it in a: 
// <div className="container mx-auto max-w-7xl">
//   <Navbar />
// </div>

// components/NavBar/NavBar.tsx
"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const navbarHeight = 64; // Define the height of the navbar

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsSticky(offset > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Wrapper to maintain space when navbar is fixed **this is very important** */}
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
              <Link
                href="/"
                className="hover:text-gray-300 transition duration-300 flex items-center space-x-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                <span>Home</span>
              </Link>
            </li>
            {/* will be added later if needed */}
            {/* <li>
              <Link
                href="/about"
                className="hover:text-gray-300 transition duration-300 flex items-center space-x-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>About</span>
              </Link>
            </li> */}
            <li>
              <Link
                href="/Favourites"
                className="hover:text-gray-300 transition duration-300 flex items-center space-x-1"
              >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
                <span>Favourites</span>
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-gray-300 transition duration-300 flex items-center space-x-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span>Account</span>
              </Link>
            </li>
          </ul>
          <button
            className="md:hidden flex justify-center w-8 h-8 bg-gray-700 hover:bg-gray-600 rounded-full"
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
        {isOpen && (
          <ul className="md:hidden flex flex-col items-center space-y-4 py-4 bg-gray-200 text-black">
            <li>
              <Link
                href="/"
                className="hover:text-green-300 transition duration-300 flex items-center space-x-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="hover:text-gray-300 transition duration-300 flex items-center space-x-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>About</span>
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-gray-300 transition duration-300 flex items-center space-x-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span>Account</span>
              </Link>
            </li>
          </ul>
        )}
      </nav>
    </>
  );
}

export default Navbar;