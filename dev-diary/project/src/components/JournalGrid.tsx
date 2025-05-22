import React from 'react';
import { JournalEntry, FilterOptions } from '../types';
import JournalCard from './JournalCard';
import EmptyState from './EmptyState';

interface JournalGridProps {
  entries: JournalEntry[];
  onEditEntry: (entry: JournalEntry) => void;
  onCreateNew: () => void;
  filters: FilterOptions;
}

const JournalGrid: React.FC<JournalGridProps> = ({ 
  entries, 
  onEditEntry, 
  onCreateNew,
  filters
}) => {
  // Apply filtering
  const filteredEntries = entries.filter((entry) => {
    // Filter by search term
    if (filters.searchTerm && !entry.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) && 
        !entry.content.toLowerCase().includes(filters.searchTerm.toLowerCase())) {
      return false;
    }
    
    // Filter by tags
    if (filters.tags.length > 0 && !filters.tags.some((tag) => entry.tags.includes(tag))) {
      return false;
    }
    
    // Filter by date range
    if (filters.dateRange.start) {
      const entryDate = new Date(entry.date);
      const startDate = new Date(filters.dateRange.start);
      startDate.setHours(0, 0, 0, 0);
      
      if (entryDate < startDate) {
        return false;
      }
    }
    
    if (filters.dateRange.end) {
      const entryDate = new Date(entry.date);
      const endDate = new Date(filters.dateRange.end);
      endDate.setHours(23, 59, 59, 999);
      
      if (entryDate > endDate) {
        return false;
      }
    }
    
    // Filter by favorites
    if (filters.showFavoritesOnly && !entry.favorite) {
      return false;
    }
    
    return true;
  });

  const isFiltered = filters.searchTerm !== '' || 
                    filters.tags.length > 0 || 
                    filters.dateRange.start !== null || 
                    filters.dateRange.end !== null ||
                    filters.showFavoritesOnly;

  if (filteredEntries.length === 0) {
    return <EmptyState onCreateNew={onCreateNew} isFiltered={isFiltered} />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
      {filteredEntries.map((entry) => (
        <JournalCard
          key={entry.id}
          entry={entry}
          onEdit={onEditEntry}
        />
      ))}
    </div>
  );
};

export default JournalGrid;