import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, clearError } from '../store/authSlice';
import { openLogin } from '../store/modalSlice';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const { loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(registerUser(formData)).unwrap();
      dispatch(clearError());
      dispatch(openLogin()); // ✅ open login modal
    } catch (err) {
      console.error(err); // error already handled in redux
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };

  return (
    <div className="bg-white/20 backdrop-blur-2xl border border-white/30 p-8 rounded-3xl shadow-2xl">
      <h2 className="text-3xl font-bold mb-2">Create Account</h2>
      <p className="text-indigo-100 text-sm mb-6">Join us to start measuring precisely.</p>

      {error && <div className="bg-red-500/20 border border-red-500/50 text-red-200 p-3 rounded-xl mb-4 text-sm">{error}</div>}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          required
          className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-white/50"
          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
        />
        <input
          type="text"
          placeholder="Last Name"
          required
          className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-white/50"
          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email Address"
          required
          className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-white/50"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Create Password"
          required
          className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-white/50"
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        <button
          disabled={loading}
          className="w-full bg-white text-indigo-600 font-bold py-3 rounded-xl hover:bg-indigo-50 transition-all flex justify-center items-center"
        >
          {loading ? <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div> : 'Register Now'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm">
        Already have an account? <button onClick={() => { dispatch(clearError()); dispatch(openLogin()); }} className="font-bold underline">Login</button>
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
        disabled
        className="w-full flex items-center justify-center gap-3 bg-white text-gray-800 font-semibold py-3 rounded-xl mb-4 hover:bg-gray-100 transition-all"
      >
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="google"
          className="w-5 h-5"
        />
        Continue with Google
      </button>
      <p className="mt-6 text-center text-sm">OAuth2 login is only supported on a secure domain.</p>
    </div>
  );
};

export default Signup;