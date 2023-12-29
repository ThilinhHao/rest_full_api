import React, { useState, useEffect } from 'react';
import { TextTimeDown } from './countdownTimerStyle';

const calculateTimeLeft = (endDate: any, onFinish: any) => {
  if (!endDate)
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

  const now = new Date().getTime();
  const targetTime = new Date(endDate).getTime();
  const timeDifference = targetTime - now;

  if (timeDifference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

  if (seconds <= 0 && minutes <= 0 && hours <= 0 && days <= 0) {
    onFinish();
  }

  return {
    days,
    hours,
    minutes,
    seconds,
  };
};

const CountdownTimer = ({ startDate, endDate, onFinish }: { startDate: string; endDate: string; onFinish?: any }) => {
  const [currentTime, setCurrentTime] = useState<any>();
  useEffect(() => {
    const _startDate = new Date(startDate);
    const _endDate = new Date(endDate);
    let _secord = Math.floor((_endDate.getTime() - _startDate.getTime()) / 1000) + 1;
    if (_secord >= 301) _secord = 301;
    setCurrentTime(new Date(new Date().getTime() + _secord * 1000));
  }, [startDate, endDate]);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(currentTime, onFinish));
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft(currentTime, onFinish));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [currentTime, onFinish]);

  return (
    <TextTimeDown>
      {timeLeft.days > 0 || timeLeft.hours > 0 || timeLeft.minutes > 0 || timeLeft.seconds > 0 ? (
        <div>
          {timeLeft.minutes < 10 ? `0${timeLeft.minutes}` : timeLeft.seconds}:
          {timeLeft.seconds < 10 ? `0${timeLeft.seconds}` : timeLeft.seconds}
        </div>
      ) : (
        <></>
      )}
    </TextTimeDown>
  );
};

export default CountdownTimer;
