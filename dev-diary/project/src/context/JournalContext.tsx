import React, { createContext, useContext, useEffect, useState } from 'react';
import { JournalContextType, JournalEntry } from '../types';

// Create context with default values
const JournalContext = createContext<JournalContextType>({
  entries: [],
  addEntry: () => {},
  updateEntry: () => {},
  deleteEntry: () => {},
  toggleFavorite: () => {},
});

// Custom hook to use the journal context
export const useJournal = () => useContext(JournalContext);

export const JournalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize entries from localStorage or default to empty array
  const [entries, setEntries] = useState<JournalEntry[]>(() => {
    const savedEntries = localStorage.getItem('journal-entries');
    return savedEntries ? JSON.parse(savedEntries) : [];
  });

  // Effect to update localStorage when entries change
  useEffect(() => {
    localStorage.setItem('journal-entries', JSON.stringify(entries));
  }, [entries]);

  // Add a new entry
  const addEntry = (entry: Omit<JournalEntry, 'id' | 'date'>) => {
    const newEntry: JournalEntry = {
      ...entry,
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
    };
    
    setEntries((prevEntries) => [newEntry, ...prevEntries]);
  };

  // Update an existing entry
  const updateEntry = (id: string, updatedFields: Partial<JournalEntry>) => {
    setEntries((prevEntries) =>
      prevEntries.map((entry) =>
        entry.id === id ? { ...entry, ...updatedFields } : entry
      )
    );
  };

  // Delete an entry
  const deleteEntry = (id: string) => {
    setEntries((prevEntries) => prevEntries.filter((entry) => entry.id !== id));
  };

  // Toggle favorite status
  const toggleFavorite = (id: string) => {
    setEntries((prevEntries) =>
      prevEntries.map((entry) =>
        entry.id === id ? { ...entry, favorite: !entry.favorite } : entry
      )
    );
  };

  return (
    <JournalContext.Provider
      value={{ entries, addEntry, updateEntry, deleteEntry, toggleFavorite }}
    >
      {children}
    </JournalContext.Provider>
  );
};