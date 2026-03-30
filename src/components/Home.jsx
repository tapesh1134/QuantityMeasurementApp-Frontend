import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openLogin, openSignup } from '../store/modalSlice';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const features = [
    { title: "Fast Conversion", desc: "Instantly switch between metric and imperial units with zero lag.", icon: "⚡" },
    { title: "Multiple Units", desc: "Support for Length, Weight, Volume, Temperature and more.", icon: "📏" },
    { title: "Easy to Use", desc: "A clean, minimal interface designed for speed and simplicity.", icon: "✨" }
  ];
  const navigate = useNavigate();

  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();
  const onGetStarted = () => {
    dispatch(openSignup());
  }
  const onLogin = () => {
    dispatch(openLogin());
  }

  return (
    <div className="pt-20 pb-32 px-6">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto text-center space-y-8">
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
          Measure Anything <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-200 to-teal-200">
            Instantly.
          </span>
        </h1>
        <p className="text-lg md:text-xl text-indigo-100 max-w-2xl mx-auto">
          The ultimate utility for precise unit conversions. Whether you're cooking, building, or traveling, we've got the numbers right.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {isLoading ? (
            <div className="h-4 w-12 bg-white/10 animate-pulse rounded"></div>
          ) : isAuthenticated ? (
            <div className="flex items-center gap-6">
              <button
                onClick={() => navigate("/operations")}
                className="w-full sm:w-auto px-8 py-4 bg-white text-indigo-600 rounded-2xl font-bold text-lg hover:bg-indigo-50 transition-all shadow-xl hover:shadow-white/20"
              >
                Try It Now
              </button>

              <button
                onClick={() => navigate("/history")}
                className="w-full sm:w-auto px-8 py-4 bg-white/10 border border-white/20 backdrop-blur-md rounded-2xl font-bold text-lg hover:bg-white/20 transition-all"
              >
                View History
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={onGetStarted}
                className="w-full sm:w-auto px-8 py-4 bg-white text-indigo-600 rounded-2xl font-bold text-lg hover:bg-indigo-50 transition-all shadow-xl hover:shadow-white/20"
              >
                Get Started Free
              </button>

              <button
                onClick={onLogin}
                className="w-full sm:w-auto px-8 py-4 bg-white/10 border border-white/20 backdrop-blur-md rounded-2xl font-bold text-lg hover:bg-white/20 transition-all"
              >
                Existing User? Login
              </button>
            </>
          )}
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-6xl mx-auto mt-32 grid md:grid-cols-3 gap-8">
        {features.map((f, i) => (
          <div key={i} className="p-8 bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl hover:bg-white/20 transition-all cursor-default">
            <div className="text-4xl mb-4">{f.icon}</div>
            <h3 className="text-xl font-bold mb-2">{f.title}</h3>
            <p className="text-indigo-100/80 leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Home;