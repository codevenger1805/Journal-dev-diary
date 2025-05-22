import React from 'react';
import { BookOpen, Plus } from 'lucide-react';

interface EmptyStateProps {
  onCreateNew: () => void;
  isFiltered?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onCreateNew, isFiltered = false }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <BookOpen className="h-16 w-16 text-gray-400 dark:text-gray-600 mb-4" />
      
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
        {isFiltered ? 'No matching entries found' : 'Your journal is empty'}
      </h2>
      
      <p className="text-gray-600 dark:text-gray-400 max-w-md mb-6">
        {isFiltered 
          ? 'Try changing your search terms or filters to find what you\'re looking for.'
          : 'Start documenting your coding journey, challenges, and accomplishments.'}
      </p>
      
      {!isFiltered && (
        <button
          onClick={onCreateNew}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 
                   focus:outline-none focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-colors duration-300"
        >
          <Plus className="h-4 w-4 mr-1" />
          Create your first entry
        </button>
      )}
    </div>
  );
};

export default EmptyState;