"use client";

import { SignInForm } from "@/components/auth/SignInForm";
import { SignUpForm } from "@/components/auth/SignUpForm";
import { useState } from "react";

export default function AuthPage(){
  const [isSignIn, setIsSignIn] = useState(true);
  const [isHovering, setIsHovering] = useState(false);

  const toggleAuth = () => {
    setIsSignIn(!isSignIn);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements - keeping animations but using theme colors */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-700 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-5 animate-pulse delay-500"></div>
      </div>

      {/* Main auth container */}
      <div className="relative w-full max-w-md">
        {/* Card - updated to match homepage style */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
          {/* Header with toggle */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome {isSignIn ? 'Back' : 'To Learnify'}
            </h1>
            <p className="text-gray-600 mb-6">
              {isSignIn ? 'Sign in to your account' : 'Create your new account'}
            </p>

            {/* Toggle switch - keeping functionality but updating colors */}
            <div className="relative inline-flex items-center p-1 bg-gray-100 rounded-full border border-gray-200">
              <div
                className={`absolute top-1 bottom-1 w-1/2 bg-gradient-to-r from-purple-600 to-purple-700 rounded-full transition-all duration-300 ease-out shadow-md ${
                  isSignIn ? 'left-1' : 'left-1/2'
                } ${isHovering ? 'animate-glow-pulse' : ''}`}
              ></div>
              <button
                className={`relative z-10 px-6 py-2 text-sm font-medium transition-all duration-300 rounded-full ${
                  isSignIn ? 'text-white' : 'text-gray-500'
                } ${isHovering && isSignIn ? 'animate-magnetic-pull' : ''}`}
                onClick={toggleAuth}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                Sign In
              </button>
              <button
                className={`relative z-10 px-6 py-2 text-sm font-medium transition-all duration-300 rounded-full ${
                  !isSignIn ? 'text-white' : 'text-gray-500'
                } ${isHovering && !isSignIn ? 'animate-magnetic-pull' : ''}`}
                onClick={toggleAuth}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                Sign Up
              </button>
            </div>
          </div>

          {/* Form container with slide animations - keeping animations */}
          <div className="relative overflow-hidden">
            <div
              className={`transition-all duration-500 ease-out ${
                isSignIn 
                  ? 'transform translate-x-0 opacity-100' 
                  : 'transform -translate-x-full opacity-0 absolute inset-0'
              }`}
            >
              {isSignIn && (
                <div className="animate-slide-in-left">
                  <SignInForm />
                </div>
              )}
            </div>
            <div
              className={`transition-all duration-500 ease-out ${
                !isSignIn 
                  ? 'transform translate-x-0 opacity-100' 
                  : 'transform translate-x-full opacity-0 absolute inset-0'
              }`}
            >
              {!isSignIn && (
                <div className="animate-slide-in-right">
                  <SignUpForm />
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-gray-500 text-sm">
              {isSignIn ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={toggleAuth}
                className="text-purple-700 hover:text-purple-800 font-medium transition-colors duration-200"
              >
                {isSignIn ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};