import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        number: null,
        verify: false
    });
    const [otp, setOtp] = useState(null);
    const navigate = useNavigate();
    const [show, setShow] = useState(1);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:3001/api/auth/register", {
              headers: {
                "Content-Type": "application/json",
              },
              data: data,
            });
            if (res.status === 200) {
              console.log("Successfully Registered");
              alert("Successfully Registered");
              setShow(2);
              console.log(res.data);
              // Wait for the verification response
              const response = await axios.post("http://localhost:3001/api/auth/verify", {
                number: data.number,
              });
              console.log(response.data);
              setOtp(response.data.otp);
            } else {
              console.log(res.data.message);
              alert(res.data.message);
              console.log("Not Registered");
            }
          } catch (err) {
            console.error("Error during registration:", err.message);
            // Handle the error (e.g., display an error message to the user)
          }          
    };
    const verifyNumber = async (e) => {
        e.preventDefault();
        await axios.get(`https://phonevalidation.abstractapi.com/v1/?api_key=2135f0ebf738476daf9b76d985447972&phone=+91${data.number}`)
            .then(async (response) => {
                console.log("hey:", JSON.stringify(response.data, null, 2));
                if (response.data.valid === false) {
                    alert("Invalid Number");
                }
                else {
                    alert("Valid Number");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
    const [verificationCode, setVerificationCode] = useState(['', '', '', '']);

    const handleChange = (index, value) => {
        if (value.match(/^\d*$/) && value.length <= 1) {
            const newVerificationCode = [...verificationCode];
            newVerificationCode[index] = value;
            setVerificationCode(newVerificationCode);
        }
    };

    const handleResend = () => {
        // Implement resend logic
        console.log('Resend code');
        axios.get("http://localhost:3001/api/auth/verify")
    };
    const openRegister = () => {
        window.location.href = "/register"
    }
    
    const checkOtp = async (e) => {
        e.preventDefault();
    
        if (verificationCode.join('') == otp) {
            console.log("otp" + otp);
    
            try {
                const res = await axios.post("http://localhost:3001/api/auth/verify2", {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    data: data,
                });
    
                console.log(res.status);
    
                if (res.status === 200) {
                    console.log("Successfully Verified");
                    alert("Successfully Verified");
                    navigate("/login",{replace:true});
                } else {
                    console.log("Not Verified");
                    // alert("Not Verified");
                }
            } catch (error) {
                console.error("Error during verification:", error);
                // Handle the error as needed
            }
        }
    };
    


    return (<>
    {show===2 && (<div class="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12" style={{ fontFamily: "montserrat" }}>
                <div class="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
                    <div class="mx-auto flex w-full max-w-md flex-col space-y-10">
                        <span onClick={openRegister}>&#8592;</span>
                        <div class="flex flex-col items-center justify-center text-center space-y-2">
                            <div class="font-semibold text-3xl">
                                <p>Phone Verification</p>
                            </div>
                            <div class="flex flex-row text-sm font-medium text-gray-400">
                                <p>We have sent a code to your registered phone number</p>
                            </div>
                        </div>

                        <div>
                            <form onSubmit={checkOtp}>
                                <div className="flex flex-col space-y-16">
                                    <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                                        {verificationCode.map((digit, index) => (
                                            <div key={index} className="w-16 h-16">
                                                <input
                                                    className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                                                    type="text"
                                                    value={digit}
                                                    onChange={(e) => handleChange(index, e.target.value)}
                                                />
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex flex-col space-y-5">
                                        <div>
                                            <button
                                                type="submit"
                                                className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
                                                
                                            >
                                                Verify Account
                                            </button>
                                        </div>

                                        <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                                            <p>Didn't receive code?</p>{' '}
                                            <button
                                                type="button"
                                                onClick={handleResend}
                                                className="flex flex-row items-center text-blue-600"
                                            >
                                                Resend
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>)}
        {show===1 &&
            (<body class="bg-gray-100 flex items-center justify-center h-screen" style={{ fontFamily: "montserrat" }}>
                <div class="container max-w-md w-full rounded-md shadow-md overflow-hidden">
                    <div class="w-full bg-white p-8 flex flex-col items-center">
                        <h1 class="font-bold text-2xl mb-4">Sign Up</h1>
                        <form onSubmit={handleSubmit} method='post' >
                            <input
                                type="text"
                                placeholder="Name"
                                name="username"
                                value={data.name}
                                onChange={(e) => setData({ ...data, name: e.target.value })}
                                className="bg-gray-200 mb-4 p-3 rounded-sm w-full"
                                autoComplete="off"
                                required
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                name="email"
                                value={data.email}
                                onChange={(e) => setData({ ...data, email: e.target.value })}
                                className="bg-gray-200 mb-4 p-3 rounded-sm w-full"
                                autoComplete="off"
                                required
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                onChange={(e) => setData({ ...data, password: e.target.value })}
                                value={data.password}
                                className="bg-gray-200 mb-4 p-3 rounded-sm w-full"
                                autoComplete="off"
                                required
                            />
                            <input
                                type="number"
                                placeholder="Mobile No."
                                name="mobile"
                                onChange={(e) => setData({ ...data, number: e.target.value })}
                                value={data.number}
                                className="bg-gray-200 mb-4 p-3 rounded-sm w-full"
                                autoComplete="off"
                                required
                            />
                            <a href='#' style={{ textAlign: "right", color: "blue" }} onClick={verifyNumber}>Verify Number</a>
                            <button type="submit" class="bg-green-700 text-white font-bold uppercase py-3 px-8 mt-2 rounded-full w-full" onClick={handleSubmit}>Sign Up</button>
                        </form>
                    </div>
                    <div class="w-full bg-green-300 flex flex-col items-center justify-center p-8">
                        <div class="text-white">
                            <h1 class="font-bold text-2xl mb-4">Already Signed?</h1>
                            <Link to="/login" class="bg-green-700 text-white font-bold uppercase py-3 px-8 rounded-full">Login</Link>
                        </div>
                    </div>
                </div>
            </body>)}
    </>);
}

export default Register;
