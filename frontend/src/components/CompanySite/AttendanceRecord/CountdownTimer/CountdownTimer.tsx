import { EStatusApproveRequest } from 'constants/constants';
import dayjs from 'dayjs';
import { getDateTimeByTimeZone, getDayjsByTimeZone } from 'helper/date';
import React, { useState, useEffect } from 'react';

function CountdownTimer({
  time,
  onDownEnd,
  timeout,
  status,
}: {
  time: number;
  onDownEnd: () => void;
  timeout: string | null;
  status: number;
}) {
  const [seconds, setSeconds] = useState(time);
  const [intervalId, setIntervalId] = useState<any>(null);

  useEffect(() => {
    const id = setInterval(() => {
      if (
        !timeout ||
        status === EStatusApproveRequest.WAITING_TRANSACTION ||
        status === EStatusApproveRequest.WAITING_OTPED
      ) {
        return 0;
      } else {
        const date1 = dayjs(getDayjsByTimeZone().format('YYYY-MM-DD HH:mm:ss'));
        const date = dayjs(getDateTimeByTimeZone(timeout)).diff(date1, 'second', true);
        setSeconds(date || 0);
      }
    }, 1000);

    setIntervalId(id);
    return () => clearInterval(id);
  }, [status, timeout]);

  useEffect(() => {
    if (seconds <= 0) {
      onDownEnd();
      clearInterval(intervalId);
    }
  }, [seconds, intervalId, onDownEnd]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = (time % 60).toFixed(0) || 0;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const formattedTime = formatTime(seconds);

  return <div>{formattedTime}</div>;
}

export default CountdownTimer;
