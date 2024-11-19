import React from 'react';
import { Calendar, CheckCircle2 } from 'lucide-react';
import { useThemeStore } from '../store/themeStore';
import type { ReadingPlan } from '../types';
import clsx from 'clsx';

interface Props {
  plan: ReadingPlan;
  onStart: (plan: ReadingPlan) => void;
}

export function ReadingPlanCard({ plan, onStart }: Props) {
  const { isDarkMode } = useThemeStore();

  return (
    <div className={clsx(
      'rounded-xl shadow-lg p-6 transition-all duration-200 hover:scale-105',
      isDarkMode ? 'bg-gray-800/50' : 'bg-white'
    )}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className={clsx(
            'text-xl font-semibold mb-2',
            isDarkMode ? 'text-white' : 'text-gray-800'
          )}>{plan.title}</h3>
          <p className={clsx(
            'text-sm mb-4',
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          )}>{plan.description}</p>
        </div>
        <Calendar className="h-6 w-6 text-indigo-500" />
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center space-x-2">
          <CheckCircle2 className="h-5 w-5 text-green-500" />
          <span className={clsx(
            'text-sm',
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          )}>{Math.round(plan.progress * 100)}% completado</span>
        </div>
        <button
          onClick={() => onStart(plan)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Comenzar
        </button>
      </div>
    </div>
  );
}