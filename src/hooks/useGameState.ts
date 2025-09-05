import { useState, useEffect, useCallback, useRef } from 'react';
import type { GameState, Position, GameStatus } from '../types';
import { GAME_CONFIG } from '../data/config';
import { generateFood, checkCollision, moveSnake, isMobile } from '../utils/gameUtils';

const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>({
    snake: [{ x: 10, y: 10 }],
    food: { x: 5, y: 5 },
    direction: 'RIGHT',
    score: 0,
    isGameOver: false,
    isPaused: false,
    gameStarted: false
  });
  
  const [gameStatus, setGameStatus] = useState<GameStatus>('idle');
  const [gameSpeed, setGameSpeed] = useState<number>(GAME_CONFIG.SPEED.normal);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const canvasSize = isMobile() ? GAME_CONFIG.CANVAS_SIZE.MOBILE.width : GAME_CONFIG.CANVAS_SIZE.PC.width;

  // 初始化游戏
  const initGame = useCallback(() => {
    const initialSnake: Position[] = [];
    for (let i = 0; i < GAME_CONFIG.INITIAL_SNAKE_LENGTH; i++) {
      initialSnake.push({ x: 10 - i, y: 10 });
    }
    
    const initialFood = generateFood(initialSnake, GAME_CONFIG.GRID_SIZE, canvasSize);
    
    setGameState({
      snake: initialSnake,
      food: initialFood,
      direction: 'RIGHT',
      score: 0,
      isGameOver: false,
      isPaused: false,
      gameStarted: false
    });
    setGameStatus('idle');
  }, [canvasSize]);

  // 开始游戏
  const startGame = useCallback(() => {
    setGameState(prev => ({ ...prev, gameStarted: true }));
    setGameStatus('playing');
  }, []);

  // 暂停/恢复游戏
  const togglePause = useCallback(() => {
    if (!gameState.gameStarted || gameState.isGameOver) return;
    
    setGameState(prev => ({ ...prev, isPaused: !prev.isPaused }));
    setGameStatus(prev => prev === 'paused' ? 'playing' : 'paused');
  }, [gameState.gameStarted, gameState.isGameOver]);

  // 重新开始游戏
  const restartGame = useCallback(() => {
    initGame();
    startGame();
  }, [initGame, startGame]);

  // 改变方向
  const changeDirection = useCallback((newDirection: string) => {
    setGameState(prev => {
      // 防止反向移动
      const opposites = {
        'UP': 'DOWN',
        'DOWN': 'UP',
        'LEFT': 'RIGHT',
        'RIGHT': 'LEFT'
      };
      
      if (opposites[prev.direction as keyof typeof opposites] === newDirection) {
        return prev;
      }
      
      return { ...prev, direction: newDirection as any };
    });
  }, []);

  // 游戏循环
  const gameLoop = useCallback(() => {
    setGameState(prev => {
      if (!prev.gameStarted || prev.isPaused || prev.isGameOver) {
        return prev;
      }

      const newSnake = moveSnake(prev.snake, prev.direction);
      const head = newSnake[0];

      // 检查碰撞
      if (checkCollision(head, prev.snake, canvasSize, GAME_CONFIG.GRID_SIZE)) {
        setGameStatus('gameOver');
        return { ...prev, isGameOver: true };
      }

      let updatedSnake = newSnake;
      let newFood = prev.food;
      let newScore = prev.score;

      // 检查是否吃到食物
      if (head.x === prev.food.x && head.y === prev.food.y) {
        newScore += GAME_CONFIG.FOOD_SCORE;
        newFood = generateFood(newSnake, GAME_CONFIG.GRID_SIZE, canvasSize);
      } else {
        // 如果没吃到食物，移除尾部
        updatedSnake.pop();
      }

      return {
        ...prev,
        snake: updatedSnake,
        food: newFood,
        score: newScore
      };
    });
  }, [canvasSize]);

  // 设置游戏循环
  useEffect(() => {
    if (gameStatus === 'playing') {
      intervalRef.current = setInterval(gameLoop, gameSpeed);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [gameStatus, gameLoop, gameSpeed]);

  // 设置游戏速度
  const setDifficulty = useCallback((difficulty: 'simple' | 'normal' | 'hard') => {
    const speeds = GAME_CONFIG.SPEED;
    setGameSpeed(speeds[difficulty]);
  }, []);

  // 初始化
  useEffect(() => {
    initGame();
  }, [initGame]);

  return {
    gameState,
    gameStatus,
    startGame,
    togglePause,
    restartGame,
    changeDirection,
    setDifficulty,
    canvasSize
  };
};

export default useGameState;