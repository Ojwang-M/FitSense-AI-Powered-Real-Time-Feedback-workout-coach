import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import VideoFeed from '../components/VideoFeed';
import FeedbackDisplay from '../components/FeedbackDisplay';
import { FeedbackItem, Exercise } from '../types';
import { Play, Pause, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import { speak, cancelSpeech } from '../utils/speechUtils';

// Mock data for exercises (same as in Exercises.tsx)
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
  // ... other exercises
];

// Mock feedback data
const generateMockFeedback = (exerciseId: string): FeedbackItem[] => {
  if (exerciseId === '1') { // Squat
    return [
      {
        id: '1',
        message: 'Keep your knees aligned with your toes',
        severity: 'medium',
        timestamp: Date.now() - 5000,
        bodyPart: 'knees'
      },
      {
        id: '2',
        message: 'Lower your hips more to reach proper depth',
        severity: 'low',
        timestamp: Date.now() - 3000,
        bodyPart: 'hips'
      },
      {
        id: '3',
        message: 'Keep your back straight',
        severity: 'high',
        timestamp: Date.now() - 1000,
        bodyPart: 'back'
      }
    ];
  } else if (exerciseId === '2') { // Push-up
    return [
      {
        id: '1',
        message: 'Keep your core engaged',
        severity: 'medium',
        timestamp: Date.now() - 5000,
        bodyPart: 'core'
      },
      {
        id: '2',
        message: 'Lower your chest closer to the ground',
        severity: 'low',
        timestamp: Date.now() - 3000,
        bodyPart: 'chest'
      }
    ];
  }
  return [];
};

