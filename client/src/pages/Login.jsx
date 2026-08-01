import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginService } from "../services/auth.service";
import { useAuth } from "../context/AuthContext";
import { FiLock, FiUser, FiEye, FiEyeOff, FiLogIn } from "react-icons/fi";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const data = await loginService({ username, password });
      login(data.admin, data.token);
      navigate("/dashboard");
    } catch (error) {
      setError(error.response?.data?.message || "Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a2332] p-4">
      <div className="w-full max-w-md">
        {/* Brand Section */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <img 
              src="/logosh.png" 
              alt="FactoryPulse Logo" 
              className="h-16 w-auto object-contain"
            />
          </div>
          <h1 className="text-2xl font-bold text-white font-['Segoe_UI','Arial',sans-serif] tracking-tight">
            FactoryPulse
          </h1>
          <p className="text-[#8a9aaa] mt-1 font-['Segoe_UI','Arial',sans-serif] text-sm">
            Manufacturing Control System
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-[#2a3a4a] border border-[#3a4a5a] rounded-xl shadow-2xl p-8">
          <form onSubmit={handleSubmit}>
            {/* Error Message */}
            {error && (
              <div className="mb-6 p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-2">
                <p className="text-xs text-red-400 font-['Segoe_UI','Arial',sans-serif]">
                  {error}
                </p>
              </div>
            )}

            {/* Username Field */}
            <div className="mb-5">
              <label htmlFor="username" className="block text-[10px] text-[#8a9aaa] font-['Segoe_UI','Arial',sans-serif] font-semibold uppercase tracking-wider mb-1.5">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="h-4 w-4 text-[#6a8a9a]" />
                </div>
                <input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-[#1a2332] border border-[#3a4a5a] rounded-lg focus:ring-1 focus:ring-[#4a9aff] focus:border-[#4a9aff] outline-none transition-all duration-200 text-white font-['Segoe_UI','Arial',sans-serif] text-sm placeholder:text-[#6a8a9a]"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="password" className="block text-[10px] text-[#8a9aaa] font-['Segoe_UI','Arial',sans-serif] font-semibold uppercase tracking-wider">
                  Password
                </label>
                <a href="#" className="text-[10px] text-[#4a9aff] hover:text-[#6ab0ff] font-['Segoe_UI','Arial',sans-serif] transition-colors">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="h-4 w-4 text-[#6a8a9a]" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full pl-9 pr-10 py-2.5 bg-[#1a2332] border border-[#3a4a5a] rounded-lg focus:ring-1 focus:ring-[#4a9aff] focus:border-[#4a9aff] outline-none transition-all duration-200 text-white font-['Segoe_UI','Arial',sans-serif] text-sm placeholder:text-[#6a8a9a]"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#6a8a9a] hover:text-[#8a9aaa] transition-colors"
                >
                  {showPassword ? (
                    <FiEyeOff className="h-4 w-4" />
                  ) : (
                    <FiEye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#3a5a7a] hover:bg-[#4a6a8a] active:bg-[#5a7a9a] text-white font-['Segoe_UI','Arial',sans-serif] font-medium py-2.5 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <FiLogIn className="h-4 w-4" />
                  <span>Sign In</span>
                </>
              )}
            </button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#3a4a5a]"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-3 bg-[#2a3a4a] text-[#6a8a9a] font-['Segoe_UI','Arial',sans-serif]">
                  SECURE ACCESS
                </span>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between">
              <p className="text-[8px] text-[#6a8a9a] font-['Segoe_UI','Arial',sans-serif]">
                Industrial Control System
              </p>
              <p className="text-[8px] text-[#6a8a9a] font-['Segoe_UI','Arial',sans-serif]">
                v3.2.1
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;