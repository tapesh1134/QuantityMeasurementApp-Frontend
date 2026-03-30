import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { logoutUser } from '../store/authSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ FIX: all selectors at top
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );

  // ✅ FIX: wait for loading before redirect
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, isLoading, navigate]);

  // ✅ Prevent UI crash
  if (isLoading) {
    return (
      <div className="text-center mt-20 text-white">
        Loading profile...
      </div>
    );
  }

  if (!user) return null;

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap(); // ✅ FIX
      navigate('/');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-12">
      <div className="max-w-2xl w-full bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">

        {/* Glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/20 blur-3xl rounded-full"></div>

        <div className="relative z-10">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row items-center gap-8 mb-10">
            
            {/* Avatar */}
            <div className="w-32 h-32 bg-gradient-to-tr from-indigo-400 to-pink-400 rounded-full flex items-center justify-center text-4xl font-bold border-4 border-white/30">
              {user.firstName?.charAt(0)}
              {user.lastName?.charAt(0)}
            </div>

            <div className="text-center md:text-left">
              <h1 className="text-4xl font-extrabold mb-1">
                {user.firstName} {user.lastName}
              </h1>
              <p className="text-indigo-200">
                Manage your account details
              </p>
            </div>
          </div>

          {/* Info */}
          <div className="grid md:grid-cols-2 gap-6">
            
            <div>
              <label className="text-xs text-indigo-200/60">
                First Name
              </label>
              <div className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4">
                {user.firstName || 'N/A'}
              </div>
            </div>

            <div>
              <label className="text-xs text-indigo-200/60">
                Last Name
              </label>
              <div className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4">
                {user.lastName || 'N/A'}
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="text-xs text-indigo-200/60">
                Email
              </label>
              <div className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4">
                {user.email}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            
            <Link
              to="/"
              className="flex-1 bg-white/10 hover:bg-white/20 border border-white/20 text-center py-4 rounded-2xl font-bold transition-all"
            >
              Back to Dashboard
            </Link>

            <button
              onClick={handleLogout}
              disabled={isLoading}
              className="flex-1 bg-red-500/20 hover:bg-red-500/40 border border-red-500/50 py-4 rounded-2xl font-bold transition-all disabled:opacity-50"
            >
              {isLoading ? 'Processing...' : 'Logout'}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;