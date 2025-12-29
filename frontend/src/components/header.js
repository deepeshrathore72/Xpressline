import React,{useEffect, useState} from 'react';
import './header.css';
import { Link } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
// import { set } from 'mongoose';

const Header = () => {

  const [user, setUser] = useState(false)
  const [name, setName] = useState("")
    useEffect(() => {

        const script = document.createElement('script');
        script.src = 'https://cdn.tailwindcss.com';
        script.async = true;
        document.head.appendChild(script);

      
    
        return () => {
          document.head.removeChild(script);
        };
      }, []);

      useEffect(() => {
        const fetch = async () => { 
          const token = localStorage.getItem("token");  
          if (token) {
            const decoded = jwtDecode(token);
            if (decoded) {
              setUser(true);
              console.log(decoded.username);
          if(decoded.name){setName(decoded.name)}
          else if(decoded.username){setName(decoded.username)}
            }
          }
        }
        fetch();
      }, []);


      console.log("hii",user);

      const logout = () => {
        // destroy the cookie
        localStorage.removeItem("token");
        // redirect user to the landing page
        window.location.href = "/login";
      };
  return (
    <div style={{fontFamily:"montserrat"}}>
      <header className="bg-white dark:bg-white">
        <nav className="bg-white border-none px-4 lg:px-6 py-7 dark:white">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <Link to="/" className="flex items-center">
              <img src="https://flowbite.com/docs/images/logo.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
              <span className="self-center text-xl whitespace-nowrap dark:text-black">XpressLine</span>
            </Link>

            <div className="flex items-center lg:order-2">             
              {user ? (
                <>
                  <div>
                    <Link to="/profile" className="text-blue dark:text-blue-500 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-md px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none dark:focus:ring-gray-800">
                      Welcome, {name}
                    </Link>
                  </div>
                  <div>
                    <Link to="/" className="text-blue dark:text-blue-500 hover:bg-gray-50 border border-blue-500 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-md px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-blue-300 focus:outline-none dark:focus:ring-gray-800" onClick={logout}>
                      Log Out
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-blue dark:text-blue-500 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-lg px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-300 focus:outline-none dark:focus:ring-gray-800">
                    Log in
                  </Link>
                  <Link to="/register" className="text-blue bg-primary-700 dark:text-blue-500 border border-blue-300 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-lg px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-gray-300 focus:outline-none dark:focus:ring-primary-800">
                    Get started
                  </Link>
                </>
                
              )}
              <button
                data-collapse-toggle="mobile-menu-2"
                type="button"
                className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-black dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="mobile-menu-2"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
              <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0 text-lg">
                <li>
                  <Link to="/" className="block py-2 pr-4 pl-3 text-black rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-black" aria-current="page">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/parcel" className="block py-2 pr-4 pl-3 text-black border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-black lg:dark:hover:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">
                    Parcel
                  </Link>
                </li>
                <li>
                  <Link to="/grocery" className="block py-2 pr-4 pl-3 text-black border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-black lg:dark:hover:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">
                    Grocery
                  </Link>
                </li>
                <li>
                  <Link to="/medicine" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-black lg:dark:hover:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">
                    Medicines
                  </Link>
                </li>
                <li>
                  <Link to="https://mail.google.com/mail/?view=cm&fs=1&to=22322@iiitu.ac.in&su=SUBJECT&body=BODY" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-black lg:dark:hover:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">
                    Contact Us
                  </Link> 
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;
