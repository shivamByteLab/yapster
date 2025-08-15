import React from "react";

const WelcomePage = () => {
  return (
    <div className="hero md:hidden bg-base-200 min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-lg">
          <h1 className="text-5xl font-bold">Yapster</h1>
          <p className="py-6">
            Yapster is a playful and unique chat app designed to bring energy
            and excitement to conversations. With its vibrant design and
            user-friendly features, Yapster makes messaging fun, fast, and
            seamless. Whether you're chatting with friends, family, or
            coworkers, Yapster ensures every interaction feels lively and
            engaging.
          </p>
          <span className="loading  loading-spinner"></span>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
