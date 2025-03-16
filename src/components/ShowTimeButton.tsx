// src/components/ShowTimeButton.tsx
import React from 'react';

interface ShowTimeButtonProps {
  time: string;
  isDisabled: boolean;
  isSelected: boolean;
  onClick: () => void;
}

const ShowTimeButton: React.FC<ShowTimeButtonProps> = ({ time, isDisabled, isSelected, onClick }) => {
  return (
    <button
      disabled={isDisabled}
      className={`px-2 py-1 rounded text-center text-xs transition-all duration-200 transform ${isDisabled
          ? 'bg-primary-950 text-primary-600 line-through cursor-not-allowed opacity-60'
          : isSelected
            ? 'bg-primary-500 text-white border border-primary-400 shadow-md'
            : 'bg-primary-900 border border-primary-600 text-primary-200 hover:border-primary-400 hover:text-primary-100'
        }`}
      onClick={onClick}
    >
      {time}
    </button>
  );
};

export default ShowTimeButton;
