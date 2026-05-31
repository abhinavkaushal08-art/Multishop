"use client";

import * as React from "react";
import { useState } from "react";
import { LogIn, Lock, Mail, ArrowLeft } from "lucide-react";
import { useSaaS } from "../../context/SaaSContext";

export const SignIn2 = () => {
  const { setRole, login } = useSaaS();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSignIn = () => {
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    login(email, 'super-admin');
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-white rounded-xl z-1">
      {/* Back button */}
      <button 
        onClick={() => setRole('landing')}
        className="absolute top-6 left-6 flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200 font-medium text-sm z-10"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Home</span>
      </button>

      <div className="w-full max-w-sm bg-gradient-to-b from-purple-50/50 to-white rounded-3xl shadow-xl shadow-opacity-10 p-8 flex flex-col items-center border border-purple-100 text-black">
        <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-white mb-6 shadow-lg shadow-opacity-5">
          <LogIn className="w-7 h-7 text-black" />
        </div>
        <h2 className="text-2xl font-semibold mb-2 text-center">
          Sign in with email
        </h2>
        <p className="text-gray-500 text-sm mb-6 text-center">
          Sign in to your account to shop the latest collections, track orders, and manage your wishlist.
        </p>
        <div className="w-full flex flex-col gap-3 mb-2">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Mail className="w-4 h-4" />
            </span>
            <input
              placeholder="Email"
              type="email"
              value={email}
              className="w-full pl-10 pr-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-200 bg-gray-50 text-black text-sm"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Lock className="w-4 h-4" />
            </span>
            <input
              placeholder="Password"
              type="password"
              value={password}
              className="w-full pl-10 pr-10 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-200 bg-gray-50 text-black text-sm"
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer text-xs select-none"></span>
          </div>
          <div className="w-full flex justify-end">
            {error && (
              <div className="text-sm text-red-500 text-left">{error}</div>
            )}
            <button className="text-xs hover:underline font-medium">
              Forgot password?
            </button>
          </div>
        </div>
        <button
          onClick={handleSignIn}
          className="w-full bg-gradient-to-b from-gray-700 to-gray-900 text-white font-medium py-2 rounded-xl shadow hover:brightness-105 cursor-pointer transition mb-4 mt-2"
        >
          Get Started
        </button>
        <div className="flex items-center w-full my-2">
          <div className="flex-grow border-t border-dashed border-gray-200"></div>
          <span className="mx-2 text-xs text-gray-400">Or sign in with</span>
          <div className="flex-grow border-t border-dashed border-gray-200"></div>
        </div>
        <div className="flex gap-3 w-full justify-center mt-2">
          <button className="flex items-center justify-center w-12 h-12 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 transition-all grow group">
            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
          </button>
          <button className="flex items-center justify-center w-12 h-12 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 transition-all grow group">
            <svg className="w-5 h-5 group-hover:scale-110 transition-transform text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </button>
          <button className="flex items-center justify-center w-12 h-12 rounded-xl border border-black bg-black hover:bg-gray-900 transition-all grow group">
            <img src="https://upload.wikimedia.org/wikipedia/commons/3/31/Apple_logo_white.svg" alt="Apple" className="w-5 h-5 group-hover:scale-110 transition-transform object-contain" />
          </button>
          <button className="flex items-center justify-center w-12 h-12 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 transition-all grow group">
            <svg className="w-5 h-5 group-hover:scale-110 transition-transform text-black" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
