import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Heart, Home, Menu, X } from 'lucide-react';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const location = useLocation();
  const favorites = useSelector(state => state.favorites.items);
  const favoriteCount = favorites.length;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path) => {
    return location.pathname === path;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <ShoppingCart className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-800 hidden sm:block">
              FakeStore
            </span>
            <span className="text-xl font-bold text-gray-800 sm:hidden">
              FS
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${isActive('/')
                  ? 'bg-blue-100 text-blue-600'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
                }`}
            >
              <Home className="h-5 w-5" />
              <span className="font-medium">Home</span>
            </Link>

            <Link
              to="/favorites"
              className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors relative ${isActive('/favorites')
                  ? 'bg-red-100 text-red-600'
                  : 'text-gray-600 hover:text-red-600 hover:bg-gray-100'
                }`}
            >
              <Heart className="h-5 w-5" />
              <span className="font-medium">Favorites</span>
              {favoriteCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
                  {favoriteCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${isActive('/')
                    ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
                    : 'text-gray-700 hover:bg-gray-50'
                  }`}
              >
                <Home className="h-5 w-5" />
                <span className="font-medium">Home</span>
              </Link>

              <Link
                to="/favorites"
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${isActive('/favorites')
                    ? 'bg-red-50 text-red-600 border-l-4 border-red-600'
                    : 'text-gray-700 hover:bg-gray-50'
                  }`}
              >
                <div className="flex items-center space-x-3">
                  <Heart className="h-5 w-5" />
                  <span className="font-medium">Favorites</span>
                </div>
                {favoriteCount > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
                    {favoriteCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;