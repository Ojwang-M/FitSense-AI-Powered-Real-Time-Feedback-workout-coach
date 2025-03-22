export interface Exercise {
  id: string;
  name: string;
  description: string;
  targetMuscles: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  imageUrl: string;
}

export interface FeedbackItem {
  id: string;
  message: string;
  severity: 'low' | 'medium' | 'high';
  timestamp: number;
  bodyPart?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  experience: 'beginner' | 'intermediate' | 'advanced';
  goals: string[];
  preferredFeedbackMethod: 'visual' | 'audio' | 'both';
}