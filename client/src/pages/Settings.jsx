import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiLock, FiEye, FiEyeOff, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import MainLayout from "../layouts/MainLayout";
import { changePassword } from "../services/auth.service";

function Settings() { 
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear errors when user types
    if (error) setError("");
    if (success) setSuccess(false);
  };

  const validateForm = () => {
    if (!formData.currentPassword) {
      setError("Current password is required");
      return false;
    }
    if (!formData.newPassword) {
      setError("New password is required");
      return false;
    }
    if (formData.newPassword.length < 6) {
      setError("New password must be at least 6 characters");
      return false;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      setLoading(true);
      setError("");
      
      await changePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword
      }); 

      setSuccess(true);
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });

      setTimeout(() => {
        navigate("/");
      }, 2000);

    } catch (error) {
      setError(
        error.response?.data?.message || 
        "Failed to change password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white font-['Segoe_UI','Arial',sans-serif] tracking-tight">
            Change Password
          </h1>
          <p className="text-[#6a8a9a] font-['Segoe_UI','Arial',sans-serif] text-sm mt-1">
            Update your password to keep your account secure
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-[#1a2332] border border-[#2a3a4a] rounded-xl p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Success Message */}
            {success && (
              <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center gap-2">
                <FiCheckCircle className="text-green-400 text-sm flex-shrink-0" />
                <p className="text-xs text-green-400 font-['Segoe_UI','Arial',sans-serif]">
                  Password changed successfully! Redirecting...
                </p>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-2">
                <FiAlertCircle className="text-red-400 text-sm flex-shrink-0" />
                <p className="text-xs text-red-400 font-['Segoe_UI','Arial',sans-serif]">
                  {error}
                </p>
              </div>
            )}

            {/* Current Password */}
            <div>
              <label className="block text-[10px] text-[#8a9aaa] font-['Segoe_UI','Arial',sans-serif] font-semibold uppercase tracking-wider mb-1.5">
                Current Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="h-4 w-4 text-[#4a5a6a]" />
                </div>
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  placeholder="Enter your current password"
                  className="w-full pl-9 pr-10 py-2.5 bg-[#0d1624] border border-[#2a3a4a] rounded-lg focus:ring-1 focus:ring-[#4a9aff] focus:border-[#4a9aff] outline-none transition-all duration-200 text-white font-['Segoe_UI','Arial',sans-serif] text-sm placeholder:text-[#4a5a6a]"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#4a5a6a] hover:text-[#8a9aaa] transition-colors"
                >
                  {showCurrentPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div>
              <label className="block text-[10px] text-[#8a9aaa] font-['Segoe_UI','Arial',sans-serif] font-semibold uppercase tracking-wider mb-1.5">
                New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="h-4 w-4 text-[#4a5a6a]" />
                </div>
                <input
                  type={showNewPassword ? "text" : "password"}
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  placeholder="Enter your new password (min 6 characters)"
                  className="w-full pl-9 pr-10 py-2.5 bg-[#0d1624] border border-[#2a3a4a] rounded-lg focus:ring-1 focus:ring-[#4a9aff] focus:border-[#4a9aff] outline-none transition-all duration-200 text-white font-['Segoe_UI','Arial',sans-serif] text-sm placeholder:text-[#4a5a6a]"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#4a5a6a] hover:text-[#8a9aaa] transition-colors"
                >
                  {showNewPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-[10px] text-[#8a9aaa] font-['Segoe_UI','Arial',sans-serif] font-semibold uppercase tracking-wider mb-1.5">
                Confirm New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="h-4 w-4 text-[#4a5a6a]" />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your new password"
                  className="w-full pl-9 pr-10 py-2.5 bg-[#0d1624] border border-[#2a3a4a] rounded-lg focus:ring-1 focus:ring-[#4a9aff] focus:border-[#4a9aff] outline-none transition-all duration-200 text-white font-['Segoe_UI','Arial',sans-serif] text-sm placeholder:text-[#4a5a6a]"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#4a5a6a] hover:text-[#8a9aaa] transition-colors"
                >
                  {showConfirmPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
            </div>

            {/* Password Requirements */}
            <div className="bg-[#0d1624] border border-[#2a3a4a] rounded-lg p-3">
              <p className="text-[9px] text-[#6a8a9a] font-['Segoe_UI','Arial',sans-serif] font-semibold uppercase tracking-wider mb-1.5">
                Password Requirements:
              </p>
              <ul className="space-y-1 text-[10px] text-[#4a5a6a] font-['Segoe_UI','Arial',sans-serif]">
                <li className="flex items-center gap-2">
                  <span className={`w-1 h-1 rounded-full ${formData.newPassword.length >= 6 ? 'bg-green-400' : 'bg-[#2a3a4a]'}`}></span>
                  At least 6 characters
                </li>
                <li className="flex items-center gap-2">
                  <span className={`w-1 h-1 rounded-full ${/[A-Z]/.test(formData.newPassword) ? 'bg-green-400' : 'bg-[#2a3a4a]'}`}></span>
                  At least one uppercase letter
                </li>
                <li className="flex items-center gap-2">
                  <span className={`w-1 h-1 rounded-full ${/[0-9]/.test(formData.newPassword) ? 'bg-green-400' : 'bg-[#2a3a4a]'}`}></span>
                  At least one number
                </li>
              </ul>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-2.5 rounded-lg bg-[#2a4a6a] hover:bg-[#3a5a7a] text-white font-['Segoe_UI','Arial',sans-serif] font-medium text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Updating...</span>
                  </div>
                ) : (
                  "Update Password"
                )}
              </button>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex-1 py-2.5 rounded-lg bg-[#2a3a4a] hover:bg-[#3a4a5a] text-[#8a9aaa] hover:text-white font-['Segoe_UI','Arial',sans-serif] font-medium text-sm transition-all duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  );
}

export default Settings;