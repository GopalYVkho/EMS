import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/auth";

const Settings = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.newPassword !== formData.confirmPassword) {
      setError("New password and Confirm password do not match!");
      return;
    }

    if (formData.newPassword.length < 6) {
      setError("New password must be at least 6 characters long.");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const response = await axios.put(
        "http://localhost:3000/api/setting/change-password",
        {
          userId:user._id,
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setSuccess("Password changed successfully!");
        setFormData({ oldPassword: "", newPassword: "", confirmPassword: "" });
      }
    } catch (error) {
      setError(
        error.response?.data?.error || "Failed to change password. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 w-full bg-gray-50 p-4 sm:p-6 md:p-8 h-screen overflow-y-auto">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="mb-6 border-b border-gray-200 pb-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Settings
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage your account settings and security preferences.
          </p>
        </div>

        {/* Change Password Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
          <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
            <svg
              className="w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              ></path>
            </svg>
            Change Password
          </h2>

          {/* Error & Success Messages */}
          {error && (
            <div className="mb-6 p-3 bg-red-50 text-red-600 border border-red-200 rounded-lg text-sm font-medium">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-6 p-3 bg-green-50 text-green-600 border border-green-200 rounded-lg text-sm font-medium">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 1. Old Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Old Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                name="oldPassword"
                value={formData.oldPassword}
                onChange={handleChange}
                required
                placeholder="Enter current password"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              />
            </div>

            {/* 2. New Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                required
                placeholder="Enter new password"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              />
            </div>

            {/* 3. Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="Confirm new password"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-gray-100 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-md transition-colors disabled:bg-blue-400"
              >
                {loading ? "Updating..." : "Save Password"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
