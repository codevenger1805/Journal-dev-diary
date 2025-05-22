export interface JournalEntry {
  id: string;
  title: string;
  content: string;
  date: string;
  tags: string[];
  favorite: boolean;
}

export type ThemeMode = 'light' | 'dark';

export interface JournalContextType {
  entries: JournalEntry[];
  addEntry: (entry: Omit<JournalEntry, 'id' | 'date'>) => void;
  updateEntry: (id: string, entry: Partial<JournalEntry>) => void;
  deleteEntry: (id: string) => void;
  toggleFavorite: (id: string) => void;
}

export interface ThemeContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
}

export interface FilterOptions {
  searchTerm: string;
  tags: string[];
  dateRange: {
    start: string | null;
    end: string | null;
  };
  showFavoritesOnly: boolean;
}