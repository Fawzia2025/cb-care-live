import React from "react";

const HomeView = ({ primaryColor, accentColor, whiteText, textColor }) => {
  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center text-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://placehold.co/1920x1080/4A90E2/FFFFFF?text=Compassionate+Home+Care+Clients+and+Caregivers')",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 p-8 rounded-lg bg-white bg-opacity-90 max-w-2xl mx-4 shadow-xl">
        <h2 className="text-5xl font-extrabold text-blue-800 mb-4 leading-tight">
          Compassionate Home Care at the Heart of Birmingham
        </h2>
        <p className="text-xl text-gray-700 mb-8">
          Empowering independence, ensuring dignity, and providing tailored
          support in the comfort of your home.
        </p>
        <a
          href="#contact"
          className={`${accentColor} ${whiteText} font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-green-600 transition-all text-lg`}
        >
          Get Started Today
        </a>
      </div>
    </section>
  );
};

export default HomeView;
