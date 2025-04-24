import { useState } from "react"
import { Link } from "react-router-dom"
import AuthBg from "../components/AuthBg"

const EmailVerify = () => {

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);


  const hundleChange = (e, index) => {
    const newOtp = [...otp];
    newOtp[index] = e.target.value;
    setOtp(newOtp);
    if (e.target.value && index < otp.length - 1) {
      e.target.nextSibling.focus();
    }
    if (e.target.value === "" && index > 0) {
      e.target.previousSibling.focus();
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpCode = otp.join("");
    console.log("OTP Code:", otpCode);
  }

  return (
    <AuthBg pageName="Forgot Password">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="mb-4 flex gap-3 w-full items-center">
          {otp.map((value, index) => (
            <input type="text"
              className="w-full h-12 text-center text-2xl text-gray-300 border-b-2 border-gray-300 focus:outline-none focus:border-indigo-500"
              maxLength="1"
              key={index}
              value={value}
              onChange={(e) => hundleChange(e, index)}
            />
          ))}
        </div>
        <button
          disabled={otp.some((value) => value === "")}
          type="submit"
          className={otp.some((value) => value === "") ? "w-full px-4 py-2 bg-gray-500 text-gray-300 rounded-md" : "w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"}
        >
          Send
        </button>
      </form>
    </AuthBg>
  )
}

export default EmailVerify