import { useState } from "react"
import { Link } from "react-router-dom"
import AuthBg from "../components/AuthBg"

function Login() {
  const [user, setUser] = useState({})
  const [error, setError] = useState(null)

  const hundleSubmit = async (e) => {
    e.preventDefault()
    console.log(user)

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
        <div className="mb-2">
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
        <div className="mb-4 flex justify-between items-center">
          <Link className="text-indigo-600 hover:underline" to={"/email-verification"}>forgot you password</Link>
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
        >
          Login
        </button>
      </form>
      <div className="mt-4 text-sm text-gray-300">
        you don't have an account?{" "}
        <Link to="/register" className="text-indigo-600 hover:underline ms-0.5">
          Register
        </Link>
      </div>
    </AuthBg>

  )
}

export default Login