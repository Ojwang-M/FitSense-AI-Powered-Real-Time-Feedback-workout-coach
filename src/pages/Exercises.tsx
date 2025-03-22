import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ExerciseCard from '../components/ExerciseCard';
import { Exercise } from '../types';
import { Search, Filter } from 'lucide-react';

// Mock data for exercises - only including Squat, Push-ups, and Lunges
const mockExercises: Exercise[] = [
  {
    id: '1',
    name: 'Squat',
    description: 'A compound exercise that targets the quadriceps, hamstrings, and glutes.',
    targetMuscles: ['quadriceps', 'hamstrings', 'glutes'],
    difficulty: 'beginner',
    imageUrl: 'https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '2',
    name: 'Push-up',
    description: 'A bodyweight exercise that targets the chest, shoulders, and triceps.',
    targetMuscles: ['chest', 'shoulders', 'triceps'],
    difficulty: 'beginner',
    imageUrl: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '3',
    name: 'Lunges',
    description: 'A unilateral exercise that targets the quadriceps, hamstrings, and glutes.',
    targetMuscles: ['quadriceps', 'hamstrings', 'glutes'],
    difficulty: 'beginner',
    imageUrl: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  }
];

const Exercises: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
  const [muscleFilter, setMuscleFilter] = useState<string>('all');

  const handleExerciseClick = (exercise: Exercise) => {
    navigate(`/workout?exercise=${exercise.id}`);
  };

  const filteredExercises = mockExercises.filter((exercise) => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exercise.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDifficulty = difficultyFilter === 'all' || exercise.difficulty === difficultyFilter;
    
    const matchesMuscle = muscleFilter === 'all' || 
                         exercise.targetMuscles.some(muscle => muscle === muscleFilter);
    
    return matchesSearch && matchesDifficulty && matchesMuscle;
  });

  // Get unique muscle groups for filter
  const allMuscles = Array.from(
    new Set(mockExercises.flatMap(exercise => exercise.targetMuscles))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Exercise Library</h1>
      
      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-8">
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search exercises..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="relative inline-flex">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="h-5 w-5 text-gray-400" />
              </div>
              <select
                className="block w-full pl-10 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                value={difficultyFilter}
                onChange={(e) => setDifficultyFilter(e.target.value)}
              >
                <option value="all">All Difficulties</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            
            <div className="relative inline-flex">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="h-5 w-5 text-gray-400" />
              </div>
              <select
                className="block w-full pl-10 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                value={muscleFilter}
                onChange={(e) => setMuscleFilter(e.target.value)}
              >
                <option value="all">All Muscle Groups</option>
                {allMuscles.map((muscle) => (
                  <option key={muscle} value={muscle}>
                    {muscle.charAt(0).toUpperCase() + muscle.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      
      {/* Exercise Grid */}
      {filteredExercises.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredExercises.map((exercise) => (
            <ExerciseCard 
              key={exercise.id} 
              exercise={exercise} 
              onClick={handleExerciseClick}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No exercises found matching your criteria.</p>
          <button 
            className="mt-4 text-indigo-600 hover:text-indigo-800"
            onClick={() => {
              setSearchTerm('');
              setDifficultyFilter('all');
              setMuscleFilter('all');
            }}
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Exercises;
