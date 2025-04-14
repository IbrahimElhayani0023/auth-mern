
function AuthBg({ children, pageName }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <div className="w-full max-w-md p-8 bg-gray-700 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-indigo-400 mb-6">{pageName}</h2>
        {children}
      </div>
    </div>
  );
}

export default AuthBg;