import AuthBg from "../components/AuthBg"

function Login() {
  return (
    <AuthBg pageName="Login">
    <form >
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-300">
          Email
        </label>
        <input
          type="email"
          id="email"
          placeholder="Email"
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