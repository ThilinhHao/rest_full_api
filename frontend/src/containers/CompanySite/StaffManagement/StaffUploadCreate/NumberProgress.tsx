import React, { memo, useEffect, useState } from 'react';
import { STATE_MANY_PAGE } from './StaffUploadCreate';

const NumberProgress = ({ onSetStatePage, percentage }: { onSetStatePage: any; percentage: number }) => {
  const [numberProgress, setNumberProgress] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (numberProgress >= 95) {
        clearInterval(timer);
      } else {
        setNumberProgress(numberProgress + 2);
      }
    }, 250);

    return () => {
      clearInterval(timer);
    };
  }, [numberProgress]);

  useEffect(() => {
    if (numberProgress >= 95 && percentage === 100) {
      onSetStatePage(STATE_MANY_PAGE.uploadErrorView);
    }
  }, [numberProgress, percentage, onSetStatePage]);

  return (
    <div className="box-progress">
      <p className="number-progress">{numberProgress >= 95 && percentage === 100 ? percentage : numberProgress}%</p>
    </div>
  );
};

export default memo(NumberProgress);
