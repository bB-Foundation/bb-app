import React, {FC, useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import {Text} from '@ui-kitten/components';

import styles from './resend-email-timer.styles';
import {getMinutes, getSeconds} from './resend-email-timer.api';
import {ResendEmailTimerProps} from './resend-email-timer.types';

export const ResendEmailTimer: FC<ResendEmailTimerProps> = ({
  onFinishCb,
  countDownSeconds = 30,
}) => {
  const intervalRef = useRef<NodeJS.Timeout>();

  const [secondsLeft, setSecondsLeft] = useState(countDownSeconds);

  const [isTimerDone, setIsTimerDone] = useState(false);

  /** Count down logic */
  useEffect(() => {
    if (isTimerDone) {
      clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      setSecondsLeft(s => s - 1);
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [isTimerDone]);

  /** Turns off the timer when it reaches the end */
  useEffect(() => {
    if (isTimerDone) return;

    if (secondsLeft === 0) {
      onFinishCb();
      setIsTimerDone(true);
    }
  }, [secondsLeft, isTimerDone, onFinishCb]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Resend code in</Text>
      <Text style={styles.text}>
        {getMinutes(secondsLeft)}:{getSeconds(secondsLeft)}
      </Text>
    </View>
  );
};
