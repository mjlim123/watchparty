import React from 'react';

export default function Hero() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
      <div className="text-center text-white">
        <h1 className="text-6xl font-bold mb-4 animate-bounce">
          Welcome to Watchparty
        </h1>
        <p className="text-xl mb-8">
          Watch YouTube videos with your friends in real-time
        </p>
        <div className="space-x-4">
          <button className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-blue-100 transition duration-300">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};
