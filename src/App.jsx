import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import { closeModal } from './store/modalSlice';
import { getSessionUser } from './store/authSlice';

import Login from './components/Login';
import Signup from './components/Signup';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Footer from './components/Footer';
import Profile from './components/Profile';
import OperationsPage from './components/OperationsPage';
import { HistoryPanel } from './components/HistoryPanel';
import ToastContainer from './components/ToastContainer';

function App() {
  const { isOpen, view } = useSelector((state) => state.modal);
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSessionUser());
  }, [dispatch]);

  return (
    <>
    <ToastContainer />
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white flex flex-col">
        <Navbar />

        {/* MAIN CONTENT AREA */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />

            {/* Protected Routes */}
            <Route
              path="/operations"
              element={<OperationsPage />}
            />
            <Route
              path="/history"
              element={isAuthenticated ? <HistoryPanel /> : <Navigate to="/" />}
            />
            <Route
              path="/profile"
              element={isAuthenticated ? <Profile /> : <Navigate to="/" />}
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>

        <Footer />

        {/* ✅ MODAL SYSTEM */}
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
              onClick={() => dispatch(closeModal())}
            />
            <div className="relative z-10 w-full max-w-md animate-in fade-in zoom-in duration-300">
              {view === 'login' ? <Login /> : <Signup />}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;