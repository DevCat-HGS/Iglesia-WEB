import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { useThemeStore } from '../store/themeStore';
import clsx from 'clsx';

interface Props {
  onSearch: (term: string) => void;
  placeholder?: string;
}

export function SearchBar({ onSearch, placeholder = "Buscar..." }: Props) {
  const [searchTerm, setSearchTerm] = useState('');
  const { isDarkMode } = useThemeStore();

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={placeholder}
        className={clsx(
          'w-full pl-10 pr-10 py-2 rounded-lg transition-colors',
          isDarkMode 
            ? 'bg-gray-700 text-white placeholder-gray-400 border-gray-600'
            : 'bg-white text-gray-900 placeholder-gray-500 border-gray-300'
        )}
      />
      <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      {searchTerm && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </form>
  );
}