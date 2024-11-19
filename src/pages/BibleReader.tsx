import React, { useState } from 'react';
import { Search, Volume2, BookmarkPlus, ChevronLeft, ChevronRight } from 'lucide-react';
import { useBibleStore } from '../store/bibleStore';
import { useThemeStore } from '../store/themeStore';
import clsx from 'clsx';

function BibleReader() {
  const [searchTerm, setSearchTerm] = useState('');
  const { addSelectedVerse } = useBibleStore();
  const { isDarkMode } = useThemeStore();
  const [currentChapter, setCurrentChapter] = useState(1);

  return (
    <div className="grid md:grid-cols-4 gap-8 animate-fade-in">
      {/* Bible Navigation */}
      <div className={clsx(
        'md:col-span-1 rounded-xl shadow-lg p-6 h-[calc(100vh-8rem)] overflow-y-auto sticky top-24',
        isDarkMode ? 'bg-gray-800/50' : 'bg-white'
      )}>
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Buscar en la Biblia..."
            className={clsx(
              'w-full pl-10 pr-4 py-2 rounded-lg transition-colors',
              isDarkMode 
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                : 'bg-white border-gray-300 text-gray-900'
            )}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        
        <div className="space-y-4">
          <h3 className={clsx(
            'font-semibold',
            isDarkMode ? 'text-gray-200' : 'text-gray-700'
          )}>Antiguo Testamento</h3>
          <div className="grid grid-cols-2 gap-2">
            {['Génesis', 'Éxodo', 'Levítico', 'Números'].map((book) => (
              <button
                key={book}
                className={clsx(
                  'text-left px-3 py-2 rounded-lg transition-colors text-sm',
                  isDarkMode 
                    ? 'hover:bg-gray-700 text-gray-300'
                    : 'hover:bg-gray-100 text-gray-600'
                )}
              >
                {book}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bible Content */}
      <div className={clsx(
        'md:col-span-3 rounded-xl shadow-lg p-6',
        isDarkMode ? 'bg-gray-800/50' : 'bg-white'
      )}>
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <h2 className={clsx(
              'text-2xl font-bold',
              isDarkMode ? 'text-white' : 'text-gray-800'
            )}>Génesis {currentChapter}</h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentChapter(prev => Math.max(1, prev - 1))}
                className={clsx(
                  'p-2 rounded-lg transition-colors',
                  isDarkMode 
                    ? 'hover:bg-gray-700 text-gray-300'
                    : 'hover:bg-gray-100 text-gray-600'
                )}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => setCurrentChapter(prev => prev + 1)}
                className={clsx(
                  'p-2 rounded-lg transition-colors',
                  isDarkMode 
                    ? 'hover:bg-gray-700 text-gray-300'
                    : 'hover:bg-gray-100 text-gray-600'
                )}
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
          <div className="flex space-x-4">
            <button className={clsx(
              'p-2 rounded-lg transition-colors',
              isDarkMode 
                ? 'hover:bg-gray-700 text-gray-300'
                : 'hover:bg-gray-100 text-gray-600'
            )}>
              <Volume2 className="h-6 w-6" />
            </button>
            <button className={clsx(
              'p-2 rounded-lg transition-colors',
              isDarkMode 
                ? 'hover:bg-gray-700 text-gray-300'
                : 'hover:bg-gray-100 text-gray-600'
            )}>
              <BookmarkPlus className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className={clsx(
          'space-y-4',
          isDarkMode ? 'text-gray-300' : 'text-gray-700'
        )}>
          <p className={clsx(
            'verse p-4 rounded-lg transition-colors',
            isDarkMode 
              ? 'hover:bg-gray-700/50'
              : 'hover:bg-indigo-50'
          )} 
          onClick={() => addSelectedVerse({
            book: 'Génesis',
            chapter: 1,
            verse: 1,
            text: 'En el principio creó Dios los cielos y la tierra.'
          })}>
            <span className="font-semibold text-indigo-500">1.</span> En el principio creó Dios los cielos y la tierra.
          </p>
        </div>
      </div>
    </div>
  );
}

export default BibleReader;