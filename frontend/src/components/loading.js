import React,{useEffect} from 'react'
import {useLocation} from 'react-router-dom'
function Loading() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get('token');
    useEffect(() => {
        if(token){
            localStorage.setItem('token',token)
            window.location.href = '/'
        }
    }, [])

  return (
    <div>
        <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div class="text-center">
                <p
                    class="max-w-4xl mx-auto mb-4 text-4xl font-bold leading-tight text-gray-900 sm:leading-tight sm:text-5xl lg:text-6xl lg:leading-tight">
                    Loading
                </p>
                <h1 class="max-w-2xl mx-auto px-6 text-lg text-gray-600 font-inter">
                    PLEASE WAIT 
                </h1>
            </div>
        </div>
    </div>
  )
}

export default Loading