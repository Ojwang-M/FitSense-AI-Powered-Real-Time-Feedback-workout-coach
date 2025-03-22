# FitSense-AI-Powered-Real-Time-Feedback-workout-coach

FitSense is an intelligent workout coaching application that provides real-time feedback on your exercise form and technique, helping you train safer and more effectively.

## 🏋️‍♀️ Features

- **Real-time Form Analysis**: Get instant feedback on your exercise technique
- **Exercise Library**: Browse through a collection of exercises with proper form guidance
- **Workout Tracking**: Monitor your progress and improvement over time
- **Video Feedback**: Uses your camera to analyze movement and provide corrections
- **Voice Guidance**: Receive audio cues and instructions during your workout

## 🚀 Technologies

- **Frontend**: React 18 with TypeScript
- **Routing**: React Router v6
- **Styling**: TailwindCSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Linting**: ESLint
- **Package Manager**: npm

## 📋 Prerequisites

- Node.js (v18.18.0 or higher recommended)
- npm (v8.0.0 or higher)

## 🛠️ Setup and Installation

1. **Clone the repository**

```bash
git clone https://github.com/Ojwang-M/FitSense-AI-Powered-Real-Time-Feedback-workout-coach.git
cd FitSense-AI-Powered-Real-Time-Feedback-workout-coach
```

2. **Install dependencies**

```bash
npm install
```

3. **Start the development server**

```bash
npm run dev
```

4. **Open your browser**

Navigate to `http://localhost:5173` to see the application running.

## 📦 Build for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## 📁 Project Structure

```
fitsense-workout-coach/
├── public/             # Static assets
├── src/                # Source code
│   ├── components/     # Reusable UI components
│   │   ├── ExerciseCard.tsx
│   │   ├── FeedbackDisplay.tsx
│   │   ├── Footer.tsx
│   │   ├── Navbar.tsx
│   │   └── VideoFeed.tsx
│   ├── pages/          # Application pages
│   │   ├── Exercises.tsx
│   │   ├── Home.tsx
│   │   ├── Progress.tsx
│   │   └── Workout.tsx
│   ├── utils/          # Utility functions
│   │   └── speechUtils.ts
│   ├── App.tsx         # Main application component
│   ├── main.tsx        # Entry point
│   ├── index.css       # Global styles
│   ├── types.ts        # TypeScript type definitions
│   └── vite-env.d.ts   # Vite environment declarations
├── .gitignore          # Git ignore file
├── eslint.config.js    # ESLint configuration
├── index.html          # HTML entry point
├── package.json        # Project dependencies and scripts
├── postcss.config.js   # PostCSS configuration
├── tailwind.config.js  # Tailwind CSS configuration
├── tsconfig.json       # TypeScript configuration
└── vite.config.ts      # Vite configuration
```

## 🧪 Running Tests

```bash
npm run test
```

## 📱 Responsive Design

FitSense is designed to work on various devices:
- Desktop computers
- Tablets
- Mobile phones

## 🔒 Privacy

FitSense processes all video analysis locally in your browser. No video data is sent to external servers, ensuring your privacy during workouts.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
