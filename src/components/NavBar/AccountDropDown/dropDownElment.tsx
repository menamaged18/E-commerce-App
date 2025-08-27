'use client';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import {useAppSelector, useAppDispatch} from "@/Hooks/reduxHooks";
import { logoutUser } from '@/data/reducers/user/User';

function NavbarDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const { isLoggedIn } = useAppSelector((state) => state.user);
  const typedDispatch = useAppDispatch();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSignout = () => {
    typedDispatch(logoutUser());
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current) { 
        if (!dropdownRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <li className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-between w-full py-2 px-4 text-white rounded-lg hover:bg-indigo-50 focus:ring-2 focus:ring-indigo-500 transition-colors duration-200 md:hover:bg-transparent md:border-0 md:hover:text-indigo-600 md:p-0 md:w-auto cursor-pointer"
      >
        Account
        <svg
          className="w-3 h-3 ms-2 text-white group-hover:text-indigo-600"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute z-10 mt-2 right-0 font-normal bg-white divide-y divide-gray-200 rounded-lg shadow-md w-32 border border-gray-100 max-w-[calc(100vw-1rem)]" // Adjusted width, added right-0 and max-w
        >
          {/* If the user is not logged in, show Sign-up and Login options */}
          {!isLoggedIn && (
            <ul
              className="py-2 text-sm text-gray-700"
              aria-labelledby="dropdownLargeButton"
            >
              <li>
                <Link
                  href="/signUp"
                  className="block px-4 py-2.5 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-200"
                >
                  Sign-up
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="block px-4 py-2.5 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-200"
                >
                  Login
                </Link>
              </li>
            </ul>
          )}
          {/* If the user is logged in, show Sign out option */}
          {isLoggedIn && (
            <div className="py-1">
              <button
                onClick={handleSignout}
                className="w-full block px-4 py-2.5 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-200 text-left"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      )}
    </li>
  );
}

export default NavbarDropdown;