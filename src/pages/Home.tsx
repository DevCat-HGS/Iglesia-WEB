import React from 'react';
import { useBibleStore } from '../store/bibleStore';
import { useThemeStore } from '../store/themeStore';
import { BookOpen, Bookmark, Volume2 } from 'lucide-react';
import clsx from 'clsx';

function Home() {
  const { dailyVerse } = useBibleStore();
  const { isDarkMode } = useThemeStore();

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Daily Verse Section */}
      <section className={clsx(
        'rounded-xl shadow-xl p-8 backdrop-blur-sm transition-colors duration-200',
        isDarkMode ? 'bg-gray-800/50' : 'bg-white'
      )}>
        <h2 className={clsx(
          'text-3xl font-bold mb-6',
          isDarkMode ? 'text-white' : 'text-gray-800'
        )}>Versículo del Día</h2>
        {dailyVerse ? (
          <div className="space-y-4">
            <p className={clsx(
              'text-xl italic',
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            )}>
              "{dailyVerse.verse.text}"
            </p>
            <p className="text-indigo-500 font-semibold">
              {dailyVerse.verse.book} {dailyVerse.verse.chapter}:{dailyVerse.verse.verse}
            </p>
            <p className={clsx(
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            )}>{dailyVerse.reflection}</p>
          </div>
        ) : (
          <p>Cargando versículo del día...</p>
        )}
      </section>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        <FeatureCard
          icon={<BookOpen className="h-8 w-8 text-indigo-500" />}
          title="Lectura Bíblica"
          description="Accede a la Biblia completa con búsqueda y estudio"
        />
        <FeatureCard
          icon={<Volume2 className="h-8 w-8 text-indigo-500" />}
          title="Audio Bíblico"
          description="Escucha la palabra de Dios en audio"
        />
        <FeatureCard
          icon={<Bookmark className="h-8 w-8 text-indigo-500" />}
          title="Preparación de Prédicas"
          description="Organiza y prepara tus prédicas con herramientas útiles"
        />
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  const { isDarkMode } = useThemeStore();
  
  return (
    <div className={clsx(
      'rounded-xl shadow-lg p-6 transition-all duration-200 hover:scale-105 backdrop-blur-sm',
      isDarkMode ? 'bg-gray-800/50 hover:bg-gray-800/70' : 'bg-white hover:shadow-xl'
    )}>
      <div className="flex flex-col items-center text-center space-y-4">
        {icon}
        <h3 className={clsx(
          'text-xl font-semibold',
          isDarkMode ? 'text-white' : 'text-gray-800'
        )}>{title}</h3>
        <p className={clsx(
          isDarkMode ? 'text-gray-300' : 'text-gray-600'
        )}>{description}</p>
      </div>
    </div>
  );
}

export default Home;