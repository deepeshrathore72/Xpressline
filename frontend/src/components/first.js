import React, { useEffect } from 'react'
import { jwtDecode } from 'jwt-decode';
// import { useStore } from './zustand';
// import { set } from 'mongoose';
import { useDispatch, useSelector } from 'react-redux';
import * as actionCreators  from '../states/action-creators/index';

function First() {
    const name = useSelector((state) => (state.reducer.name));
    const email = useSelector((state) => state.reducer.email);
    const address = useSelector((state) => state.reducer.address);
    const number = useSelector((state) => state.reducer.number);
    const dispatch = useDispatch();

    const fetchUser = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwtDecode(token);
            if (decoded) {
                dispatch(actionCreators.updateName(decoded.username));
                dispatch(actionCreators.updateEmail(decoded.email));
            }
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);
    localStorage.setItem('address',address);
    localStorage.setItem('name',name);
    localStorage.setItem('email',email);
    localStorage.setItem('number',number);
    
    const Console = () => {
        console.log(name);
        console.log(email);
        console.log(address);
        console.log(number);
    }

    return (
        <div>
            <form className="max-w-sm mx-auto">
                <div className="mb-5">
                    <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">Name</label>
                    <input type="text" id="name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-white-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" value={name} onChange={(e) => { dispatch(actionCreators.updateName(e.target.value)) }} required />
                </div>
                <div className="mb-5">
                    <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">Email Id</label>
                    <input type="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-dark-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-white-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" value={email} onChange={(e) => { dispatch(actionCreators.updateEmail(e.target.value)) }} required />
                </div>
                <div className="mb-5">
                    <label for="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">Address</label>
                    <input type="text" id="address" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-white-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"  value={address} onChange={(e)=>{dispatch(actionCreators.updateAddress(e.target.value))}} required />
                </div>
                <div className="mb-5">
                    <label for="number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">Phone Number</label>
                    <input type="text" id="number" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-white-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" value={number} onChange={(e)=>{dispatch(actionCreators.updateNumber(e.target.value))}} required />
                </div>
                <div className="flex items-start mb-5">
                    <div className="flex items-center h-5">
                        <input id="terms" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" onClick={Console} required />
                    </div>
                    <label for="terms" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a></label>
                </div>
            </form>

        </div>
    )
}

export default First