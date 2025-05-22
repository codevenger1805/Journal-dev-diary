import React, { useState } from 'react';
import { Search, Calendar, Tag, ChevronDown, ChevronUp, Star } from 'lucide-react';
import { FilterOptions } from '../types';

interface FilterBarProps {
  onChange: (filters: FilterOptions) => void;
  availableTags: string[];
}

const FilterBar: React.FC<FilterBarProps> = ({ onChange, availableTags }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    searchTerm: '',
    tags: [],
    dateRange: {
      start: null,
      end: null,
    },
    showFavoritesOnly: false,
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setFilters((prev) => ({ ...prev, searchTerm }));
    onChange({ ...filters, searchTerm });
  };

  const handleTagToggle = (tag: string) => {
    const newTags = filters.tags.includes(tag)
      ? filters.tags.filter((t) => t !== tag)
      : [...filters.tags, tag];
    
    setFilters((prev) => ({ ...prev, tags: newTags }));
    onChange({ ...filters, tags: newTags });
  };

  const handleDateChange = (field: 'start' | 'end', value: string) => {
    const dateRange = {
      ...filters.dateRange,
      [field]: value || null,
    };
    
    setFilters((prev) => ({ ...prev, dateRange }));
    onChange({ ...filters, dateRange });
  };

  const handleFavoritesToggle = () => {
    const showFavoritesOnly = !filters.showFavoritesOnly;
    setFilters((prev) => ({ ...prev, showFavoritesOnly }));
    onChange({ ...filters, showFavoritesOnly });
  };

  const clearFilters = () => {
    const resetFilters: FilterOptions = {
      searchTerm: '',
      tags: [],
      dateRange: {
        start: null,
        end: null,
      },
      showFavoritesOnly: false,
    };
    
    setFilters(resetFilters);
    onChange(resetFilters);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6 transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search entries..."
            value={filters.searchTerm}
            onChange={handleSearchChange}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 
                     focus:ring-blue-200 dark:focus:ring-blue-800 focus:outline-none dark:bg-gray-700 dark:text-white"
          />
        </div>
        
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="ml-2 p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors duration-300"
          aria-expanded={isExpanded}
          aria-label="Toggle advanced filters"
        >
          {isExpanded ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </button>
      </div>
      
      {isExpanded && (
        <div className="mt-4 space-y-4 animate-fadeIn">
          <div>
            <div className="flex items-center mb-2">
              <Calendar className="h-4 w-4 mr-2 text-gray-600 dark:text-gray-400" />
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Date Range</h3>
            </div>
            
            <div className="flex space-x-2">
              <div className="flex-1">
                <label htmlFor="start-date" className="sr-only">Start Date</label>
                <input
                  type="date"
                  id="start-date"
                  value={filters.dateRange.start || ''}
                  onChange={(e) => handleDateChange('start', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 
                           focus:ring-blue-200 dark:focus:ring-blue-800 focus:outline-none dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="end-date" className="sr-only">End Date</label>
                <input
                  type="date"
                  id="end-date"
                  value={filters.dateRange.end || ''}
                  onChange={(e) => handleDateChange('end', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 
                           focus:ring-blue-200 dark:focus:ring-blue-800 focus:outline-none dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <Tag className="h-4 w-4 mr-2 text-gray-600 dark:text-gray-400" />
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Tags</h3>
              </div>
              
              <button
                onClick={handleFavoritesToggle}
                className={`flex items-center text-xs px-2 py-1 rounded-full transition-colors duration-300 ${
                  filters.showFavoritesOnly
                    ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                <Star className={`h-3 w-3 mr-1 ${filters.showFavoritesOnly ? 'fill-current' : ''}`} />
                Favorites
              </button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {availableTags.length > 0 ? (
                availableTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleTagToggle(tag)}
                    className={`px-3 py-1 text-xs rounded-full transition-colors duration-300 ${
                      filters.tags.includes(tag)
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {tag}
                  </button>
                ))
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400">No tags available</p>
              )}
            </div>
          </div>
          
          <div className="flex justify-end pt-2">
            <button
              onClick={clearFilters}
              className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
            >
              Clear all filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBar;