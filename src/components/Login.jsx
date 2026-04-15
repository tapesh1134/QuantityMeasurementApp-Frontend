import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, clearError } from '../store/authSlice';
import { closeModal, openSignup } from '../store/modalSlice';
import { addToast } from '../store/toastSlice';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const { isLoading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();

  // Close modal on success
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(closeModal());

      dispatch(
        addToast({
          type: "success",
          title: "Login successful!",
          message: "Welcome back 🎉",
        })
      );
    }
  }, [isAuthenticated, dispatch]);

  useEffect(() => {
    if (error) {
      dispatch(
        addToast({
          type: "error",
          title: "Login failed",
          message: error,
        })
      );
    }
  }, [error, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };

  // ✅ Google Login Handler
  const handleGoogleLogin = () => {
    window.location.href = "/api/auth/oauth2/authorization/google";
  };

  return (
    <div className="bg-white/20 backdrop-blur-2xl border border-white/30 p-8 rounded-3xl shadow-2xl">

      <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
      <p className="text-indigo-100 text-sm mb-6">
        Enter your credentials to continue.
      </p>

      {/* 🔴 Error */}
      {error && (
        <div className="bg-red-500/20 border border-red-500/50 text-red-200 p-3 rounded-xl mb-4 text-sm">
          {error}
        </div>
      )}

      {/* Form */}
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          required
          className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-white/50"
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          required
          className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-white/50"
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />

        <button
          disabled={isLoading}
          className="w-full bg-white text-indigo-600 font-bold py-3 rounded-xl hover:bg-indigo-50 transition-all flex justify-center items-center"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          ) : (
            'Sign In'
          )}
        </button>
      </form>

      {/* Signup */}
      <p className="mt-6 text-center text-sm">
        New here?{' '}
        <button
          onClick={() => {
            dispatch(clearError());
            dispatch(openSignup());
          }}
          className="font-bold underline"
        >
          Create Account
        </button>
      </p>

      {/* Divider */}
      <div className="flex items-center my-4">
        <div className="flex-1 h-px bg-white/20"></div>
        <span className="px-3 text-sm text-indigo-100">or</span>
        <div className="flex-1 h-px bg-white/20"></div>
      </div>

      {/* 🔵 Google Login */}
      <button
        onClick={handleGoogleLogin}
        className="w-full flex items-center justify-center gap-3 bg-white text-gray-800 font-semibold py-3 rounded-xl mb-4 hover:bg-gray-100 transition-all"
      >
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="google"
          className="w-5 h-5"
        />
        Continue with Google
      </button>
    </div>
  );
};

export default Login;