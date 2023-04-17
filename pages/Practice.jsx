import React, { useState } from 'react'
import {AiOutlineMenu} from 'react-icons/ai'

export default function Practice() {
    const [open, setOpen] = useState(false)
  return (
    <div className="h-screen w-screen flex flex-row">
      <div
        className={`relative inset-0 h-screen w-1/6 bg-blue-500 transition ease-in-out duration-300 ${
          open ? "translate-x-0 " : "translate-x-full"
        }`}
      >
        <div
          onClick={() => setOpen(!open)}
          className="cursor-pointer absolute top-4 right-2"
        >
          <AiOutlineMenu className="text-xl" />
        </div>
      </div>
      <div className="h-screen w-full bg-gray-200">Main</div>
    </div>
  );
};
