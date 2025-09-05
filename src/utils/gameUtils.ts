import type { Position, GameData } from '../types';

// 生成随机食物位置
export const generateFood = (snake: Position[], gridSize: number, canvasSize: number): Position => {
  const maxPos = Math.floor(canvasSize / gridSize);
  let food: Position;
  
  do {
    food = {
      x: Math.floor(Math.random() * maxPos),
      y: Math.floor(Math.random() * maxPos)
    };
  } while (snake.some(segment => segment.x === food.x && segment.y === food.y));
  
  return food;
};

// 检查碰撞
export const checkCollision = (head: Position, snake: Position[], canvasSize: number, gridSize: number): boolean => {
  const maxPos = Math.floor(canvasSize / gridSize);
  
  // 检查边界碰撞
  if (head.x < 0 || head.x >= maxPos || head.y < 0 || head.y >= maxPos) {
    return true;
  }
  
  // 检查自身碰撞
  return snake.some(segment => segment.x === head.x && segment.y === head.y);
};

// 移动蛇
export const moveSnake = (snake: Position[], direction: string): Position[] => {
  const newSnake = [...snake];
  const head = { ...newSnake[0] };
  
  switch (direction) {
    case 'UP':
      head.y -= 1;
      break;
    case 'DOWN':
      head.y += 1;
      break;
    case 'LEFT':
      head.x -= 1;
      break;
    case 'RIGHT':
      head.x += 1;
      break;
  }
  
  newSnake.unshift(head);
  return newSnake;
};

// 本地存储工具
const STORAGE_KEY = 'snakeGame';

export const saveGameData = (data: Partial<GameData>): void => {
  try {
    const existing = getGameData();
    const updated = { ...existing, ...data };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.warn('Failed to save game data:', error);
  }
};

export const getGameData = (): GameData => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.warn('Failed to load game data:', error);
  }
  
  // 返回默认数据
  return {
    highScore: 0,
    settings: {
      difficulty: 'normal',
      theme: 'classic',
      soundEnabled: true
    },
    statistics: {
      gamesPlayed: 0,
      totalScore: 0,
      avgGameTime: 0
    },
    achievements: []
  };
};

// 检测移动设备
export const isMobile = (): boolean => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

// 格式化时间
export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

// 防抖函数
export const debounce = (func: Function, wait: number) => {
  let timeout: ReturnType<typeof setTimeout>;
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};