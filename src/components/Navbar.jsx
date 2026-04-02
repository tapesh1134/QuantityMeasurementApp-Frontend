import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { openLogin, openSignup } from '../store/modalSlice';
import { logoutUser } from '../store/authSlice';
import { Menu, X } from 'lucide-react';
import { addToast } from '../store/toastSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate('/');
      dispatch(addToast({
        type: "success",
        message: "Logged out successfully!",
      }));
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  
  const handleDocs = () => {
    window.location.href = "/swagger-ui/index.html";
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/30 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <div
          className="text-2xl font-bold cursor-pointer hover:text-indigo-400 transition"
          onClick={() => navigate('/')}
        >
          QuantMeasure
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">

          {/* Home (NEW) */}
          <Link to="/" className="text-gray-300 hover:text-white transition">
            Home
          </Link>

          <Link to="/operations" className="text-gray-300 hover:text-white transition">
            Tools
          </Link>

          {isAuthenticated && (
            <>
              <Link to="/history" className="text-gray-300 hover:text-white transition">
                History
              </Link>
            </>
          )}
          <a href='/swagger-ui/index.html' className="text-gray-300 hover:text-white transition">
            Docs
          </a>
        </div>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-6">
          {isLoading ? (
            <div className="h-4 w-12 bg-white/10 animate-pulse rounded"></div>
          ) : isAuthenticated ? (
            <div className="flex items-center gap-6">

              {/* Profile */}
              <button
                onClick={() => navigate('/profile')}
                className="flex items-center gap-2 text-indigo-200 hover:text-white transition"
              >
                <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-xs font-bold">
                  {user?.firstName?.charAt(0) || 'U'}
                </div>
                <span className="hidden sm:inline">
                  Hi, {user?.firstName || 'User'}
                </span>
              </button>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="text-sm text-gray-400 hover:text-pink-400 border-l border-white/20 pl-6"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={() => dispatch(openLogin())}
                className="text-gray-300 hover:text-white"
              >
                Login
              </button>

              <button
                onClick={() => dispatch(openSignup())}
                className="bg-indigo-600 hover:bg-indigo-500 px-5 py-2 rounded-full text-sm font-semibold shadow-lg"
              >
                Get Started
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden bg-black/90 backdrop-blur-lg px-6 py-4 space-y-4 border-t border-white/10">

          <Link to="/" onClick={() => setOpen(false)} className="block text-gray-300">
            Home
          </Link>
          <Link to="/operations" onClick={() => setOpen(false)} className="block text-gray-300">
            Tools
          </Link>

          {isAuthenticated && (
            <>
              <Link to="/history" onClick={() => setOpen(false)} className="block text-gray-300">
                History
              </Link>

              <button
                onClick={() => {
                  navigate('/profile');
                  setOpen(false);
                }}
                className="block text-gray-300"
              >
                Profile
              </button>

              <button
                onClick={handleLogout}
                className="block text-pink-400"
              >
                Logout
              </button>
            </>
          )}

          {!isAuthenticated && (
            <>
              <button
                onClick={() => {
                  dispatch(openLogin());
                  setOpen(false);
                }}
                className="block text-gray-300"
              >
                Login
              </button>

              <button
                onClick={() => {
                  dispatch(openSignup());
                  setOpen(false);
                }}
                className="block text-indigo-400"
              >
                Get Started
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;