import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import EntryForm from './components/EntryForm';
import FilterBar from './components/FilterBar';
import JournalGrid from './components/JournalGrid';
import FloatingActionButton from './components/FloatingActionButton';
import { ThemeProvider } from './context/ThemeContext';
import { JournalProvider, useJournal } from './context/JournalContext';
import { JournalEntry, FilterOptions } from './types';

const JournalApp: React.FC = () => {
  const { entries } = useJournal();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<JournalEntry | undefined>(undefined);
  const [filters, setFilters] = useState<FilterOptions>({
    searchTerm: '',
    tags: [],
    dateRange: {
      start: null,
      end: null,
    },
    showFavoritesOnly: false,
  });

  const handleEditEntry = (entry: JournalEntry) => {
    setEditingEntry(entry);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingEntry(undefined);
  };

  const handleCreateNew = () => {
    setEditingEntry(undefined);
    setIsFormOpen(true);
  };

  // Extract all unique tags from entries
  const allTags = [...new Set(entries.flatMap((entry) => entry.tags))];

  // Update document title
  useEffect(() => {
    document.title = 'Dev Diary – A Personal Journal App';
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <Header />
      
      <main className="container mx-auto px-4 py-6 pt-20 pb-20">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Your Dev Journal</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Document your coding journey, challenges, and accomplishments
          </p>
        </div>
        
        <FilterBar 
          onChange={setFilters} 
          availableTags={allTags}
        />
        
        <JournalGrid 
          entries={entries}
          onEditEntry={handleEditEntry}
          onCreateNew={handleCreateNew}
          filters={filters}
        />
      </main>
      
      <FloatingActionButton onClick={handleCreateNew} />
      
      {isFormOpen && (
        <EntryForm 
          entry={editingEntry} 
          onClose={handleCloseForm} 
        />
      )}
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <JournalProvider>
        <JournalApp />
      </JournalProvider>
    </ThemeProvider>
  );
}

export default App;