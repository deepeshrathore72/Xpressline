import React, { useState } from 'react'
import axios from 'axios'

function Otp() {
  const [otp, setOtp] = useState(null);
  const [verificationCode, setVerificationCode] = useState(['', '', '', '']);

  const handleChange = (index, value) => {
    if (value.match(/^\d*$/) && value.length <= 1) {
      const newVerificationCode = [...verificationCode];
      newVerificationCode[index] = value;
      setVerificationCode(newVerificationCode);
    }
  };
  const handleSubmitOtp = (e) => {
    // e.preventDefault();
    // Implement verification logic using the verificationCode array
    const code = verificationCode.join('');
    console.log('Submitted verification code:', code);
  };
  const handleResend = () => {
    // Implement resend logic
    console.log('Resend code');
    axios.get("http://localhost:3001/api/auth/verify")
  };
  const openRegister = () => {
    window.location.href="/register"
  }
  const checkOtp = async (e) => {
    e.preventDefault();
    console.log("verify" + verificationCode.join(''));
    if (verificationCode.join('') === otp) {
      axios.get("http://localhost:3001/api/auth/verify2");
    }
  }

  return (
    <div class="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12" style={{ fontFamily: "montserrat" }}>
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
            <form onSubmit={handleSubmitOtp}>
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
                      onClick={checkOtp}
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
    </div>
  )
}

export default Otp