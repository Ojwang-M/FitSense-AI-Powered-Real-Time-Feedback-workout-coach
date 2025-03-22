import React, { useRef, useEffect, useState } from 'react';
import { Camera, CameraOff } from 'lucide-react';

interface VideoFeedProps {
  onFrame?: () => void;
}

const VideoFeed: React.FC<VideoFeedProps> = ({ onFrame }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
        audio: false,
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsStreaming(true);
        setError(null);
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      setError('Unable to access camera. Please check permissions and try again.');
      setIsStreaming(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsStreaming(false);
    }
  };

  useEffect(() => {
    let animationFrameId: number;
    
    const processFrame = () => {
      if (videoRef.current && canvasRef.current && isStreaming && onFrame) {
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) {
          canvasRef.current.width = videoRef.current.videoWidth;
          canvasRef.current.height = videoRef.current.videoHeight;
          
          ctx.drawImage(
            videoRef.current, 
            0, 0, 
            videoRef.current.videoWidth, 
            videoRef.current.videoHeight
          );
          
          // In a real implementation, we would get the image data and pass it for processing
          // For now, we just call the callback without parameters
          onFrame();
        }
      }
      
      animationFrameId = requestAnimationFrame(processFrame);
    };
    
    if (isStreaming) {
      animationFrameId = requestAnimationFrame(processFrame);
    }
    
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isStreaming, onFrame]);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="relative">
      <div className="rounded-lg overflow-hidden bg-gray-900 aspect-video relative">
        <video 
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          playsInline
          muted
        />
        <canvas 
          ref={canvasRef} 
          className="absolute top-0 left-0 w-full h-full"
          style={{ display: 'none' }}
        />
        
        {!isStreaming && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-70 text-white">
            {error ? (
              <div className="text-center p-4">
                <CameraOff className="h-12 w-12 mx-auto mb-2 text-red-400" />
                <p className="text-red-300">{error}</p>
              </div>
            ) : (
              <div className="text-center p-4">
                <Camera className="h-12 w-12 mx-auto mb-2" />
                <p>Camera is off</p>
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className="mt-4 flex justify-center">
        <button
          onClick={isStreaming ? stopCamera : startCamera}
          className={`px-4 py-2 rounded-md flex items-center ${
            isStreaming 
              ? 'bg-red-600 hover:bg-red-700 text-white' 
              : 'bg-indigo-600 hover:bg-indigo-700 text-white'
          }`}
        >
          {isStreaming ? (
            <>
              <CameraOff className="h-5 w-5 mr-2" />
              Stop Camera
            </>
          ) : (
            <>
              <Camera className="h-5 w-5 mr-2" />
              Start Camera
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default VideoFeed;
