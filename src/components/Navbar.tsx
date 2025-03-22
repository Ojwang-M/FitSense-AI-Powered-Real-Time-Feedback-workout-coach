import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, User, BarChart2, Settings } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-indigo-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Activity className="h-8 w-8 mr-2" />
              <span className="text-xl font-bold">FitSense</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500">
                Home
              </Link>
              <Link to="/exercises" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500">
                Exercises
              </Link>
              <Link to="/workout" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500">
                Start Workout
              </Link>
              <Link to="/progress" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500">
                Progress
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <Link to="/profile" className="p-2 rounded-full hover:bg-indigo-500">
              <User className="h-6 w-6" />
            </Link>
            <Link to="/analytics" className="p-2 rounded-full hover:bg-indigo-500">
              <BarChart2 className="h-6 w-6" />
            </Link>
            <Link to="/settings" className="p-2 rounded-full hover:bg-indigo-500">
              <Settings className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;