import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Camera, BarChart2, Award } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="md:w-2/3">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Your AI-Powered Workout Coach
            </h1>
            <p className="text-xl mb-8">
              FitSense provides real-time feedback on your exercise form and technique, helping you train safer and more effectively.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link 
                to="/workout" 
                className="bg-white text-indigo-700 hover:bg-gray-100 px-6 py-3 rounded-md font-medium text-center"
              >
                Start Workout
              </Link>
              <Link 
                to="/exercises" 
                className="bg-transparent border border-white hover:bg-indigo-600 px-6 py-3 rounded-md font-medium text-center"
              >
                Browse Exercises
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 w-full md:w-1/3 h-24 md:h-full bg-indigo-700 hidden md:block">
          <div className="h-full bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80')" }}></div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">How FitSense Works</h2>
          <p className="mt-4 text-xl text-gray-600">
            Our AI-powered system analyzes your movements in real-time
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="bg-indigo-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Camera className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Pose Detection</h3>
            <p className="text-gray-600">
              Advanced computer vision tracks your body's key points during exercise.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="bg-indigo-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Activity className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Movement Analysis</h3>
            <p className="text-gray-600">
              AI algorithms compare your form to ideal reference poses.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="bg-indigo-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Award className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Real-time Feedback</h3>
            <p className="text-gray-600">
              Receive instant visual and audio guidance to correct your form.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="bg-indigo-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <BarChart2 className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Progress Tracking</h3>
            <p className="text-gray-600">
              Monitor your improvement over time with detailed analytics.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to improve your workout form?</h2>
          <p className="text-xl mb-8">
            Start using FitSense today and train with confidence.
          </p>
          <Link 
            to="/workout" 
            className="bg-white text-indigo-700 hover:bg-gray-100 px-6 py-3 rounded-md font-medium inline-block"
          >
            Get Started Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;