import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loginUser } from "../features/auth/authSlice"
import { useNavigate, Link } from "react-router-dom"
import { Lock, Mail } from "lucide-react"

export default function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user, loading, error, initializing } = useSelector((state) => state.auth)
  const [form, setForm] = useState({ email: "", password: "" })

  useEffect(() => {
    if (!initializing && user) {
      if (user.role === "admin") {
        navigate("/admin", { replace: true })
      } else {
        navigate("/profile", { replace: true })
      }
    }
  }, [user, initializing, navigate])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(loginUser(form))
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorative blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-pink-400 opacity-20 rounded-full blur-3xl"></div>
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-400 opacity-15 rounded-full blur-2xl transform -rotate-45"></div>

      <div className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Decorative gradient circles */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full opacity-20 blur-2xl"></div>
        <div className="absolute -top-12 left-0 w-32 h-32 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full opacity-30 blur-xl"></div>

        <div className="relative z-20 p-8 md:p-10">
          <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            User Login
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-2.5 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-2.5 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition"
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm font-medium">
                {typeof error === 'string' ? error : (error.error || error.message || 'Login failed')}
              </p>
            )}

            <button
              disabled={loading}
              className="w-full py-2.5 mt-6 bg-gradient-to-r from-blue-600 to-pink-600 text-white font-semibold rounded-lg hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="text-center mt-6 pt-6 border-t border-gray-200">
            <p className="text-gray-600 text-sm">
              Don’t have an account?{" "}
              <Link to="/register" className="font-semibold text-purple-600 hover:text-pink-600 transition">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
