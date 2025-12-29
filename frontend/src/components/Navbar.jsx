import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Home, Leaf, Calculator, Info, LogIn, User } from 'lucide-react'

export default function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    navigate('/login');
    window.location.reload();
  };

  return (
    <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-emerald-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="bg-emerald-600 p-2 rounded-xl">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">SustainaMind</h2>
          </Link>

          <nav className="hidden md:flex items-center space-x-2">
            <Link to="/" className="flex items-center space-x-2 px-4 py-2 text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors duration-200 font-medium">
              <Home className="w-4 h-4" /> <span>Home</span>
            </Link>

            {/* Protected Route Link */}
            {isLoggedIn && (
              <Link to="/track-carbon" className="flex items-center space-x-2 px-4 py-2 text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors duration-200 font-medium">
                <Calculator className="w-4 h-4" /> <span>Track Carbon</span>
              </Link>
            )}

            <Link to="/about" className="flex items-center space-x-2 px-4 py-2 text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors duration-200 font-medium">
              <Info className="w-4 h-4" /> <span>About</span>
            </Link>

            {isLoggedIn ? (
              <>
                <Link to="/profile" className="flex items-center space-x-2 px-4 py-2 text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors duration-200 font-medium">
                  <User className="w-4 h-4" /> <span>Profile</span>
                </Link>
                <button onClick={handleLogout} className="px-4 py-2 bg-red-100 text-red-600 hover:bg-red-200 rounded-lg font-medium transition-colors">
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg transition-colors duration-200 font-medium">
                <LogIn className="w-4 h-4" /> <span>Login</span>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}