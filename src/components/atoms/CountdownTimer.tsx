import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        días: Math.floor(difference / (1000 * 60 * 60 * 24)),
        horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutos: Math.floor((difference / 1000 / 60) % 60),
        segundos: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents: React.ReactElement[] = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval as keyof typeof timeLeft]) {
      return;
    }

    timerComponents.push(
      <div key={interval} className="text-center">
        <span className="text-2xl lg:text-3xl font-bold">{timeLeft[interval as keyof typeof timeLeft]}</span>
        <span className="text-xs uppercase block">{interval}</span>
      </div>
    );
  });

  return (
    <div className="mt-6">
        {timerComponents.length ? 
            <div className="grid grid-cols-4 gap-4 text-white bg-white/10 backdrop-blur-sm p-4 rounded-lg max-w-sm mx-auto">
                {timerComponents}
            </div> : 
            <span className="text-center text-lg font-bold text-white/80">¡El curso ha comenzado!</span>
        }
    </div>
  );
};

export default CountdownTimer; 