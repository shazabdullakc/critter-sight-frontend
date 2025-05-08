
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Camera, History, Settings, LogIn } from "lucide-react";

const Navbar = ({ isAuthenticated = false }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="font-bold text-xl text-primary">CritterSight</span>
            </Link>
          </div>
          
          {isAuthenticated ? (
            <>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link to="/" className="border-transparent text-gray-500 hover:border-primary hover:text-primary inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  <LayoutDashboard className="w-4 h-4 mr-2" />
                  Dashboard
                </Link>
                <Link to="/live" className="border-transparent text-gray-500 hover:border-primary hover:text-primary inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  <Camera className="w-4 h-4 mr-2" />
                  Live Feed
                </Link>
                <Link to="/history" className="border-transparent text-gray-500 hover:border-primary hover:text-primary inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  <History className="w-4 h-4 mr-2" />
                  History
                </Link>
                <Link to="/settings" className="border-transparent text-gray-500 hover:border-primary hover:text-primary inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Link>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                <Button variant="outline" onClick={() => console.log('Log out')}>
                  Log out
                </Button>
              </div>
            </>
          ) : (
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <Button variant="default" asChild>
                <Link to="/login">
                  <LogIn className="w-4 h-4 mr-2" />
                  Login
                </Link>
              </Button>
            </div>
          )}
          
          <div className="flex items-center sm:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {isAuthenticated ? (
              <>
                <Link to="/" className="bg-primary-50 border-primary text-primary block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
                  <LayoutDashboard className="inline-block w-4 h-4 mr-2" />
                  Dashboard
                </Link>
                <Link to="/live" className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
                  <Camera className="inline-block w-4 h-4 mr-2" />
                  Live Feed
                </Link>
                <Link to="/history" className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
                  <History className="inline-block w-4 h-4 mr-2" />
                  History
                </Link>
                <Link to="/settings" className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
                  <Settings className="inline-block w-4 h-4 mr-2" />
                  Settings
                </Link>
                <div className="pt-4 pb-3 border-t border-gray-200">
                  <div className="mt-3 space-y-1">
                    <button onClick={() => console.log('Log out')} className="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">
                      Sign out
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <Link to="/login" className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
                <LogIn className="inline-block w-4 h-4 mr-2" />
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
