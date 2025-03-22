import React from 'react';
import { Exercise } from '../types';
import { ArrowRight } from 'lucide-react';

interface ExerciseCardProps {
  exercise: Exercise;
  onClick: (exercise: Exercise) => void;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise, onClick }) => {
  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      onClick={() => onClick(exercise)}
    >
      <img 
        src={exercise.imageUrl} 
        alt={exercise.name} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{exercise.name}</h3>
        <div className="flex items-center mt-2">
          <span className={`px-2 py-1 text-xs rounded-full ${
            exercise.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
            exercise.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {exercise.difficulty.charAt(0).toUpperCase() + exercise.difficulty.slice(1)}
          </span>
          <div className="ml-auto flex items-center text-indigo-600 hover:text-indigo-800">
            <span className="text-sm mr-1">Start</span>
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseCard;