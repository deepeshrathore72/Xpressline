import React, { useState,useEffect } from 'react';
import { Link, useNavigate,useLocation } from 'react-router-dom';
import axios from 'axios';
// import resetPassword from './resetPassword';
// import { GoogleLogin } from '@react-oauth/google';

function Login() {
    const [data, setData] = useState({
        email: "",
        password: "",
    });
    // const [otp, setOtp] = useState();
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios("http://localhost:3001/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                data: JSON.stringify(data)
            })
            if (res.status === 200) {
                console.log(res);
                localStorage.setItem("token", res.data.token);
                console.log(res.data.token);
                console.log("Logged Successfully");
                navigate("/");
                window.location.reload();
            } else if (res.status === 400) {
                setError("User does not exist");
            } else if (res.status === 401) {
                setError("Password does not match");
            } else {
                console.log("Not able to Log in");
                setError("Wrong Password or Email Id");
            }
        }
        catch (err) {
            console.error(err.message);
            setError("Error finding user or other internal error")
        }

    }
    // const handleClick = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const res = await axios("http://localhost:3001/auth/google", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //         })
    //         if (res.status === 200) {
    //             console.log(res);
    //             localStorage.setItem("token", res.data.token);
    //             console.log(res.data.token);
    //             console.log("Logged Successfully");
    //             navigate("/");
    //             window.location.reload();
    //         }
    //         else {
    //             console.log("Not able to Log in");
    //             setError("Wrong Password or Email Id");
    //         }
    //     }
    //     catch (err) {
    //         console.error(err.message);
    //         setError("Error finding user or other internal error")
    //     }
    // }
    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const res = await axios("http://localhost:3001/auth/google", {
                // If you need to send any data in the request body, include it here
            }, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            console.log("Response:", res);

            if (res.status === 200) {
                const token = res.data.token;

                if (token) {
                    localStorage.setItem("token", token);
                    console.log("Logged Successfully");
                    window.location.replace = "http://localhost:3000/"
                    window.location.reload();
                } else {
                    console.log("Token missing in the response data");
                    setError("Authentication failed");
                }
            } else {
                console.log("Not able to Log in");
                setError("Wrong Password or Email Id");
            }
        } catch (err) {
            console.error(err.message);
            setError("Error finding user or other internal error");
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        window.location.href = "http://localhost:3001/auth/google"
    };
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get('token');

        if (token) {
            // Store the token in the local storage
            localStorage.setItem('token', token);

            // Redirect or perform actions after successful login
            // window.location.href = '/dashboard'; // Redirect to the dashboard route
        }
    }, [location.search]);
    return (
        <div>
            <body className="bg-gray-100 flex items-center justify-center h-screen">
                <div className="container max-w-md w-full rounded-md shadow-md overflow-hidden flex flex-col">
                    <div className="w-full bg-white p-8 flex flex-col items-center">
                        <h1 className="font-bold text-2xl mb-4">Login</h1>
                        <form onSubmit={handleSubmit}>
                            <input type="email" placeholder="Email" name="email" value={data.email} onChange={(e) => { setData({ ...data, email: e.target.value }) }} className="bg-gray-200 mb-4 p-3 rounded-sm w-full" required />

                            <input type="password" placeholder="Password" name="password" value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} className="bg-gray-200 mb-4 p-3 rounded-sm w-full" required />

                            <a href="/reset-password" className="text-blue-500 block mb-4">Forgot your password?</a>
                            <button type="submit" className="bg-green-700 text-white font-bold uppercase py-3 px-8 rounded-full w-full" >Log In</button>

                            {/* <button type="submit" className="bg-green-700 text-white font-bold uppercase py-3 px-8 rounded-full w-full" >Log In With Google</button> */}
                        </form>
                        <p>{error}</p>
                        {/* {login ? (
                            <p className="text-success" style={{ paddingTop: "20px" }}>You Have Successfully Logged In</p>
                        ) : (
                            <p className="text-danger">You Are Not Logged In</p>
                        )} */}
                    </div>
                    <div className="w-full bg-green-400 flex flex-col items-center justify-center p-8">
                        <div className="text-white text-center mb-4">
                            <h1 className="font-bold text-2xl mb-4">New Here?</h1>
                            <Link to="/register" className="bg-green-700 text-white font-bold uppercase py-3 px-8 rounded-full">
                                Sign Up
                            </Link>
                        </div>
                        <div className="text-white text-center">
                            <h1 className="font-bold text-2xl mb-4">OR</h1>
                            <Link to="" className="bg-green-700 text-white font-bold uppercase px-8 py-3 rounded-full" onClick={handleLogin}>
                                Sign In with Google
                            </Link>
                        </div>
                    </div>


                    <br></br>
                    {/* <button type="submit" className="bg-green-700 text-white font-bold uppercase py-3 px-8 rounded-full w-full" onClick={handleClick}>Log In With Google</button> */}
                </div>
            </body>
        </div>
    )
}

export default Login;

//     axios.post("http://localhost:3000/api/auth/login", data)
//         .then((res) => {
//             console.log(res);
//             localStorage.setItem("token", res.data.token);
//             window.location.href = "/";
//             setLogin(true);
//         })
//         .catch((err) => {
//             if (err.response) {
//                 console.log(err.response.data.message);
//             }
//             console.log(err);
//         })
// }
// catch (err) {
//     console.log(err);
// }