import React, { useState } from 'react';
import { MessageSquare, Send } from 'lucide-react';
import { useThemeStore } from '../store/themeStore';
import type { BibleComment } from '../types';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import clsx from 'clsx';

interface Props {
  comments: BibleComment[];
  verseId: string;
  onAddComment: (comment: Omit<BibleComment, 'id'>) => void;
}

export function CommentSection({ comments, verseId, onAddComment }: Props) {
  const [newComment, setNewComment] = useState('');
  const { isDarkMode } = useThemeStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    onAddComment({
      verseId,
      text: newComment,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    setNewComment('');
  };

  return (
    <div className={clsx(
      'rounded-xl shadow-lg p-6',
      isDarkMode ? 'bg-gray-800/50' : 'bg-white'
    )}>
      <div className="flex items-center space-x-2 mb-6">
        <MessageSquare className="h-5 w-5 text-indigo-500" />
        <h3 className={clsx(
          'text-xl font-semibold',
          isDarkMode ? 'text-white' : 'text-gray-800'
        )}>Comentarios</h3>
      </div>

      <div className="space-y-4 mb-6">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className={clsx(
              'p-4 rounded-lg',
              isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'
            )}
          >
            <p className={clsx(
              'mb-2',
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            )}>{comment.text}</p>
            <p className={clsx(
              'text-sm',
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            )}>
              {format(comment.createdAt, "d 'de' MMMM, yyyy", { locale: es })}
            </p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Escribe un comentario..."
          className={clsx(
            'flex-1 p-2 rounded-lg transition-colors',
            isDarkMode 
              ? 'bg-gray-700 text-white placeholder-gray-400'
              : 'bg-gray-50 text-gray-900 placeholder-gray-500'
          )}
        />
        <button
          type="submit"
          className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Send className="h-5 w-5" />
        </button>
      </form>
    </div>
  );
}