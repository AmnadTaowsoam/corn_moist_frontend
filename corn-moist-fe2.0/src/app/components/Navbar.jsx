"use client"
import { useState } from 'react';
import Link from 'next/link';

function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    console.log("Toggling menu:", !isMenuOpen);  // Debug log
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="w-full bg-blue-900 p-4 text-white">
      <div className="flex items-center justify-between">
        <div className="text-2xl font-bold">Betagro</div>

        {/* Mobile menu toggle button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              className="h-6 w-6"
            >
              <path d="M4 6h16M4 12h16m-16 6h16"></path>
            </svg>
          </button>
        </div>

        {/* Links for large screens */}
        <ul className={`md:flex hidden space-x-4`}>
          <li className=' hover:underline'><Link href="/" className="font-bold">Home</Link></li>
          {/* <li><Link href="/tutorial" className="font-bold">Tutorial</Link></li>
          <li><Link href="/support" className="font-bold">Support</Link></li> */}
          <li className=' hover:underline'><a href='/users' className='text-white text-base font-bold'>Users</a></li>
          <li className=' hover:underline'><Link href="/login" className="font-bold">Login</Link></li>
          <li>
            <details className="group">
              <summary className="cursor-pointer">More</summary>
              <ul className="absolute hidden group-hover:block bg-blue-800 p-2">
                <li className=' hover:underline'><Link href="/register" className="block text-sm px-2 py-1">Register</Link></li>
                <li className=' hover:underline'><Link href="/logout" className="block text-sm px-2 py-1">Log Out</Link></li>
              </ul>
            </details>
          </li>
        </ul>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <ul className="flex flex-col md:hidden absolute bg-blue-900 w-full left-0 top-[58px]">
            <li><Link href="/" className="block p-2 text-base font-bold" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
            {/* <li><Link href="/tutorial" className="block p-2 text-base font-bold" onClick={() => setIsMenuOpen(false)}>Tutorial</Link></li>
            <li><Link href="/support" className="block p-2 text-base font-bold" onClick={() => setIsMenuOpen(false)}>Support</Link></li> */}
            <li><Link href="/users" className="block p-2 text-base font-bold" onClick={() => setIsMenuOpen(false)}>Users</Link></li>
            <li><Link href="/login" className="block p-2 text-base font-bold" onClick={() => setIsMenuOpen(false)}>Login</Link></li>
            <li><Link href="/register" className="block p-2 text-base font-bold" onClick={() => setIsMenuOpen(false)}>Register</Link></li>
            <li><Link href="/logout" className="block p-2 text-base font-bold" onClick={() => setIsMenuOpen(false)}>Log Out</Link></li>
          </ul>
        )}
      </div>
    </nav>
  );
}

export default Nav;
