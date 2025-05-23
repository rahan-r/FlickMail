import React from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import { LogOut, Mail } from 'lucide-react';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom'

export default function Header({ toggleDarkMode, isDarkMode }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('flickMailJWT');
    localStorage.removeItem('flickMailPwd');
    localStorage.removeItem('flickuserId');
    localStorage.removeItem('flickMail');
    navigate('/');
  };

  return (
    <header className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 py-4 px-6">
      <div className="flex items-center justify-between">
        <div className="flex-1 max-w-2xl">
          
            <h1 className=' font-semibold text-2xl'>FlickMail</h1>
          {/* <div className="relative">
            <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search emails..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 dark:text-white"
            />
          </div> */}
        </div>
        <div className="flex items-center space-x-4 ml-4">
          {/* <button
            onClick={toggleDarkMode}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {isDarkMode ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
          </button> */}
          <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-200">
          <Button onClick={handleLogout}>
          Logout   <LogOut /> 
          </Button>
          </div>
        </div>
      </div>
    </header>
  );
}