const Workout: React.FC = () => {
  const [searchParams] = useSearchParams();
  const exerciseId = searchParams.get('exercise') || '1'; // Default to first exercise
  
  const [currentExercise, setCurrentExercise] = useState<Exercise | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [feedbackItems, setFeedbackItems] = useState<FeedbackItem[]>([]);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [repCount, setRepCount] = useState(0);
  const lastFeedbackRef = useRef<string>('');

  useEffect(() => {
    // Find the selected exercise
    const exercise = mockExercises.find(ex => ex.id === exerciseId);
    if (exercise) {
      setCurrentExercise(exercise);
      // Reset state when exercise changes
      setIsActive(false);
      setFeedbackItems([]);
      setElapsedTime(0);
      setRepCount(0);
      // Cancel any ongoing speech
      cancelSpeech();
    }
  }, [exerciseId]);

  // Effect for audio feedback
  useEffect(() => {
    // Only provide audio feedback if enabled and there are feedback items
    if (audioEnabled && feedbackItems.length > 0) {
      const latestFeedback = feedbackItems[0];
      
      // Only speak if this is a new feedback message
      if (latestFeedback.message !== lastFeedbackRef.current) {
        // Update the ref to track the last spoken feedback
        lastFeedbackRef.current = latestFeedback.message;
        
        // Speak the feedback with appropriate voice characteristics based on severity
        const options = {
          rate: 1.0,
          pitch: 1.0,
          volume: 1.0
        };
        
        // Adjust speech parameters based on severity
        if (latestFeedback.severity === 'high') {
          options.rate = 1.1; // Slightly faster for urgent feedback
          options.volume = 1.0;
        } else if (latestFeedback.severity === 'medium') {
          options.rate = 1.0;
          options.volume = 0.9;
        } else {
          options.rate = 0.9; // Slightly slower for minor corrections
          options.volume = 0.8;
        }
        
        // Speak the feedback
        speak(latestFeedback.message, options);
      }
    }
  }, [feedbackItems, audioEnabled]);

  useEffect(() => {
    let timer: number;
    if (isActive) {
      timer = window.setInterval(() => {
        setElapsedTime(prev => prev + 1);
        
        // Simulate rep counting (every 5 seconds)
        if (elapsedTime > 0 && elapsedTime % 5 === 0) {
          setRepCount(prev => prev + 1);
        }
        
        // Simulate new feedback every 10 seconds
        if (elapsedTime > 0 && elapsedTime % 10 === 0 && currentExercise) {
          const newFeedback = generateMockFeedback(currentExercise.id);
          setFeedbackItems(prev => [
            ...newFeedback.slice(0, 1), // Add just one new feedback item
            ...prev
          ].slice(0, 10)); // Keep only the 10 most recent items
        }
      }, 1000);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isActive, elapsedTime, currentExercise]);

  // This function would process video frames in a real implementation
  const handleFrameProcessed = () => {
    // In a real app, this would send the frame to a pose estimation model
    // and receive feedback based on the detected pose
    // For now, we're using mock data
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleWorkout = () => {
    const newActiveState = !isActive;
    setIsActive(newActiveState);
    
    if (newActiveState && currentExercise) {
      // Start with initial feedback
      setFeedbackItems(generateMockFeedback(currentExercise.id).slice(0, 1));
    } else {
      // If stopping the workout, cancel any ongoing speech
      cancelSpeech();
    }
  };

  const resetWorkout = () => {
    setIsActive(false);
    setElapsedTime(0);
    setRepCount(0);
    setFeedbackItems([]);
    // Cancel any ongoing speech when resetting
    cancelSpeech();
    // Reset the last feedback reference
    lastFeedbackRef.current = '';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        {currentExercise ? currentExercise.name : 'Workout'} Session
      </h1>
      
      {currentExercise && (
        <p className="text-gray-600 mb-8">{currentExercise.description}</p>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <VideoFeed onFrame={handleFrameProcessed} />
            
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={toggleWorkout}
                    className={`p-3 rounded-full ${
                      isActive 
                        ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                        : 'bg-green-100 text-green-600 hover:bg-green-200'
                    }`}
                  >
                    {isActive ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                  </button>
                  
                  <button 
                    onClick={resetWorkout}
                    className="p-3 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
                  >
                    <RotateCcw className="h-6 w-6" />
                  </button>
                  
                  <button 
                    onClick={() => {
                      const newAudioState = !audioEnabled;
                      setAudioEnabled(newAudioState);
                      // If disabling audio, cancel any ongoing speech
                      if (!newAudioState) {
                        cancelSpeech();
                      }
                    }}
                    className="p-3 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
                  >
                    {audioEnabled ? <Volume2 className="h-6 w-6" /> : <VolumeX className="h-6 w-6" />}
                  </button>
                </div>
                
                <div className="text-right">
                  <div className="text-2xl font-semibold">{formatTime(elapsedTime)}</div>
                  <div className="text-sm text-gray-500">Elapsed Time</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="text-gray-500 text-sm mb-1">Repetitions</div>
              <div className="text-3xl font-bold">{repCount}</div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="text-gray-500 text-sm mb-1">Calories</div>
              <div className="text-3xl font-bold">{Math.floor(elapsedTime * 0.15)}</div>
            </div>
          </div>
        </div>
        
        <div>
          <FeedbackDisplay feedbackItems={feedbackItems} />
          
          <div className="bg-white rounded-lg shadow-md p-4 mt-4">
            <h3 className="text-lg font-semibold mb-4">Exercise Tips</h3>
            {currentExercise && currentExercise.id === '1' ? (
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 mr-2"></span>
                  Keep your feet shoulder-width apart
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 mr-2"></span>
                  Maintain a neutral spine throughout the movement
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 mr-2"></span>
                  Push through your heels when standing up
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 mr-2"></span>
                  Keep your knees in line with your toes
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 mr-2"></span>
                  Engage your core throughout the movement
                </li>
              </ul>
            ) : (
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 mr-2"></span>
                  Keep your body in a straight line from head to heels
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 mr-2"></span>
                  Position your hands slightly wider than shoulder-width
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 mr-2"></span>
                  Lower your chest to the ground
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 mr-2"></span>
                  Keep your elbows close to your body
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 mr-2"></span>
                  Breathe out as you push up
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workout;
