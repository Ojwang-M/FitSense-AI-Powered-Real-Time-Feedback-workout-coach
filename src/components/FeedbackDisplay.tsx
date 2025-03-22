import React from 'react';
import { FeedbackItem } from '../types';
import { AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react';

interface FeedbackDisplayProps {
  feedbackItems: FeedbackItem[];
}

const FeedbackDisplay: React.FC<FeedbackDisplayProps> = ({ feedbackItems }) => {
  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'low':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'medium':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'high':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <CheckCircle className="h-5 w-5 text-green-500" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold mb-4">Real-time Feedback</h3>
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {feedbackItems.length > 0 ? (
          feedbackItems.map((item) => (
            <div 
              key={item.id} 
              className={`p-3 rounded-md flex items-start ${
                item.severity === 'low' ? 'bg-green-50' :
                item.severity === 'medium' ? 'bg-yellow-50' :
                'bg-red-50'
              }`}
            >
              <div className="mr-3 mt-0.5">
                {getSeverityIcon(item.severity)}
              </div>
              <div>
                <p className="text-gray-800">{item.message}</p>
                {item.bodyPart && (
                  <p className="text-sm text-gray-600 mt-1">Focus area: {item.bodyPart}</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-4 text-gray-500">
            <p>No feedback yet. Start exercising to receive real-time guidance.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackDisplay;