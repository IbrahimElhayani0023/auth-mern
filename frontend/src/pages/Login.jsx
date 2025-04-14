import { useState } from "react"

import AuthBg from "../components/AuthBg"

function Login() {
  const [user, setUser] = useState({})
  const [error, setError] = useState(null)

  const hundleSubmit = async (e) => {
    e.preventDefault()
    console.log(user)
    // try {
    //   const response = await fetch("http://localhost:5000/api/v1/auth/login", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(user),
    //   })
    //   const data = await response.json()
    //   if (response.ok) {
    //     // 
    //   } else {
    //     setError(data.message)
    //   }

    // } catch (error) {
    //   setError(error.response.data.message)
    //   console.error(error)
    // }
  }
  return (
    <AuthBg pageName="Login">
      <form onSubmit={hundleSubmit} >
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-300">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="w-full px-4 py-2 mt-1 rounded-md focus:outline-none bg-gray-800 text-gray-300 border border-gray-600 focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-300">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Password"
            className="w-full px-4 py-2 mt-1 rounded-md focus:outline-none bg-gray-800 text-gray-300 border border-gray-600 focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Login
        </button>
      </form>
    </AuthBg>

  )
}

export default Login