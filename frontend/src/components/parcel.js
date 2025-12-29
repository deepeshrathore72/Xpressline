import React from 'react'
import { useEffect,useState } from 'react';
import { jwtDecode } from 'jwt-decode';

function Parcel() {
    const [user,setUser] = useState(false)
    useEffect(() => {
        const fetch = async () => { 
          const token = localStorage.getItem("token");  
          if (token) {
            const decoded = jwtDecode(token);
            if (decoded) {
          setUser(true);
            }
          }
        }
        fetch();
      }, []);
      const handleParcel = () => {
        if (user) {
          window.open("/progress", "_blank");
        } else {
          window.location.href = "/login";
        }
      };
  return (
    <div style={{fontFamily:"montserrat"}}>
        <section class="pt-12 bg-white sm:pt-16">
        <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div class="text-center">
                <p
                    class="max-w-4xl mx-auto mb-4 text-4xl leading-tight text-gray-900 sm:leading-tight sm:text-5xl lg:text-6xl lg:leading-tight">
                    Delivering Dreams, One Parcel at a Time
                </p>
                <h1 class="max-w-2xl mx-auto px-6 text-lg text-gray-600 font-inter">
                    Experience reliable and efficient parcel delivery services that bring your packages to your doorstep, making life easier and more convenient.
                </h1>
                <div class="px-8 sm:items-start sm:justify-center sm:px-0 sm:space-x-5 sm:flex mt-9">
                    <a href="#"
                        class="inline-flex items-center justify-center w-full px-8 py-3 text-lg text-gray-900 hover:text-white transition-all duration-200 bg-blue-300 border-2 border-blue-300 sm:w-auto rounded-xl hover:bg-blue-500 "
                        role="button" onClick={handleParcel}>Deliver Now</a>
                </div>
            </div>
        </div>
        <div class="bg-white">
            <div class="relative mx-auto mt-4 md:mt-8">
                <div class="lg:max-w-xl lg:mx-auto">
                    <img class="px-4 md:mpx-8 justify-center mx-auto" src="deliveryy.png" />
                </div>
            </div>
        </div>
    </section>
    </div>
  )
}

export default Parcel