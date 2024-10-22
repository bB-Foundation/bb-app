import React, {useState, useEffect, FC} from 'react';

import {DelayedProps} from './delayed.types';

/** Renders child component after a delay */
const Delayed: FC<DelayedProps> = ({children, waitBeforeShow = 500}) => {
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsShown(true);
    }, waitBeforeShow);

    return () => clearTimeout(timer);
  }, [waitBeforeShow]);

  return <>{isShown ? children : null}</>;
};

export default Delayed;
