import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import {
  Home,
  Calendar,
  BarChart3,
  Settings,
  Lock,
  Eye,
  Mail,
  MoreVertical,
  Send,
} from "lucide-react";
import { useSelector } from "react-redux";
import Logout from "../components/Logout";
export default function AdminDashboard() {

  const { user } = useSelector(state => state.auth);

  // Mock data for statistics
  const statisticsData = [
    { label: "Income", value: "$4,200", change: "+12%", color: "bg-purple-100 text-purple-600" },
    { label: "Monthly Expenses", value: "$1,530", change: "-8%", color: "bg-blue-100 text-blue-600" },
    { label: "Investments Expenses", value: "$2,900", change: "+5%", color: "bg-green-100 text-green-600" },
    { label: "Extra Expenses", value: "$7,500", change: "+3%", color: "bg-pink-100 text-pink-600" },
  ];

  const investmentChartData = [
    { month: "Jan", value: 800 },
    { month: "Feb", value: 900 },
    { month: "Mar", value: 750 },
    { month: "Apr", value: 850 },
    { month: "May", value: 900 },
    { month: "Jun", value: 850 },
  ];

  const investmentStats = [
    { name: "Trust fund", value: "₹7,500", change: "+10%" },
    { name: "Stocks", value: "₹1,100", change: "+0.1%" },
    { name: "Crypto", value: "₹1,200", change: "+520" },
    { name: "Bonds", value: "₹1,520", change: "+150" },
  ];

  const cardDetails = [
    { label: "CARD NUMBER", value: "6590 6503 4701 XXXX" },
    { label: "CARDHOLDER", value: "Jessy Name" },
    { label: "EXPIRY", value: "+12*" },
  ];

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-purple-50 to-white border-r border-gray-200">
        {/* User Profile Section */}
        <div className="p-6 text-center border-b border-gray-200">
          <div className="flex justify-center mb-4">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center border-4 border-white shadow-lg">
              <img
                src="/avatar.jpeg"
                alt="User"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </div>
          <h2 className="text-lg font-bold text-gray-800 mb-2">{user.username}</h2>
          <p className="text-sm text-gray-500 mb-4">Admin</p>

          {/* Quick Action Icons */}
          <div className="flex gap-3 justify-center">
            <button className="w-12 h-12 rounded-full bg-purple-200 hover:bg-purple-300 flex items-center justify-center transition">
              <Lock size={20} className="text-purple-600" />
            </button>
            <button className="w-12 h-12 rounded-full bg-purple-200 hover:bg-purple-300 flex items-center justify-center transition">
              <Eye size={20} className="text-purple-600" />
            </button>
            <button className="w-12 h-12 rounded-full bg-purple-200 hover:bg-purple-300 flex items-center justify-center transition">
              <Mail size={20} className="text-purple-600" />
            </button>
          </div>
          <div className="mt-4">
            <Logout />
          </div>
        </div>

        {/* Menu Section */}
        <nav className="p-6">
          <p className="text-xs font-semibold text-gray-500 uppercase mb-4">MENU</p>
          <ul className="space-y-2">
            <li>
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-purple-200 text-purple-600 font-medium transition">
                <Home size={20} />
                <span>Home</span>
              </button>
            </li>
            <li>
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100 transition">
                <Calendar size={20} />
                <span>Calendar</span>
              </button>
            </li>
            <li>
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100 transition">
                <BarChart3 size={20} />
                <span>Statistics</span>
              </button>
            </li>
            <li>
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100 transition">
                <Settings size={20} />
                <span>Account settings</span>
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header with Title and Menu */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
            <button className="p-2 hover:bg-gray-200 rounded-lg transition">
              <MoreVertical size={24} className="text-gray-600" />
            </button>
          </div>

          {/* Statistics Section */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">MY STATISTICS</h2>
              <MoreVertical size={20} className="text-gray-400" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              {statisticsData.map((stat, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">{stat.label}</span>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${stat.color} font-semibold`}
                    >
                      {stat.change}
                    </span>
                  </div>
                  <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                      style={{ width: `${Math.random() * 100}%` }}
                    />
                  </div>
                  <p className="text-lg font-bold text-gray-800">{stat.value}</p>
                </div>
              ))}
              <button className="col-span-1 md:col-span-2 mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm transition">
                More detail
              </button>
            </div>
          </div>

          {/* Cards and Investments Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* My Cards */}
            <div className="lg:col-span-1">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">MY CARDS</h2>
                <MoreVertical size={20} className="text-gray-400" />
              </div>

              {/* Card */}
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-6 text-white shadow-lg">
                <div className="flex justify-between items-start mb-12">
                  <div>
                    <p className="text-sm text-blue-100 mb-1">Card Type</p>
                    <p className="font-bold text-lg">PLATINUM</p>
                  </div>
                  <div className="w-12 h-8 bg-blue-400 rounded opacity-70" />
                </div>

                {cardDetails.map((detail, index) => (
                  <div key={index} className="mb-3">
                    <p className="text-xs text-blue-100 font-semibold mb-1">{detail.label}</p>
                    <p className="text-sm font-mono">{detail.value}</p>
                  </div>
                ))}
              </div>

              {/* Card List Below */}
              <div className="mt-4 space-y-3">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <p className="font-semibold text-gray-800">Shopp Name</p>
                      <MoreVertical size={16} className="text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-500 mb-2">Card</p>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Amount:</span>
                      <span className="font-semibold text-green-600">+₹2000</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* My Investments */}
            <div className="lg:col-span-2">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">MY INVESTMENTS</h2>
                <MoreVertical size={20} className="text-gray-400" />
              </div>

              {/* Investment Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {investmentStats.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
                  >
                    <p className="text-sm text-gray-600 mb-2">{stat.name}</p>
                    <div className="flex justify-between items-baseline">
                      <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                      <span className="text-xs text-green-600 font-semibold">
                        {stat.change}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Investment Chart */}
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={investmentChartData}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="month" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#8b5cf6"
                      fillOpacity={1}
                      fill="url(#colorValue)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Quick Send Card */}
          <div className="bg-gradient-to-r from-green-400 to-green-500 rounded-xl p-6 text-white shadow-lg inline-block">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <Send size={32} />
              </div>
              <div>
                <p className="text-sm text-green-100 mb-1">Quick send</p>
                <p className="text-4xl font-bold">$ 5.320</p>
              </div>
              <div className="ml-8 flex gap-2">
                <div className="w-3 h-3 rounded-full bg-white opacity-60" />
                <div className="w-3 h-3 rounded-full bg-white" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
