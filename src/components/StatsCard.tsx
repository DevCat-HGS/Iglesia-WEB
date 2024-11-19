import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useThemeStore } from '../store/themeStore';
import type { ReadingStats } from '../types';
import clsx from 'clsx';

interface Props {
  stats: ReadingStats;
}

export function StatsCard({ stats }: Props) {
  const { isDarkMode } = useThemeStore();
  
  const chartData = Object.entries(stats.readingsByBook).map(([book, count]) => ({
    name: book,
    lecturas: count,
  }));

  return (
    <div className={clsx(
      'rounded-xl shadow-lg p-6',
      isDarkMode ? 'bg-gray-800/50' : 'bg-white'
    )}>
      <h3 className={clsx(
        'text-xl font-semibold mb-6',
        isDarkMode ? 'text-white' : 'text-gray-800'
      )}>Estadísticas de Lectura</h3>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <StatBox
          label="Capítulos Leídos"
          value={stats.totalChaptersRead}
        />
        <StatBox
          label="Versículos Leídos"
          value={stats.totalVersesRead}
        />
        <StatBox
          label="Días Seguidos"
          value={stats.streakDays}
        />
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis 
              dataKey="name" 
              stroke={isDarkMode ? '#9CA3AF' : '#4B5563'}
            />
            <YAxis 
              stroke={isDarkMode ? '#9CA3AF' : '#4B5563'}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
                border: 'none',
                borderRadius: '0.5rem',
                color: isDarkMode ? '#FFFFFF' : '#000000',
              }}
            />
            <Bar dataKey="lecturas" fill="#6366F1" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function StatBox({ label, value }: { label: string; value: number }) {
  const { isDarkMode } = useThemeStore();
  
  return (
    <div className={clsx(
      'p-4 rounded-lg',
      isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'
    )}>
      <p className={clsx(
        'text-sm',
        isDarkMode ? 'text-gray-400' : 'text-gray-600'
      )}>{label}</p>
      <p className={clsx(
        'text-2xl font-bold',
        isDarkMode ? 'text-white' : 'text-gray-800'
      )}>{value}</p>
    </div>
  );
}