import React from 'react';
import { Calendar, BarChart2, TrendingUp, Award } from 'lucide-react';

const Progress: React.FC = () => {
  // Mock data for workout history
  const workoutHistory = [
    { date: '2025-05-01', duration: 35, exercises: 4, feedback: 12 },
    { date: '2025-05-03', duration: 42, exercises: 5, feedback: 15 },
    { date: '2025-05-05', duration: 28, exercises: 3, feedback: 8 },
    { date: '2025-05-07', duration: 45, exercises: 6, feedback: 18 },
    { date: '2025-05-09', duration: 50, exercises: 5, feedback: 14 },
    { date: '2025-05-11', duration: 38, exercises: 4, feedback: 10 },
    { date: '2025-05-13', duration: 55, exercises: 7, feedback: 20 },
  ];

  // Mock data for improvement metrics
  const improvementMetrics = [
    { name: 'Squat Form', initial: 65, current: 87 },
    { name: 'Push-up Depth', initial: 72, current: 90 },
    { name: 'Plank Stability', initial: 60, current: 82 },
    { name: 'Deadlift Form', initial: 55, current: 78 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Progress</h1>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Total Workouts</h3>
            <Calendar className="h-6 w-6 text-indigo-500" />
          </div>
          <p className="text-3xl font-bold">{workoutHistory.length}</p>
          <p className="text-sm text-gray-500 mt-2">Last 30 days</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Total Minutes</h3>
            <TrendingUp className="h-6 w-6 text-indigo-500" />
          </div>
          <p className="text-3xl font-bold">
            {workoutHistory.reduce((sum, workout) => sum + workout.duration, 0)}
          </p>
          <p className="text-sm text-gray-500 mt-2">Last 30 days</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Form Corrections</h3>
            <BarChart2 className="h-6 w-6 text-indigo-500" />
          </div>
          <p className="text-3xl font-bold">
            {workoutHistory.reduce((sum, workout) => sum + workout.feedback, 0)}
          </p>
          <p className="text-sm text-gray-500 mt-2">Last 30 days</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Avg. Improvement</h3>
            <Award className="h-6 w-6 text-indigo-500" />
          </div>
          <p className="text-3xl font-bold">
            {Math.round(
              improvementMetrics.reduce(
                (sum, metric) => sum + (metric.current - metric.initial), 
                0
              ) / improvementMetrics.length
            )}%
          </p>
          <p className="text-sm text-gray-500 mt-2">Across all exercises</p>
        </div>
      </div>
      
      {/* Workout History */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Workouts</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Exercises
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Feedback Items
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Progress
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {workoutHistory.map((workout, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(workout.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {workout.duration} min
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {workout.exercises}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {workout.feedback}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-indigo-600 h-2.5 rounded-full" 
                        style={{ width: `${65 + index * 5}%` }}
                      ></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Improvement Metrics */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Form Improvement</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {improvementMetrics.map((metric, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium text-gray-700">{metric.name}</h3>
                <span className="text-green-600 font-medium">
                  +{metric.current - metric.initial}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                <div 
                  className="bg-indigo-600 h-4 rounded-full relative"
                  style={{ width: `${metric.current}%` }}
                >
                  <div 
                    className="absolute top-0 bottom-0 border-l-2 border-yellow-500"
                    style={{ left: `${metric.initial}%` }}
                  ></div>
                </div>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>Initial: {metric.initial}%</span>
                <span>Current: {metric.current}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Progress;