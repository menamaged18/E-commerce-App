import { useState } from "react";
import DemoAccountDetails from "./DemoAccountDetails";

function HelpLogin() {
  const [isOpened, setIsOpened] = useState(false);

  const handleToggle = () => {
    setIsOpened(!isOpened);
  };

  return (
    <div className="relative">
      <button
        onClick={handleToggle}
        className="fixed right-10 bottom-10 z-50 cursor-pointer 
                   text-white bg-blue-600 hover:bg-blue-700 
                   p-3 rounded-2xl shadow-lg transition-all duration-300
                   focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Demo Accounts
      </button>

      {isOpened && (
        <div 
          className="fixed right-10 bottom-24 z-40 bg-gray-800 text-white 
                     p-6 rounded-lg shadow-2xl w-80 max-w-xs
                     transition-transform duration-300 ease-out transform
                     scale-100 opacity-100"
        >
            <DemoAccountDetails 
                header="Normal Account"
                email="johndoe@example.com"
                password="Pass"
            />
            <br />
            <DemoAccountDetails 
                header="Admin Account"
                email="Admin@example.com"
                password="admin"
            />
        </div>
      )}
    </div>
  );
}

export default HelpLogin;