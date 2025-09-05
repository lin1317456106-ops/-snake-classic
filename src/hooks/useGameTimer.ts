import { useState, useEffect, useRef } from 'react';

const useGameTimer = (gameStarted: boolean, isPaused: boolean, isGameOver: boolean) => {
  const [gameTime, setGameTime] = useState(0);
  const startTimeRef = useRef<number>(0);
  const pausedTimeRef = useRef<number>(0);

  useEffect(() => {
    if (gameStarted && !isGameOver) {
      if (!isPaused) {
        // 游戏开始或恢复
        if (startTimeRef.current === 0) {
          startTimeRef.current = Date.now();
        } else if (pausedTimeRef.current > 0) {
          // 从暂停恢复，调整开始时间
          startTimeRef.current += Date.now() - pausedTimeRef.current;
          pausedTimeRef.current = 0;
        }

        const interval = setInterval(() => {
          setGameTime(Math.floor((Date.now() - startTimeRef.current) / 1000));
        }, 1000);

        return () => clearInterval(interval);
      } else {
        // 游戏暂停
        pausedTimeRef.current = Date.now();
      }
    } else if (!gameStarted || isGameOver) {
      // 游戏未开始或结束，重置计时器
      if (!gameStarted) {
        setGameTime(0);
        startTimeRef.current = 0;
        pausedTimeRef.current = 0;
      }
    }
  }, [gameStarted, isPaused, isGameOver]);

  const resetTimer = () => {
    setGameTime(0);
    startTimeRef.current = 0;
    pausedTimeRef.current = 0;
  };

  return { gameTime, resetTimer };
};

export default useGameTimer;