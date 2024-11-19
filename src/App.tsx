import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import BibleReader from './pages/BibleReader';
import SermonPrep from './pages/SermonPrep';
import { useThemeStore } from './store/themeStore';
import clsx from 'clsx';

const queryClient = new QueryClient();

function App() {
  const { isDarkMode } = useThemeStore();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className={clsx(
          'min-h-screen transition-colors duration-200',
          isDarkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-blue-50 to-indigo-50'
        )}>
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/bible" element={<BibleReader />} />
              <Route path="/sermon-prep" element={<SermonPrep />} />
            </Routes>
          </main>
        </div>
      </Router>
    </QueryClientProvider>
  );
}