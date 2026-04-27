import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">

        <h1 className="text-3xl font-bold text-center text-blue-600 mb-2">
          DevBoard
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Login to your account
        </p>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-1">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>

        <button
          onClick={() => navigate('/dashboard')}
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700"
        >
          Login
        </button>

        <p className="text-center text-gray-500 mt-4">
          Don't have an account?{" "}
          <span
            onClick={() => navigate('/signup')}
            className="text-blue-600 font-medium cursor-pointer hover:underline"
          >
            Sign Up
          </span>
        </p>

      </div>
    </div>
  );
}

export default Login;