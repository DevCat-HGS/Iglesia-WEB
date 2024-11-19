export interface Verse {
  id: string;
  book: string;
  chapter: number;
  verse: number;
  text: string;
}

export interface DailyVerse {
  verse: Verse;
  reflection: string;
}

export interface SermonNote {
  id: string;
  title: string;
  content: string;
  verses: Verse[];
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface BibleComment {
  id: string;
  verseId: string;
  text: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PersonalNote {
  id: string;
  title: string;
  content: string;
  verses: Verse[];
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ReadingPlan {
  id: string;
  title: string;
  description: string;
  duration: number; // days
  readings: ReadingDay[];
  progress: number;
  startDate: Date;
}

export interface ReadingDay {
  day: number;
  verses: Verse[];
  completed: boolean;
}

export interface ReadingHistory {
  id: string;
  verse: Verse;
  timestamp: Date;
}

export interface ReadingStats {
  totalChaptersRead: number;
  totalVersesRead: number;
  streakDays: number;
  lastReadDate: Date;
  readingsByBook: Record<string, number>;
}