
import { useEffect, useState } from "react";
import { Timer as TimerIcon } from "lucide-react";

interface TimerProps {
  duration: number; // in minutes
  onTimeUp: () => void;
}

const Timer = ({ duration, onTimeUp }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState(duration * 60);
  const [isWarning, setIsWarning] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = prev - 1;
        if (newTime <= 60) setIsWarning(true);
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className={`flex items-center gap-2 px-4 py-2 rounded-full transition-smooth
      ${isWarning ? 'bg-red-50 text-red-600' : 'bg-gray-50 text-gray-600'}`}>
      <TimerIcon className="w-4 h-4" />
      <span className="font-mono text-sm">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </span>
    </div>
  );
};

export default Timer;
