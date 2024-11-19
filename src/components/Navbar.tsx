import React from 'react';
import { Link } from 'react-router-dom';
import { Book, BookOpen, Mic2, Home, Sun, Moon } from 'lucide-react';
import { useThemeStore } from '../store/themeStore';
import clsx from 'clsx';

function Navbar() {
  const { isDarkMode, toggleTheme } = useThemeStore();

  return (
    <nav className={clsx(
      'sticky top-0 z-50 backdrop-blur-lg transition-colors duration-200',
      isDarkMode ? 'bg-gray-800/90 text-white' : 'bg-white/90'
    )}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Book className="h-8 w-8 text-indigo-500" />
            <span className={clsx(
              "text-xl font-bold",
              isDarkMode ? 'text-white' : 'text-gray-800'
            )}>BibliaApp</span>
          </Link>
          
          <div className="flex items-center space-x-6">
            <NavLink to="/" icon={<Home />} text="Inicio" />
            <NavLink to="/bible" icon={<BookOpen />} text="Biblia" />
            <NavLink to="/sermon-prep" icon={<Mic2 />} text="Prédicas" />
            <button
              onClick={toggleTheme}
              className={clsx(
                'p-2 rounded-full transition-colors',
                isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              )}
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ to, icon, text }: { to: string; icon: React.ReactNode; text: string }) {
  const { isDarkMode } = useThemeStore();
  
  return (
    <Link
      to={to}
      className={clsx(
        'flex items-center space-x-1 transition-colors',
        isDarkMode
          ? 'text-gray-300 hover:text-white'
          : 'text-gray-600 hover:text-indigo-600'
      )}
    >
      {icon}
      <span className="hidden sm:inline">{text}</span>
    </Link>
  );
}

export default Navbar;