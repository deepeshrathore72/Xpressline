import React,{useEffect} from 'react'
import {useLocation} from 'react-router-dom'

import axios from 'axios'
function Loading() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sessionId = searchParams.get('session_id');
  const email=localStorage.getItem('email')
  const name=localStorage.getItem('name')
  const address=localStorage.getItem('address')
  const number=localStorage.getItem('number')
    const fetchUser = async () => {
      if(sessionId){
    try{
      const res= await axios.post(`http://localhost:3001/check-payment-status/${sessionId}`,{
      body: ({
        email:email,
        name:name,
        address:address,
        number:number
      })})
      console.log(res)
    }catch(err){
      console.log(err.message)
    }}

  }

  useEffect(() => {
    fetchUser();
  }, []);

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