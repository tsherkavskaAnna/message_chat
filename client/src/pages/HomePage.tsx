import { useState } from 'react';
import Image from '../assets/images/girl-phone.png';

import RegisterForm from '../components/RegisterForm';
import WelcomeAnimated from '../components/WelcomeFade';
import LoginForm from '../components/LoginForm';

export default function HomePage() {
  const [showLoggetIn, setShowLoggetIn] = useState(false);
  return (
    <div className="min-h-screen flex justify-center items-center px-4">
      <div className="grid grid-cols-2 min-h-[70vh] w-[75vw] border border-white rounded-2xl shadow-xl">
        <div className="flex flex-col justify-center items-center bg-white backdrop-blur-sm p-6 rounded-l-2xl">
          <WelcomeAnimated />
          {showLoggetIn ? <LoginForm /> : <RegisterForm />}
          <div className="text-center mt-4">
            <span className={showLoggetIn ? 'text-gray-500' : 'text-slate-500'}>
              {showLoggetIn
                ? "Don't have an account? "
                : 'Already have an account? '}
            </span>
            <button
              className="text-indigo-500 underline ml-1"
              onClick={() => setShowLoggetIn(!showLoggetIn)}
            >
              {showLoggetIn ? 'Sign Up' : 'Sign In'}
            </button>
          </div>
        </div>
        <div className="relative w-full h-full rounded-r-2xl bg-withe/50 backdrop-blur-lg">
          <img
            src={Image}
            alt="girl-with-phone"
            className="w-full h-full object-cover opacity-90 rounded-r-2xl"
          />
        </div>
      </div>
    </div>
  );
}
