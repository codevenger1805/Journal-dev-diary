import React, { useState } from 'react';
import { Edit2, Trash2, Star, Heart } from 'lucide-react';
import { JournalEntry } from '../types';
import { getRelativeTime } from '../utils/formatDate';
import { useJournal } from '../context/JournalContext';

interface JournalCardProps {
  entry: JournalEntry;
  onEdit: (entry: JournalEntry) => void;
}

const JournalCard: React.FC<JournalCardProps> = ({ entry, onEdit }) => {
  const { deleteEntry, toggleFavorite } = useJournal();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    if (isDeleting) {
      deleteEntry(entry.id);
    } else {
      setIsDeleting(true);
      // Reset after 3 seconds if not confirmed
      setTimeout(() => setIsDeleting(false), 3000);
    }
  };

  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg 
                 transition-all duration-300 overflow-hidden flex flex-col"
    >
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white line-clamp-1">
            {entry.title}
          </h3>
          <button
            onClick={() => toggleFavorite(entry.id)}
            className={`p-1 rounded-full transition-colors duration-300 ${
              entry.favorite
                ? 'text-yellow-500 dark:text-yellow-400'
                : 'text-gray-400 dark:text-gray-500 hover:text-yellow-500 dark:hover:text-yellow-400'
            }`}
            aria-label={entry.favorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Star className="h-5 w-5" fill={entry.favorite ? 'currentColor' : 'none'} />
          </button>
        </div>
        
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-3">
          {entry.content}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-3">
          {entry.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-900 
                       text-blue-800 dark:text-blue-200"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="text-xs text-gray-500 dark:text-gray-400">
          {getRelativeTime(entry.date)}
        </div>
      </div>
      
      <div className="mt-auto border-t border-gray-100 dark:border-gray-700 p-3 flex justify-between">
        <button
          onClick={() => onEdit(entry)}
          className="flex items-center text-sm text-gray-600 dark:text-gray-300 
                   hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
          aria-label="Edit entry"
        >
          <Edit2 className="h-4 w-4 mr-1" /> Edit
        </button>
        
        <button
          onClick={handleDelete}
          className={`flex items-center text-sm transition-colors duration-300 ${
            isDeleting
              ? 'text-red-600 dark:text-red-400'
              : 'text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400'
          }`}
          aria-label={isDeleting ? 'Confirm delete' : 'Delete entry'}
        >
          <Trash2 className="h-4 w-4 mr-1" />
          {isDeleting ? 'Confirm' : 'Delete'}
        </button>
      </div>
    </div>
  );
};

export default JournalCard;