import React from 'react';
import { Plus } from 'lucide-react';

interface FABProps {
  onClick: () => void;
}

const FloatingActionButton: React.FC<FABProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 
               focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-800 
               transition-all duration-300 hover:scale-110 z-10"
      aria-label="Create new journal entry"
    >
      <Plus className="h-6 w-6" />
    </button>
  );
};

export default FloatingActionButton;