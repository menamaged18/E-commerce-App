import React, { useState } from 'react'

function HelpLogin() {
    const [isOpened, setIsOpened] = useState(false);
  return (
    {isOpened &&
        <div className='fixed right-10 cursor-pointer text-white bg-blue-600 hover:bg-blue-700 p-3 rounded-2xl'>
            Demo accounts
        </div>
    }
    // <div className='fixed right-10 bg-yellow-500 h-200 w-80'>
    //     <p>email:</p> 
    //     <p>pass: </p> 
    // </div>

  )
}

export default HelpLogin