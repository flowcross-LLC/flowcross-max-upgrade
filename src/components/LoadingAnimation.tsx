import { useState, useEffect } from "react";
import flowcrossLogo from "@/assets/flowcross-logo.png";

interface LoadingAnimationProps {
  onComplete: () => void;
}

const LoadingAnimation = ({ onComplete }: LoadingAnimationProps) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    "Инициализация FlowCross...",
    "Загрузка компонентов...",
    "Подключение к серверам...",
    "Финализация..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= steps.length - 1) {
          clearInterval(stepInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 800);

    return () => clearInterval(stepInterval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-background flex items-center justify-center">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-accent/5 rounded-full animate-pulse delay-500"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-primary/3 to-accent/3 rounded-full animate-spin" style={{ animationDuration: '20s' }}></div>
      </div>

      <div className="relative z-10 text-center">
        {/* Logo Animation */}
        <div className="mb-8">
          <div className="relative">
            <img 
              src={flowcrossLogo} 
              alt="FlowCross" 
              className="w-24 h-24 mx-auto rounded-xl animate-pulse"
              style={{
                filter: 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.3))',
                animation: 'pulse 2s ease-in-out infinite alternate'
              }}
            />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/20 to-accent/20 animate-pulse"></div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold mb-2 neon-text animate-fade-in">
          FlowCross
        </h1>
        <p className="text-muted-foreground mb-8 animate-fade-in delay-300">
          Загружаем игровую вселенную
        </p>

        {/* Progress Bar */}
        <div className="w-80 mx-auto mb-6">
          <div className="bg-muted/20 rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300 ease-out rounded-full"
              style={{ 
                width: `${progress}%`,
                boxShadow: '0 0 10px rgba(255, 255, 255, 0.3)'
              }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>0%</span>
            <span className="font-mono">{progress}%</span>
            <span>100%</span>
          </div>
        </div>

        {/* Loading Steps */}
        <div className="h-6">
          <p className="text-sm text-muted-foreground animate-fade-in">
            {steps[currentStep]}
          </p>
        </div>

        {/* Loading Dots */}
        <div className="flex justify-center space-x-1 mt-4">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingAnimation;