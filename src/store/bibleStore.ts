import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { 
  Verse, 
  SermonNote, 
  DailyVerse, 
  BibleComment,
  PersonalNote,
  ReadingPlan,
  ReadingHistory,
  ReadingStats
} from '../types';

interface BibleStore {
  // Verses
  selectedVerses: Verse[];
  favoriteVerses: Verse[];
  readingHistory: ReadingHistory[];
  
  // Notes & Comments
  sermonNotes: SermonNote[];
  personalNotes: PersonalNote[];
  comments: BibleComment[];
  
  // Reading Plans
  readingPlans: ReadingPlan[];
  activeReadingPlan: ReadingPlan | null;
  
  // Stats & Daily
  readingStats: ReadingStats;
  dailyVerse: DailyVerse | null;
  
  // Actions
  addSelectedVerse: (verse: Verse) => void;
  removeSelectedVerse: (verse: Verse) => void;
  toggleFavoriteVerse: (verse: Verse) => void;
  addSermonNote: (note: SermonNote) => void;
  addPersonalNote: (note: PersonalNote) => void;
  addComment: (comment: BibleComment) => void;
  startReadingPlan: (plan: ReadingPlan) => void;
  completeReading: (verseId: string) => void;
  setDailyVerse: (verse: DailyVerse) => void;
  updateReadingStats: () => void;
}

const initialStats: ReadingStats = {
  totalChaptersRead: 0,
  totalVersesRead: 0,
  streakDays: 0,
  lastReadDate: new Date(),
  readingsByBook: {}
};

export const useBibleStore = create<BibleStore>()(
  persist(
    (set, get) => ({
      selectedVerses: [],
      favoriteVerses: [],
      readingHistory: [],
      sermonNotes: [],
      personalNotes: [],
      comments: [],
      readingPlans: [],
      activeReadingPlan: null,
      readingStats: initialStats,
      dailyVerse: null,

      addSelectedVerse: (verse) =>
        set((state) => ({ selectedVerses: [...state.selectedVerses, verse] })),

      removeSelectedVerse: (verse) =>
        set((state) => ({
          selectedVerses: state.selectedVerses.filter(
            (v) => v.id !== verse.id
          ),
        })),

      toggleFavoriteVerse: (verse) =>
        set((state) => {
          const isFavorite = state.favoriteVerses.some((v) => v.id === verse.id);
          return {
            favoriteVerses: isFavorite
              ? state.favoriteVerses.filter((v) => v.id !== verse.id)
              : [...state.favoriteVerses, verse],
          };
        }),

      addSermonNote: (note) =>
        set((state) => ({ sermonNotes: [...state.sermonNotes, note] })),

      addPersonalNote: (note) =>
        set((state) => ({ personalNotes: [...state.personalNotes, note] })),

      addComment: (comment) =>
        set((state) => ({ comments: [...state.comments, comment] })),

      startReadingPlan: (plan) =>
        set({ activeReadingPlan: plan }),

      completeReading: (verseId) =>
        set((state) => {
          const newHistory = [...state.readingHistory, {
            id: crypto.randomUUID(),
            verse: state.selectedVerses.find(v => v.id === verseId)!,
            timestamp: new Date()
          }];
          
          return {
            readingHistory: newHistory,
          };
        }),

      setDailyVerse: (verse) => 
        set({ dailyVerse: verse }),

      updateReadingStats: () =>
        set((state) => {
          const today = new Date();
          const lastRead = new Date(state.readingStats.lastReadDate);
          const isConsecutiveDay = 
            today.getDate() - lastRead.getDate() === 1;

          return {
            readingStats: {
              ...state.readingStats,
              totalVersesRead: state.readingHistory.length,
              streakDays: isConsecutiveDay 
                ? state.readingStats.streakDays + 1 
                : 1,
              lastReadDate: today,
            }
          };
        }),
    }),
    {
      name: 'bible-storage',
    }
  )
);