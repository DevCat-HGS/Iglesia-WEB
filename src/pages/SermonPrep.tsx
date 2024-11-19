import React, { useState } from 'react';
import { useBibleStore } from '../store/bibleStore';
import { useThemeStore } from '../store/themeStore';
import { Save, Trash2, Plus, X } from 'lucide-react';
import clsx from 'clsx';

function SermonPrep() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const { selectedVerses, sermonNotes } = useBibleStore();
  const { isDarkMode } = useThemeStore();

  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="grid md:grid-cols-3 gap-8 animate-fade-in">
      {/* Sermon Editor */}
      <div className={clsx(
        'md:col-span-2 rounded-xl shadow-lg p-6',
        isDarkMode ? 'bg-gray-800/50' : 'bg-white'
      )}>
        <input
          type="text"
          placeholder="Título de la prédica"
          className={clsx(
            'w-full text-2xl font-bold mb-4 p-2 border-b bg-transparent focus:outline-none transition-colors',
            isDarkMode 
              ? 'border-gray-700 text-white placeholder-gray-500'
              : 'border-gray-200 text-gray-800 placeholder-gray-400'
          )}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        
        {/* Tags Section */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className={clsx(
                  'flex items-center px-3 py-1 rounded-full text-sm',
                  isDarkMode 
                    ? 'bg-gray-700 text-gray-300'
                    : 'bg-gray-100 text-gray-700'
                )}
              >
                {tag}
                <button
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-2 hover:text-red-500"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Añadir etiqueta"
              className={clsx(
                'flex-1 p-2 rounded-lg transition-colors',
                isDarkMode 
                  ? 'bg-gray-700 text-white placeholder-gray-400'
                  : 'bg-gray-50 text-gray-900 placeholder-gray-500'
              )}
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
            />
            <button
              onClick={handleAddTag}
              className={clsx(
                'p-2 rounded-lg transition-colors',
                isDarkMode 
                  ? 'bg-gray-700 hover:bg-gray-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              )}
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        <textarea
          placeholder="Escribe tu prédica aquí..."
          className={clsx(
            'w-full h-[calc(100vh-24rem)] p-4 rounded-lg transition-colors resize-none',
            isDarkMode 
              ? 'bg-gray-700 text-white placeholder-gray-400'
              : 'bg-gray-50 text-gray-900 placeholder-gray-500'
          )}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div className="flex justify-end mt-4 space-x-4">
          <button className={clsx(
            'flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors',
            isDarkMode 
              ? 'bg-gray-700 hover:bg-gray-600 text-white'
              : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
          )}>
            <Trash2 className="h-5 w-5" />
            <span>Limpiar</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            <Save className="h-5 w-5" />
            <span>Guardar</span>
          </button>
        </div>
      </div>

      {/* Selected Verses */}
      <div className={clsx(
        'md:col-span-1 rounded-xl shadow-lg p-6 h-[calc(100vh-8rem)] sticky top-24 overflow-y-auto',
        isDarkMode ? 'bg-gray-800/50' : 'bg-white'
      )}>
        <h3 className={clsx(
          'text-xl font-semibold mb-4',
          isDarkMode ? 'text-white' : 'text-gray-800'
        )}>Versículos Seleccionados</h3>
        <div className="space-y-4">
          {selectedVerses.map((verse, index) => (
            <div key={index} className={clsx(
              'p-4 rounded-lg transition-colors',
              isDarkMode 
                ? 'bg-gray-700/50 text-gray-300'
                : 'bg-gray-50 text-gray-700'
            )}>
              <p>{verse.text}</p>
              <p className="text-sm text-indigo-500 mt-2">
                {verse.book} {verse.chapter}:{verse.verse}
              </p>
            </div>
          ))}
          {selectedVerses.length === 0 && (
            <p className={clsx(
              'text-center py-8',
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            )}>
              No hay versículos seleccionados
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SermonPrep;